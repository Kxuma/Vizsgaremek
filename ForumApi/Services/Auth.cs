using ForumApi.Models;
using ForumApi.Services.Dtos;
using ForumApi.Services.IAuthService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Services
{
    public class Auth : IAuth
    {
        public readonly ForumContext _context;
        public readonly UserManager<ApplicationUser> userManager;
        public readonly RoleManager<IdentityRole> roleManager;


        private readonly ITokenGenerator tokenGenerator;

        public Auth(ForumContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ITokenGenerator tokenGenerator)
        {
            _context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.tokenGenerator = tokenGenerator;
        }

        public async Task<object> AssignRole(string UserName, string RoleName)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(user => user.NormalizedUserName == UserName.ToUpper());

            if (user != null)
            {
                if (!roleManager.RoleExistsAsync(RoleName).GetAwaiter().GetResult())
                {
                    roleManager.CreateAsync(new IdentityRole(RoleName)).GetAwaiter().GetResult();
                }
                await userManager.AddToRoleAsync(user, RoleName);

                return new { result = user, message = "Sikeres hozzárendelés." };
            }
            return new { result = "", message = "Sikertelen hozzárendelés." };
        }

        public async Task<object> Login(LoginRequestDto loginRequestDto) 
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(user => user.NormalizedUserName == loginRequestDto.UserName.ToUpper());

            bool isValid = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (isValid) {
                var roles = await userManager.GetRolesAsync(user);
                var jwtToken = tokenGenerator.GenerateToken(user, roles);

                return new { result = new { user.UserName, user.Email }, message = "Sikeres beléptetés.", token = jwtToken };
            }

            return new { result = "", message = "Nem regisztrált.", token = "" };
        }

        public async Task<object> Register(RegisterRequestDto registerRequestDto)
        {
            ApplicationUser user = new()
            {
                UserName = registerRequestDto.UserName, // Használjuk a kérésből érkező felhasználónevet
                Email = registerRequestDto.Email
            };

            var result = await userManager.CreateAsync(user, registerRequestDto.Password);

            if (result.Succeeded)
            {
                var userReturn = await _context.ApplicationUsers
    .FirstOrDefaultAsync(user => user.UserName.Equals(registerRequestDto.UserName, StringComparison.OrdinalIgnoreCase));



                return new { result = userReturn, message = "Sikeres regisztráció." };
            }

            return new { result = "", message = result.Errors.FirstOrDefault().Description };

        }
    }
}

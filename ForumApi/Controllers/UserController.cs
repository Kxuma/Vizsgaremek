using ForumApi.Models;
using ForumApi.Services.Dtos;
using ForumApi.Services.IAuthService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuth auth;
        private readonly UserManager<ApplicationUser> userManager;

        public UserController(IAuth auth, UserManager<ApplicationUser> userManager)
        {
            this.auth = auth;
            this.userManager = userManager;
        }

        [HttpGet("Get")]

        public async Task<ActionResult<List<ApplicationUser>>> GetAllTopics()
        {
            var users  = await userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("Register")]
        public async Task<ActionResult> AddNewUser(RegisterRequestDto registerRequestDto)
        {
            var user = await auth.Register(registerRequestDto);

            if (user != null)
            {
                return StatusCode(201, user);
            }
            return BadRequest(new { result = "", message = "Sikertelen regisztráció." });
        }

        [HttpPost("Login")]
        public async Task<ActionResult> LoginUser(LoginRequestDto loginRequestDto)
        {
            var res = await auth.Login(loginRequestDto);

            if (res != null)
            {
                return StatusCode(200, res);
            }

            return NotFound(res);
        }

        [HttpPost("AssignRole")]
        public async Task<ActionResult> AddRole(string UserName, string roleName)
        {
            var res = await auth.AssignRole(UserName, roleName);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
    }
}

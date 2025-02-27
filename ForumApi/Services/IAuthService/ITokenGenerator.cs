using ForumApi.Models;

namespace ForumApi.Services.IAuthService
{
    public interface ITokenGenerator
    {
        string GenerateToken(ApplicationUser aspnetuser, IEnumerable<string> role);
    }
}

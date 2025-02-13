using ForumApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ForumContext _forumContext;
        
        public UserController(ForumContext forumContext)
        {
            _forumContext = forumContext;
        }

        // GET method

        [HttpGet("Get")]

        public async Task<ActionResult<List<Topic>>> GetAllUsers()
        {
            var users = await _forumContext.Users.ToListAsync();
            return Ok(users);
        }
    }
}

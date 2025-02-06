using ForumApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}

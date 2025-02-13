using ForumApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForumApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ForumContext _forumContext;

        public TopicController(ForumContext forumContext)
        {
            _forumContext = forumContext;
        }
    }
}

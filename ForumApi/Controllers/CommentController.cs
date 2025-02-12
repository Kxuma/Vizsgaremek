using ForumApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using static ForumApi.Models.Dto;

namespace ForumApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase {
        private readonly ForumContext _forumContext;

        public CommentController(ForumContext forumContext) {
            _forumContext = forumContext;
        }


        // POST method

        [HttpPost]
        public async Task<ActionResult<Comment>> Post(CreateCommentDto createCommentDto) {
            var comment = new Comment {
                Id = createCommentDto.Id,
                UId = createCommentDto.UId,
                TId = createCommentDto.TId,
                Text = createCommentDto.Text
            };

            _forumContext.Comments.Add(comment);
            await _forumContext.SaveChangesAsync();

            return StatusCode(201, comment);
        }


        // GET method

        [HttpGet]
        public async Task<ActionResult<List<Comment>>> GetAllComments() {
            var comments = await _forumContext.Comments.ToListAsync();
            return Ok(comments);
        }
    }
}

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

        [HttpPost("Post")]
        public async Task<ActionResult<Comment>> PostComment(CreateCommentDto createCommentDto) {
            var comment = new Comment {
                Id = createCommentDto.Id,
                UId = createCommentDto.UId,
                TId = createCommentDto.TId,
                Text = createCommentDto.Text,
                CreatedTime = DateTime.Now,
            };

            _forumContext.Comments.Add(comment);
            await _forumContext.SaveChangesAsync();

            return StatusCode(201, comment);
        }


        // GET method

        [HttpGet("Get")]
        public async Task<ActionResult<List<Comment>>> GetAllComments() {
            var comments = await _forumContext.Comments.ToListAsync();
            return Ok(comments);
        }

        // DELETE method

        [HttpDelete("Delete")]

        public async Task<ActionResult<Comment>> DeleteComment(int id)
        {
            var comment = await _forumContext.Comments.SingleOrDefaultAsync(c => c.Id == id);

            if (comment != null)
            {
                _forumContext.Comments.Remove(comment);
                await _forumContext.SaveChangesAsync();
                return Ok(new { message = "Sikeres törlés!" });
            }
            return NotFound(new { message = "Nincs ilyen comment." });
        }
    }
}

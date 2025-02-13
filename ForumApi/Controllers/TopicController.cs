using ForumApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static ForumApi.Models.Dto;

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

        // POST method

        [HttpPost("Post")]
        public async Task<ActionResult<Topic>> PostTopic(CreateTopicDto createTopicDto)
        {
            var topic = new Topic
            {
                Id = createTopicDto.Id,
                Title = createTopicDto.Title,
                Description = createTopicDto.Description,
                Uid = createTopicDto.Uid,
                CreatedTime = DateTime.Now,
            };

            _forumContext.Topics.Add(topic);
            await _forumContext.SaveChangesAsync();

            return StatusCode(201, topic);
        }

        // GET method

        [HttpGet("Get")]

        public async Task<ActionResult<List<Topic>>> GetAllTopics()
        {
            var topics = await _forumContext.Topics.ToListAsync();
            return Ok(topics);
        }

        // DELETE method

        [HttpDelete("Delete")]

        public async Task<ActionResult<Topic>> DeleteTopic(int id)
        {
            var topic = await _forumContext.Topics.SingleOrDefaultAsync(c => c.Id == id);

            if (topic != null)
            {
                _forumContext.Topics.Remove(topic);
                await _forumContext.SaveChangesAsync();
                return Ok(new { message = "Sikeres törlés!" });
            }
            return NotFound(new { message = "Nincs ilyen comment." });
        }
    }
}

using System.Data;

namespace ForumApi.Models {
    public class Dto 
    {
        public record CreateCommentDto(int Id, string UId, int TId, string Text, DateTime CreatedTime);
        public record CreateTopicDto(int Id, string Title, string Description, string Uid , DateTime CreatedTime);

        public record UpdateCommentDto(string Text);
        public record UpdateTopicDto(string Title, string Description);
    }
}

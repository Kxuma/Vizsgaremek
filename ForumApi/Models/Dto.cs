using System.Data;

namespace ForumApi.Models {
    public class Dto 
    {
        public record CreateCommentDto(int Id, int UId, int TId, string Text, DateTime CreatedTime);
        public record CreateTopicDto(int Id, string Title, string Description, int Uid , DateTime CreatedTime);
    }
}

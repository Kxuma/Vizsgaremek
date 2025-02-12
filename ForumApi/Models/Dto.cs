namespace ForumApi.Models {
    public class Dto 
    {
        public record CreateCommentDto(int Id, int UId, int TId, string Text);
    }
}

namespace ForumApi.Services.Dtos
{
    public record RegisterRequestDto(string UserName, string Password, string Email);

    public record LoginRequestDto(string UserName, string Password);
}

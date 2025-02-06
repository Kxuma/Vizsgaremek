using System;
using System.Collections.Generic;

namespace ForumApi.Models;

public partial class Comment
{
    public int Id { get; set; }

    public int UId { get; set; }

    public int TId { get; set; }

    public string Text { get; set; } = null!;

    public DateTime CreatedTime { get; set; }
}

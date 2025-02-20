using System;
using System.Collections.Generic;

namespace ForumApi.Models;

public partial class Comment
{
    public int Id { get; set; }

    public string UId { get; set; } = null!;

    public int TId { get; set; }

    public string Text { get; set; } = null!;

    public DateTime CreatedTime { get; set; }
}

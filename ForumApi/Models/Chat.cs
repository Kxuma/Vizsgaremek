using System;
using System.Collections.Generic;

namespace ForumApi.Models;

public partial class Chat
{
    public int Id { get; set; }

    public string UIds { get; set; } = null!;

    public string Texts { get; set; } = null!;

    public DateTime CreatedTime { get; set; }
}

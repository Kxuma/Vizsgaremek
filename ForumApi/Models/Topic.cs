using System;
using System.Collections.Generic;

namespace ForumApi.Models;

public partial class Topic
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Uid { get; set; }

    public DateTime CreatedTime { get; set; }
}

using System;
using System.Collections.Generic;

namespace ForumApi.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool Isadmin { get; set; }

    public DateTime CreatedTime { get; set; }
}

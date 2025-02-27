using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace ForumApi.Models;

public partial class ApplicationUser : IdentityUser
{
    public string? FullName { get; set; }
}

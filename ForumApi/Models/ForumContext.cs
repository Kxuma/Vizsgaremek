using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Models;

public partial class ForumContext : IdentityDbContext<ApplicationUser>
{
    public ForumContext()
    {
    }

    public ForumContext(DbContextOptions<ForumContext> options)
        : base(options)
    {
    }


    public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }

    public virtual DbSet<Chat> Chats { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Topic> Topics { get; set; }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

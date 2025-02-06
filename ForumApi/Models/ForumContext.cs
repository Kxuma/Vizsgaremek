using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ForumApi.Models;

public partial class ForumContext : DbContext
{
    public ForumContext()
    {
    }

    public ForumContext(DbContextOptions<ForumContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Chat> Chats { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Topic> Topics { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;database=forum;user=root;password=password;sslmode=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Chat>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("chat");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedTime)
                .HasColumnType("datetime")
                .HasColumnName("created_time");
            entity.Property(e => e.Texts)
                .HasColumnType("text")
                .HasColumnName("texts");
            entity.Property(e => e.UIds)
                .HasMaxLength(20)
                .HasColumnName("u_ids");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("comments");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedTime)
                .HasColumnType("datetime")
                .HasColumnName("created_time");
            entity.Property(e => e.TId).HasColumnName("t_id");
            entity.Property(e => e.Text)
                .HasColumnType("text")
                .HasColumnName("text");
            entity.Property(e => e.UId).HasColumnName("u_id");
        });

        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("topics");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedTime)
                .HasColumnType("datetime")
                .HasColumnName("created_time");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.Uid).HasColumnName("uid");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedTime)
                .HasColumnType("datetime")
                .HasColumnName("created_time");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Isadmin).HasColumnName("isadmin");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

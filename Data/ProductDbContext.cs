using MicroserviceDemoProductService.Model;
using Microsoft.EntityFrameworkCore;

namespace MicroserviceDemoProductService.Data;

public class ProductDbContext(DbContextOptions<ProductDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products { get; set; }

    // Optional: Seed initial data
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 101, Name = "Laptop Pro", Price = 1200.00m },
            new Product { Id = 102, Name = "Wireless Mouse", Price = 25.50m },
            new Product { Id = 103, Name = "Keyboard", Price = 75.00m }
        );
    }
}
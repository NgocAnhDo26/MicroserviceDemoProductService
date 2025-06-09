using MicroserviceDemoProductService.Model;
using Microsoft.AspNetCore.Mvc;

namespace MicroserviceDemoProductService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> Products =
    [
        new Product { Id = 101, Name = "Laptop Pro", Price = 1200.00m },
        new Product { Id = 102, Name = "Wireless Mouse", Price = 25.50m },
        new Product { Id = 103, Name = "Keyboard", Price = 75.00m }
    ];

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        return Ok(Products);
    }

    [HttpGet("{id:int}")]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }
}
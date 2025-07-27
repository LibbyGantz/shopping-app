using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingApi.Data;
using ShoppingApi.Models;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    // {
    //     return await _context.Products.Include(p => p.Category).ToListAsync();
    // }

    [HttpGet]
public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
{
    var products = await _context.Products
        .Include(p => p.Category)
        .Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            CategoryName = p.Category != null ? p.Category.Name : string.Empty
        })
        .ToListAsync();

    return Ok(products);
}

}

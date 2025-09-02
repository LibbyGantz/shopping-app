using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingApi.Data;
using ShoppingApi.Models.Dtos;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

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
            CategoryId = p.CategoryId,
            CategoryName = p.Category != null ? p.Category.Name : string.Empty
        })
        .ToListAsync();

    return Ok(products);
}

}

namespace ShoppingApi.Models
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Price { get; set; }
        public int CategoryId { get; set; } 
        public string CategoryName { get; set; } = string.Empty;
    }
}

using System;
using System.Text.Json;
using core.Entity;

namespace infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {
        if (!context.Products.Any())
        {
            var productsdata = await File.ReadAllTextAsync("../infrastructure/Data/SeedData/products.json");

            var products = JsonSerializer.Deserialize<List<Product>>(productsdata);

            if (products == null) return;

            context.Products.AddRange(products);

            await context.SaveChangesAsync();
        }
    }

}

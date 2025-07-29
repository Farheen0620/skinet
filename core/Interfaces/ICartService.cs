using System;
using core.Entity;

namespace core.Interfaces;

public interface ICartService
{
    Task<ShoppingCart?> GetCartAsync(string key);

    Task<ShoppingCart?> SetCartAsync(ShoppingCart cart);

    Task<bool> DeleteCartAsync(string key);
}

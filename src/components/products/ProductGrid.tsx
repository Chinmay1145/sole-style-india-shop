
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Product, allProducts } from "@/data/products";

type ProductGridProps = {
  products?: Product[];
  limit?: number;
  title?: string;
  showFilters?: boolean;
};

export function ProductGrid({
  products = allProducts,
  limit,
  title,
  showFilters = false,
}: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("default");
  const [isLoading, setIsLoading] = useState(true);

  // Get unique categories from products
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true);
    
    // Start with all products or the ones passed in props
    let result = [...products];

    // Apply category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Apply sort
    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Apply limit if specified
    if (limit && result.length > limit) {
      result = result.slice(0, limit);
    }

    // Simulate a slight loading delay for animation effect
    setTimeout(() => {
      setFilteredProducts(result);
      setIsLoading(false);
    }, 300);
  }, [products, category, sort, limit]);

  return (
    <div className="space-y-6">
      {/* Title and filters section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-4">
            {/* Category filter */}
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort filter */}
            <div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="default">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Products grid with loading state */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Loading skeleton
          Array(limit || 8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="bg-muted h-60"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-5 bg-muted rounded w-2/3"></div>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))
        ) : filteredProducts.length > 0 ? (
          // Actual products
          filteredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          // No products found
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl">No products found</h3>
            <p className="text-muted-foreground mt-2">
              Try changing your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

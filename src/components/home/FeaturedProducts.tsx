
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { allProducts } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const navigate = useNavigate();

  // Get featured products
  const featuredProducts = useMemo(() => {
    return allProducts.filter(product => product.isFeatured).slice(0, 8);
  }, []);

  // Navigate to all products
  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
            <p className="text-muted-foreground">
              Handpicked premium footwear for you
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 sm:mt-0"
            onClick={handleViewAll}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
}

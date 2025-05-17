
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { ProductDetail as ProductDetailComponent } from "@/components/products/ProductDetail";
import { ProductGrid } from "@/components/products/ProductGrid";
import { allProducts, Product } from "@/data/products";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Reset loading state
    setLoading(true);
    
    // Find product by ID
    const foundProduct = allProducts.find(p => p.id === Number(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category, excluding current product)
      const related = allProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
      setLoading(false);
    } else {
      // Product not found, redirect to products page
      navigate("/products", { replace: true });
    }
  }, [id, navigate]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-10 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-24 bg-muted rounded w-full"></div>
                <div className="h-10 bg-muted rounded w-full"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="flex items-center"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          {/* Product Detail */}
          <ProductDetailComponent product={product} />
          
          {/* Related Products */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        </div>
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default ProductDetailPage;

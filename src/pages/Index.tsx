
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { brands, categories } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-12 bg-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Top Brands</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {Array.from(new Set(brands)).map((brand) => (
                <div key={brand} className="text-xl font-medium text-primary/80 hover:text-accent transition-colors">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop" 
                alt="Fast Shipping" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">Get your favorite shoes delivered to your doorstep in 1-3 business days.</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1471&auto=format&fit=crop" 
                alt="Free Returns" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Free Returns</h3>
                <p className="text-muted-foreground">Not satisfied with your purchase? Return within 30 days for a full refund.</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop" 
                alt="Authentic Products" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Authentic Products</h3>
                <p className="text-muted-foreground">We only sell 100% authentic branded shoes directly from manufacturers.</p>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        
        <section className="py-16 bg-gradient-to-r from-accent to-accent/70 text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Be the first to know about new arrivals, special offers, and exclusive promotions.
            </p>
            <div className="flex flex-col sm:flex-row w-full max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 flex-grow rounded-md focus:outline-none focus:ring-2 focus:ring-white text-foreground"
              />
              <button className="px-6 py-3 bg-background text-foreground font-medium rounded-md hover:bg-background/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Index;

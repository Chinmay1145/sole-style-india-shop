
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CartItemComponent } from "@/components/cart/CartItem";
import { BadgeIndianRupee } from "lucide-react";

const Checkout = () => {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items, navigate]);

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow p-6">
                <CheckoutForm />
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="max-h-80 overflow-y-auto mb-4 divide-y">
                  {items.map((item) => (
                    <CartItemComponent
                      key={`${item.id}-${item.size}-${item.color}`}
                      item={item}
                    />
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes (18%)</span>
                    <span>{formatPrice(subtotal * 0.18)}</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-4 w-4 mr-1" />
                      <span>{formatPrice(subtotal + subtotal * 0.18)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;

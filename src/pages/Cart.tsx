
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { CartItemComponent } from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, BadgeIndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Button
              variant="ghost"
              className="flex items-center"
              onClick={() => navigate("/products")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <div className="bg-card shadow-sm rounded-lg p-6">
                  <div className="divide-y">
                    {items.map((item) => (
                      <CartItemComponent
                        key={`${item.id}-${item.size}-${item.color}`}
                        item={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-card shadow-sm rounded-lg p-6 sticky top-20">
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    
                    <div className="flex justify-between">
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
                  
                  <div className="mt-6 space-y-3">
                    <Button
                      className="w-full"
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg shadow-sm">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button onClick={() => navigate("/products")}>Start Shopping</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default Cart;

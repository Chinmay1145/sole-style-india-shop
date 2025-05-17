
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CartItemComponent } from "@/components/cart/CartItem";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function CartSidebar() {
  const { items, subtotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isCartOpen]);

  // Handle cart close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={handleClose}
      ></div>
      
      {/* Sidebar */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-96 bg-background shadow-xl flex flex-col transition-transform duration-300 ${
          isClosing ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close cart</span>
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length > 0 ? (
            items.map((item) => <CartItemComponent key={`${item.id}-${item.size}-${item.color}`} item={item} />)
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button onClick={() => {
                navigate("/products");
                setIsCartOpen(false);
              }}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => clearCart()}
                className="w-full"
              >
                Clear Cart
              </Button>
              <Button onClick={handleCheckout} className="w-full">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

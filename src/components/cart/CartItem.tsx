
import { useCart, type CartItem } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus } from "lucide-react";

type CartItemProps = {
  item: CartItem;
};

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, name, brand, price, quantity, image, size, color } = item;

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex py-4 border-b last:border-b-0 animate-fade-in">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{brand}</p>
            <div className="mt-1 text-sm">
              <span>Size: {size}</span>
              <span className="mx-2">•</span>
              <span>Color: {color}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{formatPrice(price)}</div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(id, size, color, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(id, size, color, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => removeFromCart(id, size, color)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

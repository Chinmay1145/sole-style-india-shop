
import { useNavigate } from "react-router-dom";
import { Product } from "@/data/products";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    images,
    isNew,
    isOnSale,
    isFeatured,
    isPopular,
    rating,
    reviews,
  } = product;

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Determine which badge to show (prioritize)
  const getBadge = () => {
    if (isNew) return <ProductBadge text="New" variant="new" />;
    if (isOnSale) return <ProductBadge text="Sale" variant="sale" />;
    if (isFeatured) return <ProductBadge text="Featured" variant="featured" />;
    if (isPopular) return <ProductBadge text="Popular" variant="popular" />;
    return null;
  };

  // Handle adding to cart with default size and color
  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    addToCart({
      id,
      name,
      brand,
      price,
      image: images[0],
      size: product.sizes[0],
      color: product.colors[0].name,
    });
  };

  // Handle card click to navigate to product detail
  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="group product-card bg-card rounded-lg overflow-hidden shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Image container with badge */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">{getBadge()}</div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{brand}</span>
          <div className="flex items-center">
            <span className="text-accent text-sm mr-1">★</span>
            <span className="text-sm">{rating}</span>
            <span className="text-xs text-muted-foreground ml-1">
              ({reviews})
            </span>
          </div>
        </div>

        <h3 className="mt-1 font-medium truncate">{name}</h3>

        <div className="mt-2 flex items-center space-x-2">
          <span className="price-tag font-bold">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Quick add button - shows on hover */}
        <div
          className={`mt-3 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            onClick={handleQuickAddToCart}
            size="sm"
            variant="outline"
            className="w-full btn-animated group"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
    </div>
  );
}

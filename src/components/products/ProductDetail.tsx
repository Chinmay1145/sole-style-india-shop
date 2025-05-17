
import { useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, BadgeIndianRupee } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { useToast } from "@/hooks/use-toast";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const {
    name,
    brand,
    price,
    originalPrice,
    description,
    features,
    images,
    colors,
    sizes,
    isNew,
    isOnSale,
    rating,
    reviews,
  } = product;

  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      addToCart(
        {
          id: product.id,
          name,
          brand,
          price,
          image: images[selectedImage],
          size: selectedSize,
          color: selectedColor,
        },
        quantity
      );
      
      toast({
        title: "Added to Cart",
        description: `${quantity}x ${name} (${selectedColor}, Size ${selectedSize})`,
      });
      
      setIsAddingToCart(false);
    }, 500);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main image */}
        <div className="relative rounded-lg overflow-hidden h-96 bg-accent/5">
          <img
            src={images[selectedImage]}
            alt={name}
            className="w-full h-full object-cover animate-fade-in"
          />
          {(isNew || isOnSale) && (
            <div className="absolute top-4 left-4">
              {isNew ? (
                <ProductBadge text="New" variant="new" />
              ) : (
                <ProductBadge text="Sale" variant="sale" />
              )}
            </div>
          )}
        </div>

        {/* Image thumbnails */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                selectedImage === index
                  ? "ring-2 ring-accent"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${name} - view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-xl text-muted-foreground mt-1">{brand}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < Math.floor(rating)
                  ? "text-accent"
                  : "text-muted-foreground/30"
              }`}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-sm">
            {rating} ({reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <BadgeIndianRupee className="h-5 w-5 mr-1 text-accent" />
            <span className="text-2xl font-bold">{formatPrice(price)}</span>
          </div>
          {originalPrice && (
            <span className="text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {originalPrice && (
            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-medium">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{description}</p>

        {/* Colors */}
        <div>
          <h3 className="font-medium mb-2">Color</h3>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full ${
                  selectedColor === color.name
                    ? "ring-2 ring-offset-2 ring-accent"
                    : ""
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              ></button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 border rounded-md text-center min-w-[3rem] transition-colors ${
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-accent"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <h3 className="font-medium mb-2">Quantity</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4 pt-2">
          <Button
            size="lg"
            className="flex-1 btn-animated"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              "Adding..."
            ) : (
              <>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </>
            )}
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Features list */}
        {features && features.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

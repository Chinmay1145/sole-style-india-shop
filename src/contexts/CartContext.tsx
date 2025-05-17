
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (
    productId: number,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shoeShopCart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("shoeShopCart", JSON.stringify(items));
  }, [items]);

  // Add product to cart
  const addToCart = (
    product: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    setItems((prevItems) => {
      // Check if item already exists with same size and color
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });

    // Open cart when adding item
    setIsCartOpen(true);
  };

  // Remove product from cart
  const removeFromCart = (productId: number, size: string, color: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  // Update product quantity
  const updateQuantity = (
    productId: number,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.id === productId &&
          item.size === size &&
          item.color === color
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

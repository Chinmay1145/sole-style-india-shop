
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/products";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight animate-fade-in">
              SHOE<span className="text-accent">VAULT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              All Shoes
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-accent transition-colors flex items-center">
                Categories
              </button>
              <div className="absolute left-0 top-full w-48 bg-background border border-border rounded-md shadow-lg hidden group-hover:block animate-fade-in">
                <div className="p-2 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/products?category=${category}`}
                      className="block px-3 py-2 text-sm hover:bg-accent/10 rounded-md"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              About Us
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center animate-zoom-in">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Panel */}
        {isSearchOpen && (
          <div className="py-4 border-t animate-fade-in">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for shoes..."
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4 animate-fade-in">
            <Link
              to="/"
              className="block px-2 py-2 hover:bg-accent/10 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-2 py-2 hover:bg-accent/10 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Shoes
            </Link>
            <div className="px-2 py-2">
              <div className="font-medium mb-2">Categories</div>
              <div className="ml-2 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${category}`}
                    className="block px-2 py-1 text-sm hover:bg-accent/10 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about"
              className="block px-2 py-2 hover:bg-accent/10 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

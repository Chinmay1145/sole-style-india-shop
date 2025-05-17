
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card py-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">SHOE<span className="text-accent">VAULT</span></h3>
            <p className="text-muted-foreground text-sm">
              Your one-stop destination for stylish and comfortable footwear in India.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/products" className="hover:text-accent transition-colors">
                  All Shoes
                </Link>
              </li>
              <li>
                <Link to="/products?category=Sneakers" className="hover:text-accent transition-colors">
                  Sneakers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Casual" className="hover:text-accent transition-colors">
                  Casual
                </Link>
              </li>
              <li>
                <Link to="/products?category=Formal" className="hover:text-accent transition-colors">
                  Formal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted/20 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShoeVault. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}

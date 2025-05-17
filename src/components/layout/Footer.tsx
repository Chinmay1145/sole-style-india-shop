
import { Link } from "react-router-dom";
import { badgeIndianRupee, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              SHOE<span className="text-accent">VAULT</span>
              <badgeIndianRupee className="ml-1 h-4 w-4" />
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Premium shoes at competitive prices. Delivering quality footwear
              across India since 2023.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link
                  to="/products"
                  className="hover:text-accent transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?gender=men"
                  className="hover:text-accent transition-colors"
                >
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/products?gender=women"
                  className="hover:text-accent transition-colors"
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/products?filter=new"
                  className="hover:text-accent transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/products?filter=sale"
                  className="hover:text-accent transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link to="#" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-accent-foreground rounded-md transition-colors hover:bg-accent/80"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20 text-sm text-primary-foreground/60">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>© 2025 ShoeVault. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="#" className="hover:text-accent transition-colors">
                Terms & Conditions
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

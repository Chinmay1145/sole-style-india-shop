
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  // Generate a random order number
  const orderNumber = `SVT-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-accent animate-bounce-subtle" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <div className="mb-3">
                <span className="text-sm text-muted-foreground">Order number:</span>
                <p className="font-semibold">{orderNumber}</p>
              </div>
              
              <div className="mb-3">
                <span className="text-sm text-muted-foreground">Email:</span>
                <p>We've sent a confirmation to your email address</p>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Estimated delivery:</span>
                <p className="font-semibold">3-5 business days</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;

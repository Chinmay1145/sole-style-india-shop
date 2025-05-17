
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, Truck, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const Success = () => {
  const navigate = useNavigate();

  // Generate a random order number
  const orderNumber = `SVT-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Estimated delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));
  const formattedDeliveryDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(deliveryDate);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Launch confetti celebration
    const launchConfetti = () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };
      
      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }
      
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      
      fire(0.2, {
        spread: 60,
      });
      
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    };
    
    // Launch confetti after a slight delay
    setTimeout(launchConfetti, 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-gradient-to-b from-background to-background/70">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl shadow-2xl p-8 text-center border border-accent/10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, stiffness: 120 }}
              className="mb-8 flex justify-center"
            >
              <div className="h-32 w-32 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-accent animate-bounce-subtle" />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
            >
              Order Successful!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-10 text-lg"
            >
              Thank you for your purchase! Your shoes are on their way to you.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-muted/30 p-8 rounded-xl mb-10 shadow-inner"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center md:items-start p-4 border border-border/50 rounded-lg bg-card/50">
                  <ShoppingBag className="h-8 w-8 text-accent mb-3" />
                  <span className="text-sm text-muted-foreground">Order number</span>
                  <p className="font-bold text-xl tracking-wide">{orderNumber}</p>
                </div>
                
                <div className="flex flex-col items-center md:items-start p-4 border border-border/50 rounded-lg bg-card/50">
                  <Truck className="h-8 w-8 text-accent mb-3 animate-bounce-subtle" />
                  <span className="text-sm text-muted-foreground">Shipping status</span>
                  <p className="font-bold text-xl">Processing</p>
                </div>
                
                <div className="flex flex-col items-center md:items-start p-4 border border-border/50 rounded-lg bg-card/50">
                  <Calendar className="h-8 w-8 text-accent mb-3" />
                  <span className="text-sm text-muted-foreground">Estimated delivery</span>
                  <p className="font-bold text-xl">{formattedDeliveryDate}</p>
                </div>
                
                <div className="flex flex-col items-center md:items-start p-4 border border-border/50 rounded-lg bg-card/50">
                  <div className="h-8 w-8 flex items-center justify-center text-accent mb-3">📧</div>
                  <span className="text-sm text-muted-foreground">Confirmation</span>
                  <p className="font-medium">Sent to your email</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <Button
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </Button>
              
              <Button
                variant="outline"
                className="w-full py-6 text-lg font-medium border-accent/20 hover:bg-accent/10 transition-all duration-300"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;

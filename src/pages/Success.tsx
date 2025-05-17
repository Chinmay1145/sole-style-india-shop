
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, Truck, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { ProductBadge } from "@/components/ui/ProductBadge";

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

    // Launch additional waves of confetti
    setTimeout(launchConfetti, 2500);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-gradient-to-b from-background to-background/70">
        <div className="container mx-auto px-4 max-w-4xl">
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
              <motion.div 
                className="h-32 w-32 rounded-full bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(var(--accent) / 0.3)",
                    "0 0 0 20px rgba(var(--accent) / 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                <CheckCircle className="h-16 w-16 text-accent-foreground animate-bounce-subtle" />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ProductBadge text="Order Confirmed" variant="featured" className="mb-3" />
              <motion.h1 
                className="text-4xl font-bold mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
              >
                Order Successful!
              </motion.h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-6 text-lg"
            >
              Thank you for your purchase! Your shoes are on their way to you.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="px-4 py-2 bg-accent/10 rounded-full text-accent flex items-center gap-2"
                variants={itemVariants}
              >
                <span className="rounded-full h-2 w-2 bg-accent animate-ping"></span>
                Order Processed
              </motion.div>
              
              <motion.div 
                className="px-4 py-2 bg-accent/10 rounded-full text-accent flex items-center gap-2"
                variants={itemVariants}
              >
                <span className="rounded-full h-2 w-2 bg-accent/50"></span>
                Packaging
              </motion.div>
              
              <motion.div 
                className="px-4 py-2 bg-muted/30 rounded-full text-muted-foreground flex items-center gap-2"
                variants={itemVariants}
              >
                <span className="rounded-full h-2 w-2 bg-muted-foreground/50"></span>
                Shipping
              </motion.div>
              
              <motion.div 
                className="px-4 py-2 bg-muted/30 rounded-full text-muted-foreground flex items-center gap-2"
                variants={itemVariants}
              >
                <span className="rounded-full h-2 w-2 bg-muted-foreground/50"></span>
                Delivered
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-muted/30 p-8 rounded-xl mb-10 shadow-inner backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col items-center md:items-start p-6 border border-border/50 rounded-lg bg-card/50 shadow-sm hover:shadow-md transition-all"
                >
                  <ShoppingBag className="h-8 w-8 text-accent mb-3" />
                  <span className="text-sm text-muted-foreground">Order number</span>
                  <p className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">{orderNumber}</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col items-center md:items-start p-6 border border-border/50 rounded-lg bg-card/50 shadow-sm hover:shadow-md transition-all"
                >
                  <Truck className="h-8 w-8 text-accent mb-3 animate-bounce-subtle" />
                  <span className="text-sm text-muted-foreground">Shipping status</span>
                  <p className="font-bold text-xl">Processing</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col items-center md:items-start p-6 border border-border/50 rounded-lg bg-card/50 shadow-sm hover:shadow-md transition-all"
                >
                  <Calendar className="h-8 w-8 text-accent mb-3" />
                  <span className="text-sm text-muted-foreground">Estimated delivery</span>
                  <p className="font-bold text-xl">{formattedDeliveryDate}</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col items-center md:items-start p-6 border border-border/50 rounded-lg bg-card/50 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-8 w-8 flex items-center justify-center text-accent mb-3">
                    <motion.span 
                      animate={{ 
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3 
                      }}
                    >
                      📧
                    </motion.span>
                  </div>
                  <span className="text-sm text-muted-foreground">Confirmation</span>
                  <p className="font-medium">Sent to your email</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg group"
                  onClick={() => navigate("/products")}
                >
                  <span className="relative">
                    Continue Shopping
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-foreground/40 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                  <ShoppingBag className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full py-6 text-lg font-medium border-accent/20 hover:bg-accent/10 transition-all duration-300"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;

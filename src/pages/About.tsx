
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8 text-center">About ShoeVault</h1>
            
            <div className="bg-card rounded-xl shadow-lg p-8 mb-10">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2022, ShoeVault started as a small passion project by a group of footwear enthusiasts in Mumbai. 
                What began as a curated collection of premium shoes has grown into one of India's most trusted online 
                destinations for quality footwear.
              </p>
              <p className="text-muted-foreground">
                We believe that great shoes are an investment in comfort, style, and self-expression. Our mission is to 
                bring the finest footwear from around the world to the doorsteps of Indian consumers, paired with 
                exceptional customer service.
              </p>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-8 mb-10">
              <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">●</span>
                  <span>Curated Selection: We personally test and select each shoe in our inventory.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">●</span>
                  <span>Quality Guarantee: Every product comes with our 100% quality assurance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">●</span>
                  <span>Fast Delivery: Rapid shipping across all major cities in India.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">●</span>
                  <span>Customer-First Approach: Dedicated support team available 7 days a week.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
              <p className="text-muted-foreground mb-4">
                While we're primarily an online store, you can visit our flagship experience center:
              </p>
              <address className="not-italic text-muted-foreground mb-4">
                ShoeVault Experience Center<br />
                42 Fashion Street, Colaba<br />
                Mumbai, Maharashtra 400001<br />
                India
              </address>
              <p className="text-muted-foreground">
                Hours: Monday - Saturday, 10:00 AM - 8:00 PM
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

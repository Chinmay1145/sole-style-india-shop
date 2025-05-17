
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface ProductImageDialogProps {
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialIndex?: number;
}

export function ProductImageDialog({
  images,
  open,
  onOpenChange,
  initialIndex = 0,
}: ProductImageDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const navigateImage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] p-0 bg-transparent border-none overflow-hidden">
        <div className="relative w-full bg-black/90 backdrop-blur-xl">
          <button 
            className="absolute top-4 right-4 z-50 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center justify-center h-[90vh] relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Product image ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            <button
              className="absolute left-4 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
              onClick={() => navigateImage("prev")}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <button
              className="absolute right-4 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
              onClick={() => navigateImage("next")}
            >
              <ArrowRight className="h-6 w-6" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

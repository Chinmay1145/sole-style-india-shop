
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1374&auto=format&fit=crop",
    title: "Step into Style",
    subtitle: "Discover the latest trends in branded footwear",
    cta: "Shop Now"
  },
  {
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1480&auto=format&fit=crop",
    title: "Run Further",
    subtitle: "Performance shoes for every athlete",
    cta: "Explore Running"
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
    title: "New Arrivals",
    subtitle: "Fresh styles just dropped",
    cta: "See What's New"
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            zIndex: index === currentSlide ? 10 : 0,
          }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative h-full z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl mx-auto">
              <h1 
                className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                style={{ 
                  opacity: 0, 
                  animation: index === currentSlide ? 'fade-in 1s ease-out 0.3s forwards' : 'none'
                }}
              >
                {slide.title}
              </h1>
              <p 
                className="text-lg md:text-xl text-white/90 mb-8"
                style={{ 
                  opacity: 0, 
                  animation: index === currentSlide ? 'fade-in 1s ease-out 0.6s forwards' : 'none'
                }}
              >
                {slide.subtitle}
              </p>
              <div 
                style={{ 
                  opacity: 0, 
                  animation: index === currentSlide ? 'fade-in 1s ease-out 0.9s forwards' : 'none'
                }}
              >
                <Button 
                  size="lg" 
                  onClick={() => navigate("/products")}
                  className="bg-accent hover:bg-accent/80 text-accent-foreground px-8 py-6 text-lg"
                >
                  {slide.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

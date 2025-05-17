
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    text: "These shoes are phenomenal! I've been wearing them for my daily runs and they provide exceptional support and comfort. Definitely worth every rupee.",
    author: "Priya Sharma",
    role: "Marathon Runner",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    id: 2,
    text: "I bought these shoes for my son and he absolutely loves them. The quality is excellent and they've held up well despite his active lifestyle.",
    author: "Rajesh Patel",
    role: "Parent",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    text: "The customer service at ShoeVault is outstanding. When I had an issue with sizing, they promptly arranged an exchange. And the shoes? Simply perfect!",
    author: "Ananya Singh",
    role: "Fashion Designer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Go to next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from our satisfied customers across India
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-card shadow-lg rounded-lg p-8 relative">
            {/* Quote Icon */}
            <div className="absolute -top-5 left-8 bg-accent rounded-full p-3 text-accent-foreground">
              <Quote className="h-6 w-6" />
            </div>

            {/* Current Testimonial */}
            <div className="animate-fade-in">
              <p className="text-lg italic mb-8 pt-4">
                "{testimonials[currentIndex].text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-accent scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

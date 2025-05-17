
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { BadgeIndianRupee, CreditCard } from "lucide-react";

type FormErrors = {
  [key: string]: string;
};

export function CheckoutForm() {
  const { subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format price to INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Shipping info validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits";
    }

    // Payment validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required";
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and redirect to success page
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "Your payment has been processed successfully.",
      });
      navigate("/success");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Shipping Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, Apt 4B"
              className={errors.address ? "border-destructive" : ""}
            />
            {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Mumbai"
              className={errors.city ? "border-destructive" : ""}
            />
            {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Maharashtra"
              className={errors.state ? "border-destructive" : ""}
            />
            {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pincode">PIN Code</Label>
            <Input
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="400001"
              className={errors.pincode ? "border-destructive" : ""}
            />
            {errors.pincode && <p className="text-sm text-destructive">{errors.pincode}</p>}
          </div>
        </div>
      </div>
      
      {/* Payment Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Payment Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className={`pl-10 ${errors.cardNumber ? "border-destructive" : ""}`}
                maxLength={19}
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="JOHN DOE"
              className={errors.cardName ? "border-destructive" : ""}
            />
            {errors.cardName && <p className="text-sm text-destructive">{errors.cardName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className={errors.expiryDate ? "border-destructive" : ""}
              maxLength={5}
            />
            {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              type="password"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="•••"
              className={errors.cvv ? "border-destructive" : ""}
              maxLength={4}
            />
            {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="bg-accent/5 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes</span>
            <span>{formatPrice(subtotal * 0.18)}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 mr-1" />
              {formatPrice(subtotal + subtotal * 0.18)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}

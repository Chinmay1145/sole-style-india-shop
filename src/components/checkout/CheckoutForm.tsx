import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { BadgeIndianRupee, CreditCard, Wallet, Tag, Shield, Truck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

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
    upiId: "", // Added for UPI payment
    walletNumber: "", // Added for wallet payment
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

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

    // Payment validation based on selected method
    if (paymentMethod === "card") {
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
    } else if (paymentMethod === "upi") {
      if (!formData.upiId.trim()) {
        newErrors.upiId = "UPI ID is required";
      } else if (!/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/.test(formData.upiId)) {
        newErrors.upiId = "Enter a valid UPI ID (e.g., username@upi)";
      }
    } else if (paymentMethod === "wallet") {
      if (!formData.walletNumber.trim()) {
        newErrors.walletNumber = "Mobile/Wallet number is required";
      } else if (!/^\d{10}$/.test(formData.walletNumber)) {
        newErrors.walletNumber = "Enter a valid 10-digit number";
      }
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
    
    // Simulate payment processing with animated toast
    toast({
      title: "Processing payment...",
      description: `Securely processing your ${paymentMethod.toUpperCase()} payment.`,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and redirect to success page
      clearCart();
      toast({
        title: "Payment successful!",
        description: "Your order has been placed successfully.",
      });
      navigate("/success");
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <motion.div 
        className="space-y-4" 
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-semibold flex items-center">
          <span className="inline-block p-2 bg-accent/10 rounded-full mr-2">
            <Truck className="h-5 w-5 text-accent" />
          </span>
          Shipping Information
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="space-y-2">
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
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
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
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
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
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
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
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
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
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
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
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
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
          </motion.div>
        </div>
      </motion.div>
      
      {/* Payment Information */}
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-semibold flex items-center">
          <span className="inline-block p-2 bg-accent/10 rounded-full mr-2">
            <BadgeIndianRupee className="h-5 w-5 text-accent" />
          </span>
          Payment Method
        </motion.h2>
        
        <motion.div variants={itemVariants}>
          <RadioGroup 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-accent bg-accent/5' : 'border-border'}`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="card" id="card" />
                <div className="grid gap-1.5">
                  <Label htmlFor="card" className="font-medium flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" /> Credit/Debit Card
                  </Label>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-accent bg-accent/5' : 'border-border'}`}
              onClick={() => setPaymentMethod("upi")}
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <div className="grid gap-1.5">
                  <Label htmlFor="upi" className="font-medium flex items-center">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0L1.5 6V18L12 24L22.5 18V6L12 0ZM12 16.5L4.5 12V7.5L12 12L19.5 7.5V12L12 16.5Z" fill="currentColor" />
                    </svg> UPI
                  </Label>
                  <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-accent bg-accent/5' : 'border-border'}`}
              onClick={() => setPaymentMethod("wallet")}
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="wallet" id="wallet" />
                <div className="grid gap-1.5">
                  <Label htmlFor="wallet" className="font-medium flex items-center">
                    <Wallet className="mr-2 h-5 w-5" /> Mobile Wallets
                  </Label>
                  <p className="text-sm text-muted-foreground">Paytm, MobiKwik, FreeCharge</p>
                </div>
              </div>
            </motion.div>
          </RadioGroup>

          <div className="flex items-center mb-6">
            <Shield className="h-5 w-5 text-accent mr-2" />
            <span className="text-sm text-muted-foreground">Secure payment processing with 256-bit encryption</span>
          </div>
        </motion.div>
        
        {paymentMethod === "card" && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
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
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
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
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
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
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
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
            </motion.div>
          </motion.div>
        )}
        
        {paymentMethod === "upi" && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="yourname@upi"
                className={errors.upiId ? "border-destructive" : ""}
              />
              {errors.upiId && <p className="text-sm text-destructive">{errors.upiId}</p>}
              <p className="text-xs text-muted-foreground">Enter your UPI ID like username@bankname or phone@upi</p>
            </motion.div>
          </motion.div>
        )}
        
        {paymentMethod === "wallet" && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="walletNumber">Mobile Number</Label>
              <Input
                id="walletNumber"
                name="walletNumber"
                value={formData.walletNumber}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className={errors.walletNumber ? "border-destructive" : ""}
                maxLength={10}
              />
              {errors.walletNumber && <p className="text-sm text-destructive">{errors.walletNumber}</p>}
              <p className="text-xs text-muted-foreground">Enter the mobile number linked to your wallet</p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Order Summary */}
      <motion.div 
        className="bg-accent/5 p-6 rounded-lg border border-accent/10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-semibold mb-4 flex items-center">
          <Tag className="h-5 w-5 mr-2 text-accent" /> Order Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-accent font-medium">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes (18% GST)</span>
            <span>{formatPrice(subtotal * 0.18)}</span>
          </div>
          <div className="border-t pt-3 mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span className="flex items-center text-xl">
              <BadgeIndianRupee className="h-5 w-5 mr-1" />
              {formatPrice(subtotal + subtotal * 0.18)}
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          type="submit"
          className="w-full py-6 text-lg font-semibold bg-accent hover:bg-accent/90 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            <>Place Order - {formatPrice(subtotal + subtotal * 0.18)}</>
          )}
        </Button>
      </motion.div>
    </form>
  );
}

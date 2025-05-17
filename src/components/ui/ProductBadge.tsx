
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ProductBadgeProps = {
  text: string;
  variant?: "new" | "sale" | "featured" | "popular";
  className?: string;
};

export function ProductBadge({
  text,
  variant = "new",
  className,
}: ProductBadgeProps) {
  const baseClasses =
    "inline-block text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wide";

  const variants = {
    new: "bg-accent text-accent-foreground",
    sale: "bg-destructive text-destructive-foreground",
    featured: "bg-primary text-primary-foreground",
    popular: "bg-secondary text-secondary-foreground",
  };

  return (
    <motion.span 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
      whileHover={{ scale: 1.05 }}
      className={cn(baseClasses, variants[variant], className)}
    >
      {text}
    </motion.span>
  );
}

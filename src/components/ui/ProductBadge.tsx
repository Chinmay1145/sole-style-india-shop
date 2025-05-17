
import { cn } from "@/lib/utils";

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
    "inline-block text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wide badge-bounce";

  const variants = {
    new: "bg-accent text-accent-foreground",
    sale: "bg-destructive text-destructive-foreground",
    featured: "bg-primary text-primary-foreground",
    popular: "bg-secondary text-secondary-foreground",
  };

  return (
    <span className={cn(baseClasses, variants[variant], className)}>{text}</span>
  );
}

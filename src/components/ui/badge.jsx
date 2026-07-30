import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-matcha",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-matcha-soft text-matcha-dark dark:bg-matcha-dark/40 dark:text-[#d2e3c4] dark:border-matcha/30 hover:bg-matcha-light",
        secondary:
          "border-transparent bg-card-alt text-espresso dark:bg-night-card-alt dark:text-night-text dark:border-night-border hover:bg-parchment-dark",
        terracotta:
          "border-transparent bg-terracotta-soft text-terracotta dark:bg-terracotta/35 dark:text-[#f7ded4] dark:border-terracotta/40 hover:bg-terracotta/20",
        outline: "text-espresso dark:text-night-text border-espresso/20 dark:border-night-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

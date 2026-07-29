import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-matcha",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-matcha-soft text-matcha-dark hover:bg-matcha-light",
        secondary:
          "border-transparent bg-card-alt text-espresso hover:bg-parchment-dark",
        terracotta:
          "border-transparent bg-terracotta-soft text-terracotta hover:bg-terracotta/20",
        outline: "text-espresso border-espresso/20",
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

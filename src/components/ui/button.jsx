import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-cozy text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matcha disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-matcha text-white shadow-cozy hover:bg-matcha-dark hover:shadow-cozy-hover",
        outline:
          "border border-matcha/30 bg-card text-espresso hover:bg-matcha-soft hover:border-matcha",
        secondary:
          "bg-card-alt text-espresso hover:bg-parchment-dark",
        ghost:
          "text-espresso hover:bg-matcha-soft hover:text-matcha-dark",
        link: "text-matcha underline-offset-4 hover:underline",
        terracotta:
          "bg-terracotta text-white shadow-cozy hover:bg-terracotta/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-cozy px-3 text-xs",
        lg: "h-12 rounded-cozy-lg px-6 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

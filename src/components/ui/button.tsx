import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ocean-900 text-paper hover:bg-accent-500 hover:text-ocean-900 focus-visible:ring-accent-500 shadow-soft",
        accent:
          "bg-accent-500 text-ocean-900 hover:bg-accent-400 focus-visible:ring-accent-500 shadow-soft",
        secondary:
          "bg-paper text-ocean-900 ring-1 ring-ocean-900/15 hover:bg-bone focus-visible:ring-ocean-900",
        ghost:
          "text-ocean-900 hover:bg-ocean-900/5 focus-visible:ring-ocean-900",
        outline:
          "bg-transparent text-paper ring-1 ring-paper/40 hover:bg-paper/10 focus-visible:ring-accent-500",
        danger:
          "bg-error text-white hover:opacity-90 focus-visible:ring-error",
        link:
          "text-accent-700 underline-offset-4 hover:underline focus-visible:ring-accent-500",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-12 w-full rounded-md bg-paper px-4 py-2 text-sm text-ocean-900 ring-1 ring-ocean-900/15 shadow-sm placeholder:text-muted transition-all duration-300 hover:ring-ocean-900/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:shadow-[0_0_0_6px_rgb(244_180_0_/_0.12)] disabled:cursor-not-allowed disabled:opacity-50",
          invalid && "ring-error focus-visible:ring-error focus-visible:shadow-[0_0_0_6px_rgb(185_28_28_/_0.12)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

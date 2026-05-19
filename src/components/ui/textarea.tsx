import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex min-h-[140px] w-full rounded-md bg-paper px-4 py-3 text-sm text-ocean-900 ring-1 ring-ocean-900/15 shadow-sm placeholder:text-muted transition-all duration-300 hover:ring-ocean-900/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:shadow-[0_0_0_6px_rgb(244_180_0_/_0.12)] disabled:cursor-not-allowed disabled:opacity-50",
          invalid && "ring-error focus-visible:ring-error focus-visible:shadow-[0_0_0_6px_rgb(185_28_28_/_0.12)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

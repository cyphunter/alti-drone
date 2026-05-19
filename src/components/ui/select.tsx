import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

/**
 * Select natif stylé — pas de dépendance Radix, plus simple et plus accessible
 * en mobile (UI native du device).
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={invalid || undefined}
          className={cn(
            "flex h-12 w-full appearance-none rounded-md bg-paper pl-4 pr-10 py-2 text-sm text-ocean-900 ring-1 ring-ocean-900/15 shadow-sm transition-all duration-300 hover:ring-ocean-900/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:shadow-[0_0_0_6px_rgb(244_180_0_/_0.12)] disabled:cursor-not-allowed disabled:opacity-50",
            invalid && "ring-error focus-visible:ring-error focus-visible:shadow-[0_0_0_6px_rgb(185_28_28_/_0.12)]",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={18}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    );
  },
);
Select.displayName = "Select";

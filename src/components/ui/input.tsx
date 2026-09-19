import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 w-full rounded-lg bg-bg px-4 text-base text-fg",
          "shadow-[inset_0_0_0_1px_var(--color-border)]",
          "placeholder:text-subtle",
          "transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
          "focus:shadow-[inset_0_0_0_1px_var(--color-primary),0_0_0_3px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]",
          "focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);

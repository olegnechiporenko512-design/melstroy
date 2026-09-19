import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-fg shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_12px_28px_-12px_rgba(212,162,87,0.55)] hover:bg-honey",
  accent: "bg-accent text-accent-fg hover:bg-accent/90",
  ghost: "bg-transparent text-fg hover:bg-fg/6",
  outline: "bg-transparent text-fg ring-1 ring-border hover:bg-fg/6",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ className, variant = "primary", type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold tracking-wide",
        "transition-[background-color,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
        "active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});

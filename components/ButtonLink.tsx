import type { ComponentProps } from "react";

// Pill-shaped link styled as a button. "main" is the violet call to action, "ghost" the outlined secondary one.
const variants = {
  main: "bg-violet text-on-violet hover:shadow-[0_0_28px_2px_rgb(213_140_255/0.55)]",
  ghost: "border border-line text-ink hover:border-violet",
};

const sizes = {
  md: "px-6 py-3.5 text-xl",
  sm: "px-4 py-2 text-lg",
};

type Props = ComponentProps<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export default function ButtonLink({ variant = "main", size = "md", className = "", ...props }: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full font-display font-extrabold leading-none tracking-wide no-underline transition-shadow ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

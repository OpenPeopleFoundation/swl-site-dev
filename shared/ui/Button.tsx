import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 backdrop-blur";

  const palette =
    variant === "ghost"
      ? "bg-white/5 text-white border border-white/20 hover:bg-white/10 focus-visible:outline-white/50"
      : "bg-white text-black hover:bg-slate-200 focus-visible:outline-white";

  return (
    <button
      className={`${base} ${palette} ${className}`}
      style={{
        fontFamily: "Geist, 'Eurostile', 'Space Grotesk', system-ui, sans-serif",
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

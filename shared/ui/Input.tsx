import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-inner shadow-black/30 backdrop-blur-lg focus:border-white/50 focus:outline-none ${className}`}
      style={{
        fontFamily: "Geist, 'Eurostile', 'Space Grotesk', system-ui, sans-serif",
      }}
      {...props}
    />
  );
}

export default Input;

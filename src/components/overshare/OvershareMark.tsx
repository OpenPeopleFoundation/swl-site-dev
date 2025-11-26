import { OvershareNodeIcon } from "./OvershareNodeIcon";

type OvershareMarkProps = {
  className?: string;
};

const dotBaseClass =
  "relative flex h-2.5 w-2.5 md:h-3 md:w-3 items-center justify-center rounded-full";

export function OvershareMark({ className }: OvershareMarkProps) {
  return (
    <div className={["inline-flex items-center gap-3", className].filter(Boolean).join(" ")}>
      <div
        className={`${dotBaseClass} bg-white/90`}
        style={{
          boxShadow: "0 0 14px rgba(255,255,255,0.75)",
          transformOrigin: "50% 50%",
          animation: "overshare-dot-pulse 3.4s ease-in-out infinite",
          animationDelay: "0s",
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white opacity-25 blur-[6px]" />
      </div>
      <div
        className={`${dotBaseClass} bg-white/75`}
        style={{
          boxShadow: "0 0 12px rgba(255,255,255,0.55)",
          transformOrigin: "50% 50%",
          animation: "overshare-dot-pulse 3.4s ease-in-out infinite",
          animationDelay: "0.6s",
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white opacity-20 blur-[6px]" />
      </div>
      <div
        className="relative"
        style={{
          transformOrigin: "50% 50%",
          animation: "overshare-node-pulse 3.4s ease-in-out infinite",
          animationDelay: "1.2s",
        }}
      >
        <OvershareNodeIcon className="h-6 w-6 md:h-7 md:w-7" />
      </div>
    </div>
  );
}



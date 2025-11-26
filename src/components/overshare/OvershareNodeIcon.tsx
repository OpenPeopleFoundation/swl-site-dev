export type OvershareNodeIconProps = {
  className?: string;
};

export function OvershareNodeIcon({ className }: OvershareNodeIconProps) {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32"
        cy="32"
        r="20"
        stroke="#E5E5E5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="80 40"
        opacity="0.8"
      />
      <circle cx="32" cy="32" r="12" fill="#FACC15" opacity="0.25" />
      <circle cx="32" cy="32" r="8" fill="#FACC15" />
      <circle cx="48" cy="24" r="2" fill="#FACC15" />
      <circle cx="18" cy="32" r="2" fill="#FACC15" opacity="0.8" />
      <circle cx="44" cy="42" r="2" fill="#FACC15" opacity="0.6" />
    </svg>
  );
}



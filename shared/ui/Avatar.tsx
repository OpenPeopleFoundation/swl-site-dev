import Image from "next/image";

type AvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
  className?: string;
};

export function Avatar({
  src,
  alt = "Avatar",
  initials,
  size = 48,
  className = "",
}: AvatarProps) {
  const dimension = { width: size, height: size };

  return (
    <div
      className={`relative flex items-center justify-center rounded-full border border-white/15 bg-neutral-900/70 text-white shadow-inner shadow-black/40 backdrop-blur ${className}`}
      style={{
        ...dimension,
        fontFamily: "Geist, 'Eurostile', 'Space Grotesk', system-ui, sans-serif",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="text-sm uppercase tracking-wide">
          {initials ?? "??"}
        </span>
      )}
    </div>
  );
}

export default Avatar;

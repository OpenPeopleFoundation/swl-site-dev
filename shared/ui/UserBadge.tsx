"use client";

type UserBadgeProps = {
  user: {
    full_name: string;
    avatar_url: string;
    role?: string;
  };
  subtitle?: string;
};

export default function UserBadge({ user, subtitle }: UserBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.avatar_url}
        alt={user.full_name}
        className="h-8 w-8 rounded-full border border-white/10 object-cover"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium">{user.full_name}</span>
        <span className="text-xs text-white/50">
          {subtitle ?? user.role ?? "Staff"}
        </span>
      </div>
    </div>
  );
}

import { SettingsWorkspace } from "@/components/settings/SettingsWorkspace";
import type { SettingsRole } from "@/components/settings/types";

export const metadata = {
  title: "Staff Settings",
};

export default function StaffSettingsPage() {
  const role: SettingsRole = "boh";

  return (
    <div className="flex w-full flex-col gap-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.5em] text-white/50">SettingsOS</p>
        <h1 className="text-4xl font-light tracking-[0.3em]">Personal settings</h1>
        <p className="text-sm text-white/70">
          Update your identity, preferences, and notification options. Owners unlock additional modules.
        </p>
      </header>
      <SettingsWorkspace role={role} />
    </div>
  );
}

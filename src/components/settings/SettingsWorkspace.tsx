"use client";

import { useMemo, useState, type ReactNode } from "react";
import { SettingsSidebar } from "./SettingsSidebar";
import { SETTINGS_NAV } from "./constants";
import type { ProfileState, SettingsRole, SettingsSectionId } from "./types";
import { ProfileSection } from "./sections/ProfileSection";

const roleBadges: Record<SettingsRole, string> = {
  boh: "Back of House",
  foh: "Front of House",
  manager: "Manager",
  owner: "Owner",
};

export function SettingsWorkspace({ role }: { role: SettingsRole }) {
  const items = useMemo(
    () => SETTINGS_NAV.filter((item) => item.roles.includes(role)),
    [role],
  );
  const [activeSection, setActiveSection] = useState<SettingsSectionId>(items[0]?.id ?? "profile");
  const [profile, setProfile] = useState<ProfileState>({
    name: "Noor Aurora",
    email: "noor@snowwhitelaundry.co",
    phone: "+1 (312) 555-0119",
    photoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300",
    role,
    staffId: "swl-204",
  });
  const [profileStatus, setProfileStatus] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  async function handleProfileSave() {
    setProfileSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setProfileSaving(false);
    setProfileStatus("Saved · just now");
  }

  function renderSection(): ReactNode {
    switch (activeSection) {
      case "profile":
        return (
          <ProfileSection
            profile={profile}
            onChange={(patch) => setProfile((prev) => ({ ...prev, ...patch }))}
            onSave={handleProfileSave}
            saving={profileSaving}
            statusMessage={profileStatus}
          />
        );
      default:
        return (
          <SectionPlaceholder
            id={activeSection}
            role={role}
            description="Module is scaffolding the new Cortex SettingsOS surfaces. Owners will unlock additional controls as they land."
          />
        );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.85fr)_minmax(0,2fr)]">
      <SettingsSidebar
        role={role}
        items={items}
        active={activeSection}
        setActive={setActiveSection}
      />
      <div className="space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-[0.5em] text-white/50">Role Context</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.4em]">
              {roleBadges[role]}
            </span>
            <p>
              SettingsOS auto-loads sections for {roleBadges[role]} roles. Owners see every surface; staff view
              only their slices.
            </p>
          </div>
        </div>
        {renderSection()}
      </div>
    </div>
  );
}

function SectionPlaceholder({
  id,
  role,
  description,
}: {
  id: SettingsSectionId;
  role: SettingsRole;
  description: string;
}) {
  return (
    <section className="glass-panel text-white">
      <header className="mb-4 space-y-1">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">{id}</p>
        <h2 className="text-3xl font-light capitalize">{id} module</h2>
      </header>
      <p className="text-sm text-white/70">{description}</p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
        <p>
          When this section is live, it will honor {role} permissions from `user_roles` and store values in the
          matching Supabase tables.
        </p>
      </div>
    </section>
  );
}

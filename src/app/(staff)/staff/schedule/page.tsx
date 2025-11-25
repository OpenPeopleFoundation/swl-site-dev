import StaffSchedulingBoard from "@/domains/staff/components/StaffSchedulingBoard";
import StaffCalendarBoard from "@/domains/staff/components/StaffCalendarBoard";

export default function SchedulePage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <StaffSchedulingBoard />
      <StaffCalendarBoard />
    </div>
  );
}

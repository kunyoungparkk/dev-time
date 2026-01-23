import { Timer } from "@/components/ui/Timer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-10">
      <Timer
        initialHours={0}
        initialMinutes={25}
        initialSeconds={0}
      />
    </div>
  );
}

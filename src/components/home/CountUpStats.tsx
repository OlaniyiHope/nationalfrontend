import { useCountUp } from "@/hooks/useCountUp";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Active Journals" },
  { value: 2000, suffix: "+", label: "Published Articles" },
  { value: 500, suffix: "+", label: "Academic Partners" },
  { value: 35, suffix: "", label: "African Countries" },
];

export function CountUpStats({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark";

  return (
    <div className={`flex flex-wrap justify-center gap-8 md:gap-16 py-8 ${isDark ? "" : ""}`}>
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} isDark={isDark} />
      ))}
    </div>
  );
}

function StatItem({ stat, isDark }: { stat: Stat; isDark: boolean }) {
  const { count, ref } = useCountUp(stat.value, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-4xl md:text-5xl font-bold ${isDark ? "text-accent" : "text-primary"}`}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className={`text-sm mt-1 ${isDark ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {stat.label}
      </div>
    </div>
  );
}

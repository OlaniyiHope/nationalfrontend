import { Check } from "lucide-react";

const steps = [
  { num: 1, label: "Proposal" },
  { num: 2, label: "Governance" },
  { num: 3, label: "Standards" },
  { num: 4, label: "Technical" },
  { num: 5, label: "Review" },
  { num: 6, label: "Launch" },
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mx-auto mb-8 w-full max-w-3xl px-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-2 md:px-4 -z-10">
          <div className="h-0.5 w-full bg-border" />
        </div>

        {steps.map((step) => {
          const isActive = step.num <= current;
          const isCurrent = step.num === current;

          return (
            <div
              key={step.num}
              className="relative flex flex-col items-center group"
            >
              <div
                className={`z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground scale-110"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
              >
                {step.num < current ? (
                  <Check className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`absolute top-full mt-2 w-max text-[10px] md:text-xs font-medium transition-all duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                } ${isCurrent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 md:opacity-100 md:translate-y-0"}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

interface EnhancedProgressProps {
  value: number;
  label?: string;
  className?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

const EnhancedProgress = React.forwardRef<HTMLDivElement, EnhancedProgressProps>(
  ({ value, label, className, showPercentage = true, animated = true, ...props }, ref) => {
    const [animatedValue, setAnimatedValue] = React.useState(0);

    React.useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => setAnimatedValue(value), 100);
        return () => clearTimeout(timer);
      } else {
        setAnimatedValue(value);
      }
    }, [value, animated]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showPercentage) && (
          <div className="flex justify-between items-center mb-2">
            {label && <span className="progress-label">{label}</span>}
            {showPercentage && (
              <span className="text-sm font-semibold text-primary">
                {Math.round(animatedValue)}%
              </span>
            )}
          </div>
        )}
        <div className="progress-bar-large">
          <div
            className="progress-bar-fill"
            style={{
              width: `${animatedValue}%`,
              transition: animated ? 'width 1s ease-out' : 'none'
            }}
          />
        </div>
      </div>
    );
  }
);

EnhancedProgress.displayName = "EnhancedProgress";

export { EnhancedProgress };
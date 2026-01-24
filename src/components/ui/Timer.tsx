"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {TodoIcon, ResetIcon} from "@/components/icons";

// Icon Components
const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    width="80"
    height="100"
    viewBox="0 0 80 100"
    fill="currentColor"
    className={className}
  >
    <path d="M77.6727 45.5679C80.7758 47.5378 80.7758 52.4623 77.6727 54.4321L6.98182 99.3067C3.87879 101.277 -1.56621e-07 98.8143 0 94.8747L3.56802e-06 5.12534C3.72464e-06 1.18573 3.87879 -1.27653 6.98182 0.693278L77.6727 45.5679Z" />
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M8 0C3.58172 0 0 3.58172 0 8V92C0 96.4183 3.58172 100 8 100H32C36.4183 100 40 96.4183 40 92V8C40 3.58172 36.4183 0 32 0H8Z" />
    <path d="M68 0C63.5817 0 60 3.58172 60 8V92C60 96.4183 63.5817 100 68 100H92C96.4183 100 100 96.4183 100 92V8C100 3.58172 96.4183 0 92 0H68Z" />
  </svg>
);

const FinishIcon = ({ className }: { className?: string }) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 8C0 3.58172 3.58172 0 8 0H92C96.4183 0 100 3.58172 100 8V92C100 96.4183 96.4183 100 92 100H8C3.58172 100 0 96.4183 0 92V8Z" />
  </svg>
);

// Timer Unit Component
interface TimerUnitProps {
  value: number;
  label: string;
}

const TimerUnit = ({ value, label }: TimerUnitProps) => {
  const displayValue = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center px-2 py-2 pb-9 gap-9 w-[264px] h-[298px] bg-gradient-to-br from-primary/0 to-primary/20 border border-primary rounded-[12px]">
      <div className="w-[250px] h-[200px] text-[154px] leading-[200px] text-primary text-center font-digital">
        {displayValue}
      </div>
      <div className="fontSize-label-s text-primary text-center">{label}</div>
    </div>
  );
};

// Timer Separator
const TimerSeparator = () => (
  <div className="flex flex-col items-start gap-16 w-6 h-28">
    <div className="w-6 h-6 bg-primary rounded-full self-stretch" />
    <div className="w-6 h-6 bg-primary rounded-full self-stretch" />
  </div>
);

// Timer Action Button
interface TimerActionButtonProps {
  icon: "play" | "pause" | "finish";
  active: boolean;
  onClick?: () => void;
}

const TimerActionButton = ({
  icon,
  active,
  onClick,
}: TimerActionButtonProps) => {
  const IconComponent =
    icon === "play" ? PlayIcon : icon === "pause" ? PauseIcon : FinishIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!active}
      className={cn(
        "flex items-center justify-center w-[100px] h-[100px] rounded-[8px] transition-all",
        active ? "text-primary" : "text-primary/10 cursor-not-allowed",
      )}
    >
      <IconComponent className="w-20 h-[100px]" />
    </button>
  );
};

const TimerActionTodoButton = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-16 h-16 rounded-[8px] text-primary transition-all hover:bg-primary/10"
    >
      <TodoIcon size={48} />
    </button>
  );
}

// Main Timer Component
export interface TimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  className?: string;
}

export const Timer = ({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
  className,
}: TimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  const isReady = !isRunning && hours === 0 && minutes === 0 && seconds === 0;
  const isPaused = !isRunning && (hours > 0 || minutes > 0 || seconds > 0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;

        setMinutes((prevMin) => {
          if (prevMin > 0) {
            setSeconds(59);
            return prevMin - 1;
          }

          setHours((prevHour) => {
            if (prevHour > 0) {
              setMinutes(59);
              setSeconds(59);
              return prevHour - 1;
            }

            setIsRunning(false);
            return 0;
          });

          return 0;
        });

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleFinish = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {/* Timer Display */}
      <div className="flex flex-row items-center gap-12">
        <TimerUnit value={hours} label="H O U R S" />
        <TimerSeparator />
        <TimerUnit value={minutes} label="M I N U T E S" />
        <TimerSeparator />
        <TimerUnit value={seconds} label="S E C O N D S" />
      </div>

      {/* Timer Actions */}
      <div className="flex flex-row items-center gap-[134px]">
        {/* Main Actions */}
        <div className="flex flex-row items-center gap-20">
          <TimerActionButton
            icon="play"
            active={isReady || isPaused}
            onClick={handleStart}
          />
          <TimerActionButton
            icon="pause"
            active={isRunning}
            onClick={handlePause}
          />
          <TimerActionButton
            icon="finish"
            active={isRunning || isPaused}
            onClick={handleFinish}
          />
          <TimerActionTodoButton />
          <ResetIcon size={48}/>
        </div>
      </div>
    </div>
  );
};

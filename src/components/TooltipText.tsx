import { clsx } from "@/utils/tailwind";
import { Tooltip } from "./Tooltip";

interface TooltipTextProps {
  text: string;
  tooltip: string;
  position?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
  className?: string;
}

export function TooltipText({ text, tooltip, position = "bottom", arrow = true, className }: TooltipTextProps) {
  return (
    <Tooltip content={tooltip} side={position} arrow={arrow}>
      <button
        className={clsx("border border-dashed underline decoration-dashed decoration-1 underline-offset-4", className)}
      >
        {text}
      </button>
    </Tooltip>
  );
}

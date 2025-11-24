import { clsx } from "@/utils/tailwind";
import { Tooltip } from "react-tippy";

interface TooltipTextProps {
  text: string;
  tooltip: string;
  position?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
  className?: string;
}

export function TooltipText({ text, tooltip, position = "bottom", arrow = true, className }: TooltipTextProps) {
  return (
    <button
      className={clsx("border border-dashed underline decoration-dashed decoration-1 underline-offset-4", className)}
    >
      {/* @ts-expect-error children mismatch */}
      <Tooltip title={tooltip} arrow={arrow} position={position}>
        {text}
      </Tooltip>
    </button>
  );
}

import { Tooltip } from "react-tippy";

interface TooltipTextProps {
  text: string;
  tooltip: string;
  position?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
  className?: string;
}

export function TooltipText({
  text,
  tooltip,
  position = "bottom",
  arrow = true,
  className = "underline decoration-dashed decoration-1 underline-offset-4",
}: TooltipTextProps) {
  return (
    <button className={className}>
      {/* @ts-expect-error children mismatch */}
      <Tooltip title={tooltip} arrow={arrow} position={position}>
        {text}
      </Tooltip>
    </button>
  );
}


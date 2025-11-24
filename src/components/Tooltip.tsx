import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "@/utils/tailwind";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  arrow?: boolean;
  className?: string;
}

export function Tooltip({ children, content, side = "bottom", sideOffset = 5, arrow = true, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            className={clsx(
              "z-50 overflow-hidden rounded-md bg-darkColors-900 px-3 py-1.5 text-xs text-white shadow-md",
              className,
            )}
          >
            {content}
            {arrow && <TooltipPrimitive.Arrow className="fill-darkColors-900" />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}


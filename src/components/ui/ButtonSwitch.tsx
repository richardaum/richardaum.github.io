import { cn } from "@/utils/tailwind";
import React from "react";

export interface ButtonSwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  active: boolean;
  value: string;
  onClick?: (value: string) => void;
}

export const ButtonSwitch = React.forwardRef<HTMLButtonElement, ButtonSwitchProps>(
  ({ active, value, className, ...props }, ref) => {
    return (
      <button
        {...props}
        onClick={() => props.onClick?.(value)}
        className={cn("rounded-full border-2 border-white px-4 py-1 text-sm", active && "bg-indigo-500")}
      />
    );
  },
);

ButtonSwitch.displayName = "ButtonSwitch";

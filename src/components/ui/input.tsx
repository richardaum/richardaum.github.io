import * as React from "react";

import { cn } from "@/utils/tailwind";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactElement;
}

function useClonedComponent(element?: React.ReactElement) {
  return React.useCallback(
    (props: React.HTMLAttributes<HTMLElement>) => {
      if (!element) return null;
      return React.cloneElement(element, {
        ...props,
        ...element.props,
        className: cn(props.className, element.props.className),
      });
    },
    [element],
  );
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, leftIcon, ...props }, ref) => {
  const LeftIcon = useClonedComponent(leftIcon);

  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        type={type}
        className={cn(
          "peer flex h-12 w-full rounded-full border-2 border-neutral-200 bg-transparent px-3 py-2 text-sm ring-offset-white file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
          leftIcon && "pl-12",
        )}
        ref={ref}
        {...props}
      />

      <LeftIcon className="absolute left-4 -order-1" />
    </div>
  );
});

Input.displayName = "Input";

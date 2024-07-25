import { type ClassValue, clsx as CLSX } from "clsx";
import { twMerge } from "tailwind-merge";

export function clsx(...inputs: ClassValue[]) {
  return twMerge(CLSX(inputs));
}

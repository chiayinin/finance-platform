import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function converAmountFromMiliunits(amount: number) {
  return amount / 1000;
};

export function converAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
};

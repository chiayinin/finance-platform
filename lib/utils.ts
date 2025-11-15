import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

// USD 使用
export function converAmountFromMiliunits(amount: number) {
  return amount / 1000;
};

// USD 使用
export function converAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
};

export function formatCurrency(value: number) {
  return Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
  }).format(value);
};

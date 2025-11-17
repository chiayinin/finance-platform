import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, isSameDay } from "date-fns";

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

export function calculcatePercentageChange(
  current: number,
  previous: number,
) {
  if(previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
};

// 補齊日期區間內缺少的交易紀錄，讓每一天都有一筆資料，即使當天沒有交易也會填上收入與支出為 0
export function fillMissingDays(
  activeDays: {
    date: Date,
    income: number,
    expenses: number,
  }[],
  startDate: Date,
  endDate: Date,
) {
  if(activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if(found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionsByDay;
};

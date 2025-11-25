import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatDate } from '@/lib/date';

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

export function calculatePercentageChange(
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

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if(!period?.from) {
    return `${formatDate(defaultFrom, "LLL do")} - ${formatDate(defaultTo, "LLL do, y")}`;
  }
  if(period?.to) {
    return `${formatDate(period.from, "LLL do")} - ${formatDate(period.to, "LLL do, y")}`;
  }

  return formatDate(period.from, 'LLL do, y');
};

export function formatPercentage(
  value: number,
  option: { addPrefix?: boolean } = {
    addPrefix: false,
  },
) {
  const result = new Intl.NumberFormat("zh-TW", {
    style: "percent",
  }).format(value / 100);

  if(option.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
};

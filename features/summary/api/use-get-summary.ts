import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/hono";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const accountId = params.get('accountId') || '';

  const query = useQuery({
    // TODO: Check if params are needed in the key
    queryKey: ['summary', from, to, accountId],
    queryFn: async () => {
      const respones = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId
        }
      });

      // 因為不是 axios 不會自動處理錯誤
      if(!respones.ok) {
        throw new Error("無法取得財物總覽資料。");
      }

      const { data } = await respones.json();

      return {
        ...data,
        incomeAmount: Math.round(data.incomeAmount),
        expensesAmount: Math.round(data.expensesAmount),
        remainingAmount: Math.round(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: Math.round(category.value),
        })),
        days: data.days.map((day) => ({
          ... day,
          income: Math.round(day.income),
          expenses: Math.round(day.expenses),
        })),
      };
    },
  });

  return query;
}

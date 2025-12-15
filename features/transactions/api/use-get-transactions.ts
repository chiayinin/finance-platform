import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/hono";

export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const accountId = params.get('accountId') || '';

  const query = useQuery({
    queryKey: ['transactions', from, to, accountId],
    queryFn: async () => {
      const respones = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId
        }
      });

      // 因為不是 axios 不會自動處理錯誤
      if(!respones.ok) {
        throw new Error("無法取得全部的交易紀錄。");
      }

      const { data } = await respones.json();

      return data.map((transaction) => ({
        ...transaction,
        amount: Math.round(transaction.amount),
      }));
    },
  });

  return query;
}

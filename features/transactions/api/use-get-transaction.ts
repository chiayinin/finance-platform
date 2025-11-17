import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['transaction', { id }],
    queryFn: async () => {
      const respones = await client.api.transactions[':id'].$get({
        param: { id },
      });

      // 因為不是 axios 不會自動處理錯誤
      if(!respones.ok) {
        throw new Error("無法取得此交易紀錄。");
      }

      const { data } = await respones.json();

      console.log('t data:', data);

      return data;
    },
  });

  return query;
}

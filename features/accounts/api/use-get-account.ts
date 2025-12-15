import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['account', { id }],
    queryFn: async () => {
      const respones = await client.api.accounts[':id'].$get({
        param: { id },
      });

      // 因為不是 axios 不會自動處理錯誤
      if(!respones.ok) {
        throw new Error("無法取得此帳戶。");
      }

      const { data } = await respones.json();

      return data;
    },
  });

  return query;
}

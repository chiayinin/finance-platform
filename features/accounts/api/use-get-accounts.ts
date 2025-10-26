import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const respones = await client.api.accounts.$get();

      // 因為不是 axios 不會自動處理錯誤
      if(!respones.ok) {
        throw new Error("無法取得帳戶。");
      }

      const { data } = await respones.json();

      return data;
    },
  });

  return query;
}

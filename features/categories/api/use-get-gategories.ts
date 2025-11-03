import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const respones = await client.api.categories.$get();

      // 因為不是 axios 不會自動處理錯誤
      if(!respones.ok) {
        throw new Error("無法取得全部帳戶。");
      }

      const { data } = await respones.json();

      return data;
    },
  });

  return query;
}

import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponesType = InferResponseType<typeof client.api.categories[':id']['$delete']>; // 推斷 route 的請求資料型別

export const useDeleteCategory = (id?: string) => {
  // 快取控制器:
  // 手動更新快取（queryClient.setQueryData）
  // 重新抓取資料（queryClient.invalidateQueries）
  const queryClient = useQueryClient();

  // 執行「寫入類型」的操作，處理 loading 狀態、錯誤、成功回呼等。
  const mutation = useMutation<
  ResponesType,
  Error>({
    mutationFn: async () => {
      const response = await client.api.categories[':id']['$delete']({
        param: { id }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("成功刪除類別");
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error("刪除類別失敗")
    },
  });

  return mutation;
};

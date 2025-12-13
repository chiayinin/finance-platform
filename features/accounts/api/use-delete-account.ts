import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponesType = InferResponseType<typeof client.api.accounts[':id']['$delete']>; // 推斷 route 的請求資料型別

export const useDeleteAccount = (id?: string) => {
  // 快取控制器:
  // 手動更新快取（queryClient.setQueryData）
  // 重新抓取資料（queryClient.invalidateQueries）
  const queryClient = useQueryClient();

  // 執行「寫入類型」的操作，處理 loading 狀態、錯誤、成功回呼等。
  const mutation = useMutation<
  ResponesType,
  Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[':id']['$delete']({
        param: { id }
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("成功刪除帳號");
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error("刪除帳號失敗")
    },
  });

  return mutation;
};

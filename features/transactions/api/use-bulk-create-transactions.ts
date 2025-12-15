import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponesType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>; // 推斷 route 的請求資料型別
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"]; // 推斷 route 的回傳資料型別

export const useBulkCreateTransactions = () => {
  // 快取控制器:
  // 手動更新快取（queryClient.setQueryData）
  // 重新抓取資料（queryClient.invalidateQueries）
  const queryClient = useQueryClient();

  // 執行「寫入類型」的操作，處理 loading 狀態、錯誤、成功回呼等。
  const mutation = useMutation<
  ResponesType,
  Error,
  RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("成功建立所有的交易紀錄");
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
    onError: () => {
      toast.error("建立所有的交易紀錄失敗")
    },
  });

  return mutation;
};

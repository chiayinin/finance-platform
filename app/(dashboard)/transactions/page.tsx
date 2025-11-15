"use client"

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { transactions as transactionSchema } from "@/db/schema";

import { columns } from "./columns";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

const enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
};

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST); // 切換為: 表單、匯入，兩種畫面。
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newTransaction = useNewTransaction();
  const createMutation = useBulkCreateTransactions();
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactions = transactionsQuery.data || [];
  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

  const onsubmitImport = async (
    values: typeof transactionSchema.$inferInsert[],
  ) => {
    const accountId = await confirm();

    if(!accountId) {
      return toast.error("請選擇一個帳戶後繼續下一步。");
    }

    const data = values.map((value) => ({
      ...value,
      amount: Math.round(value.amount),
      accountId: accountId as string,
    }));

    createMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if(transactionsQuery.isLoading) {
    return(
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48"/>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex justify-center items-center">
              <Loader2 className="size-6 text-indigo-300 animate-spin"/>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if(variant === VARIANTS.IMPORT) {
    return(<>
      <AccountDialog />
      <ImportCard
        data={importResults.data}
        onCancel={onCancelImport}
        onSubmit={onsubmitImport}
      />
    </>);
  };

  return(<>
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex gap-y-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="text-xl line-clamp-1">
            歷史交易紀錄
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-2">
            <Button onClick={newTransaction.onOpen} size="sm" className="w-full lg:w-auto">
              <Plus className="size-4 mr-2" />
              新增
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);

              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
            />
        </CardContent>
      </Card>
    </div>
  </>);
};

export default TransactionsPage;

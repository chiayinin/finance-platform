"use client"

import { Loader2, Plus } from "lucide-react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
// import { useBulkDeleteAccount } from "@/features/accounts/api/use-bulk-delete";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { columns } from "./columns";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

const TransactionsPage = () => {
  const newTransaction = useNewTransaction();
  const accountsQuery = useGetAccounts();
  // const deleteAccounts = useBulkDeleteAccount();
  const accounts = accountsQuery.data || [];
  // const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if(accountsQuery.isLoading) {
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

  return(<>
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex gap-y-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="text-xl line-clamp-1">
            歷史交易紀錄
          </CardTitle>
          <Button onClick={newTransaction.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            新增
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);

              // deleteAccounts.mutate({ ids });
            }}
            disabled={false}
            />
        </CardContent>
      </Card>
    </div>
  </>);
};

export default TransactionsPage;

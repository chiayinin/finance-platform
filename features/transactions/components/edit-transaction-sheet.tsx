import z from "zod";
import { Loader2 } from "lucide-react";

import { insertTransactionSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { TransactionForm } from "./transaction-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "你確定嗎？",
    "你即將刪除此交易紀錄"
  );

  // Transaction block:
  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  // Category block:
    const categoryMutation = useCreateCategory();
    const categoryQuery = useGetCategories();
    const onCreateCategory = (name: string) => categoryMutation.mutate({
      name
    });
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
      label: category.name,
      value: category.id,
    }));

    // Account block:
    const accountMutation = useCreateAccount();
    const accountQuery = useGetAccounts();
    const onCreateAccount = (name: string) => accountMutation.mutate({
      name
    });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
      label: account.name,
      value: account.id,
    }));

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if(ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () =>{
          onClose();
        }
      });
    }
  }

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: transactionQuery.data.amount.toString(),
    date: transactionQuery.data.date
      ? new Date(transactionQuery.data.date)
      : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes,
  } : {
    accountId: "",
    cateforyId: "",
    amount: "",
    date: new Date(),
    payee: "",
    notes: "",
  };

  return(<>
    <ConfirmDialog></ConfirmDialog>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>編輯交易紀錄</SheetTitle>
          <SheetDescription>
            編輯現有的交易紀錄。
          </SheetDescription>
        </SheetHeader>
        {isLoading
          ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin"/>
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              disabled={isPending}
              onSubmit={onSubmit}
              onDelete={onDelete}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              />
          )}
      </SheetContent>
    </Sheet>
  </>
  )
}

import z from "zod";
import { Loader2 } from "lucide-react";
import { AccountForm } from "./transaction-form";
import { insertAccountSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const [ConfirmDialog, confirm] = useConfirm(
    "你確定嗎？",
    "你即將刪除此 ID"
  );

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = accountQuery.isLoading;

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

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
  } : {
    name: '',
  };

  return(<>
    <ConfirmDialog></ConfirmDialog>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>編輯帳號資料</SheetTitle>
          <SheetDescription>
            編輯現有帳號。
          </SheetDescription>
        </SheetHeader>
        {isLoading
          ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin"/>
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete} />
          )}
      </SheetContent>
    </Sheet>
  </>
  )
}

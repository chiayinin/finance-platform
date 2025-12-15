import { useState, JSX, useRef } from 'react';

import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';

import { Select } from '@/components/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({
    name
  });
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }));


  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void
  } | null>(null);
  const selectValue = useRef<string | undefined>(undefined);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return(
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            選擇帳戶
          </DialogTitle>
          <DialogDescription>
            請選擇一個帳戶，然後繼續下一步。
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="請選擇一個帳戶"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => selectValue.current = value}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button
            onClick={handleCancel}
            variant="outline"
          >
            取消
          </Button>
          <Button onClick={handleConfirm}>
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
  };

  return [ConfirmationDialog, confirm];
};

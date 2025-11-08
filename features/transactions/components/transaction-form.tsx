import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"

import { insertTransactionSchema } from "@/db/schema";
import { converAmountToMiliunits } from "@/lib/utils";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { AmountInput } from "@/components/amount-input";

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// 從零開始定義一個物件 schema
const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

// 從既有 schema 中「移除欄位」建立新 schema
const apiSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string; }[];
  categoryOptions: { label: string; value: string; }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) =>{
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount);
    const amountInMiliunits = converAmountToMiliunits(amount);

    onSubmit({
      ...values,
      amount: amountInMiliunits,
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return(
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 px-4">
          {/* Date */}
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}>
          </FormField>
          {/* Account */}
          <FormField
            name="accountId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>帳戶名稱</FormLabel>
                <FormControl>
                  <Select
                    placeholder="選擇一個帳戶"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}>
          </FormField>
          {/* Category */}
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>類別</FormLabel>
                <FormControl>
                  <Select
                    placeholder="選擇一個類別"
                    options={categoryOptions}
                    onCreate={onCreateCategory}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}>
          </FormField>
          {/* Payee */}
          <FormField
            name="payee"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>收款人</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="新增一位收款人"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}>
          </FormField>
          {/* Amount */}
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>數量</FormLabel>
                <FormControl>
                  <AmountInput
                    {...field}
                    disabled={disabled}
                    placeholder="輸入數字"
                  />
                </FormControl>
              </FormItem>
            )}>
          </FormField>
          {/* Notes */}
          <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>收款人</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    disabled={disabled}
                    placeholder="選填備註"
                  />
                </FormControl>
              </FormItem>
            )}>
          </FormField>
          <Button className="w-full" disabled={disabled}>
            {id ? "儲存變更" : "建立交易紀錄"}
          </Button>
          {!!id && (
            <Button
              type="button"
              disabled={disabled}
              onClick={handleDelete}
              className="w-full"
              variant="outline"
            >
              <Trash className="size-4 mr-2"/>
              刪除交易紀錄
            </Button>
          )}
      </form>
    </Form>
  );
};

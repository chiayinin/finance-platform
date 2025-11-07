import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

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
  accountOptions: { lable: string; value: string; }[];
  categoryOptions: { lable: string; value: string; }[];
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
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return(
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 px-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="例如: 現金、匯款、信用卡"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}>
          </FormField>
          <Button className="w-full" disabled={disabled}>
            {id ? "儲存變更" : "建立帳號"}
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
              刪除帳號
            </Button>
          )}
      </form>
    </Form>
  );
};

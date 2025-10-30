"use client"

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns, Payment } from "./columns";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]
};

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed53f",
    amount: 200,
    status: "pending",
    email: "aaa@example.com",
  },
];

const AccountsPage = () => {
  const newAccount = useNewAccount();

  return(<>
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex gap-y-2 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="text-xl line-clamp-1">
            帳號管理
          </CardTitle>
          <Button onClick={newAccount.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            新增
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
          columns={columns}
          data={data}
          filterKey="email"
          onDelete={() => {}}
          disabled={false} />
        </CardContent>
      </Card>
    </div>
  </>);
};

export default AccountsPage;

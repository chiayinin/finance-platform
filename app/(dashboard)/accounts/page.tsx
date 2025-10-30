"use client"

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

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
      </Card>
    </div>
  </>);
};

export default AccountsPage;

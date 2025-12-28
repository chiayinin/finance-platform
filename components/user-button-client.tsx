'use client';

import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from 'react';

export const UserButtonClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if(!isClient) return null; // 跳過 SSR 階段

  return (
    <>
      <ClerkLoaded>
        <UserButton />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-8 animate-spin text-slate-600" />
      </ClerkLoading>
    </>
  );
};

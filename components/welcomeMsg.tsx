"use client";

import { useUser } from "@clerk/nextjs";
import { log } from "console";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  console.log('user:', user);


  return(
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">歡迎回來{isLoaded ? '，' : ''}{user?.firstName
} 👋！</h2>
      <p className="text-sm lg:text-base text-indigo-200">
        屬於你的好金主數據資料庫
      </p>
    </div>
  )
};

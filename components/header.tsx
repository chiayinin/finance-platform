import { Loader2 } from "lucide-react";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { HeaderLogo } from "@/components/headerLogo";
import { Navigation } from "@/components/navigation";
import { WelcomeMsg } from "@/components/welcomeMsg";
import { Filters } from "@/components/filters";

export const Header = () => {
  return(
  <div className="bg-linear-to-br from-indigo-600 to-indigo-200 px-4 py-8 lg:px-14 pb-36">
    <div className="max-w-screen-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-14">
        <div className="flex items-center lg:gap-x-16">
          <HeaderLogo />
          <Navigation />
        </div>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="size-8 animate-spin text-slate-600"/>
        </ClerkLoading>
      </div>
      <WelcomeMsg />
      <Filters />
    </div>
  </div>
  );
};

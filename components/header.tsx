import { HeaderLogo } from "@/components/headerLogo";
import { Navigation } from "@/components/navigation";
import { WelcomeMsg } from "@/components/welcomeMsg";
import { Filters } from "@/components/filters";
import { UserButtonClient } from "@/components/user-button-client";

export const Header = () => {

  return(
  <div className="bg-linear-to-br from-indigo-600 to-indigo-200 px-4 py-8 lg:px-14 pb-36">
    <div className="max-w-screen-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-14">
        <div className="flex items-center lg:gap-x-16">
          <HeaderLogo />
          <Navigation />
        </div>
        <UserButtonClient/>
      </div>
      <WelcomeMsg />
      <Filters />
    </div>
  </div>
  );
};

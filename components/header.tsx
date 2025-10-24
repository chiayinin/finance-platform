import { HeaderLogo } from "@/components/headerLogo";
import { Navigation } from "@/components/navigation";

export const Header = () => {
  return(
  <div className="bg-gradient-to-br from-indigo-600 to-indigo-200 px-4 py-8 lg:px-14 lg:py-36">
    <div className="max-w-screen-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-14">
        <div className="flex items-center lg:gap-x-16">
          <HeaderLogo />
          <Navigation />
        </div>
      </div>
      Header Component.
    </div>
  </div>
  );
};

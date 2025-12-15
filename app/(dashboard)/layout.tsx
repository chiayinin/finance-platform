import { Suspense } from "react";
import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return(<>
  <Suspense fallback={<div />}>
    <Header></Header>
    <main className="px-3 lg:px-14">
      {children}
    </main>
  </Suspense>
  </>);
};

export default DashboardLayout;

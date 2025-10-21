import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (<>
  <UserButton />
  <h1>This is authenticated route.</h1>
  </>);
}

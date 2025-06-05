import { Home } from "@/components/shared/home";
import { getUserSession } from "@/lib/get-user-session";

import { redirect } from "next/navigation";

export default async function MainPage() {

  const session = await getUserSession();

  if (!session) redirect('/login');

  return (
   <>
    <Home />
   </>
  );
}

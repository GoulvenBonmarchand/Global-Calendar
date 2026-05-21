import { redirect } from "next/navigation";

import LoginForm from "@/components/login/LoginForm";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/calendar");
  }

  return <LoginForm />;
}

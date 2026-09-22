import { redirect } from "next/navigation";
import { getSession } from "./auth-server";

export async function requireSession() {
  const session = await getSession();

  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return session;
}

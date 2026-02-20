import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "master_admin_session";

export default async function AdminEntryPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const validSessionToken = process.env.SESSION_TOKEN;
  const isAuthenticated = Boolean(
    session &&
    validSessionToken &&
    session === validSessionToken
  );

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");
}

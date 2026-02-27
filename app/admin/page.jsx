import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "master_admin_session";
const ROLE_COOKIE_NAME = "admin_role";
const MANAGER_ROLE = "manager";

export default async function AdminEntryPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const role = cookieStore.get(ROLE_COOKIE_NAME)?.value;
  const validSessionToken = process.env.SESSION_TOKEN;
  const isAuthenticated = Boolean(
    session &&
    validSessionToken &&
    session === validSessionToken &&
    role
  );

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  if (role === MANAGER_ROLE) {
    redirect("/admin/manager-dashboard");
  }

  redirect("/admin/dashboard");
}

import { ObjectId } from "mongodb";

export const SESSION_COOKIE_NAME = "master_admin_session";
export const ROLE_COOKIE_NAME = "admin_role";
export const USER_ID_COOKIE_NAME = "admin_user_id";
export const USERNAME_COOKIE_NAME = "admin_username";

export const ADMIN_ROLE = "master_admin";
export const MANAGER_ROLE = "manager";

export function getSessionFromRequest(request) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  const role = request.cookies.get(ROLE_COOKIE_NAME)?.value || "";
  const userId = request.cookies.get(USER_ID_COOKIE_NAME)?.value || "";
  const username = request.cookies.get(USERNAME_COOKIE_NAME)?.value || "";
  const validSessionToken = process.env.SESSION_TOKEN || "";

  const isAuthenticated = Boolean(
    sessionToken &&
      validSessionToken &&
      sessionToken === validSessionToken &&
      role &&
      username
  );

  return {
    isAuthenticated,
    role,
    userId,
    username,
    isAdmin: role === ADMIN_ROLE,
    isManager: role === MANAGER_ROLE,
    objectUserId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
  };
}

export function clearSessionCookies(response) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });
  response.cookies.set(ROLE_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });
  response.cookies.set(USER_ID_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });
  response.cookies.set(USERNAME_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });
}

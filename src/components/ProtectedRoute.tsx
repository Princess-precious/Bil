/**
    * @description      : Redirects signed-out visitors to the sign-in page.
    * @author           : HP
    * @group            :
    * @created          : 04/10/2026
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/10/2026
    * - Author          : HP
    * - Modification    : Created
**/

import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Reads the session straight from localStorage, because AuthProvider keeps
 * `isSignedIn` in memory only and starts out false on every page load.
 */
export const isSignedIn = (): boolean => {
  const hasToken = Boolean(localStorage.getItem("accessToken"));

  const hasUser = Boolean(localStorage.getItem("user"));

  return hasToken || hasUser;
};

type ProtectedRouteProps = {
  children: ReactNode;
};

/**
 * Wraps account-only pages. A visitor who opens a shared story link and then
 * clicks the profile icon is sent to /signin, and after signing in they land
 * back on the page they asked for.
 */
export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const location = useLocation();

  if (!isSignedIn()) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
}

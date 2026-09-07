/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 06/09/2026 - 23:19:21
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
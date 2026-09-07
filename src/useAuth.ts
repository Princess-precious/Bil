/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 06/09/2026 - 23:20:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
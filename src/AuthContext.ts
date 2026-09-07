/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 06/09/2026 - 23:18:20
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { createContext } from "react";

type AuthContextType = {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
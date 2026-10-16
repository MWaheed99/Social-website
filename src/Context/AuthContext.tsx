import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react";
type AuthContextType = {
  token: string | null;
  updateToken: (token: string | null) => void;
};

type ChildrenType = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);
export default function AuthContextProvider({ children } : ChildrenType) {
  const [token, setToken] = useState(function(){return localStorage.getItem("token")})

function updateToken(token : string | null) {
  setToken(token)
  if(token === null){
    localStorage.removeItem("token")
  }else{
  localStorage.setItem("token", token)
  }
}


  return (
    
    <AuthContext.Provider value={{ token , updateToken }}>
      {children}
    </AuthContext.Provider>
    
  )

}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }

  return context;
}
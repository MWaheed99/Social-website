import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function ProtectedRouts() {
  const { token } = useAuth();

  if(!token){
    return <Navigate to={"/auth/login"} />
  }
  return <Outlet />;
}

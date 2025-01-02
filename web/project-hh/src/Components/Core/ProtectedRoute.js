import { Navigate } from "react-router-dom";
import  AuthService from "../../util/auth"

export const ProtectedRoute = ({ children }) => {
  let user=false;
  user = AuthService.loggedIn();
  console.log(user)
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
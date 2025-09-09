import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const jwtToken = Cookies.get("jwt_token");
    console.log('ProtectedRoute jwtToken:', jwtToken); // Confirm value
    if (jwtToken === undefined) {
      return <Navigate to="/login"/>
      
    }
  return children;
}
export default ProtectedRoute;
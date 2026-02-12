import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles }) => {
  // If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role not allowed   
  if (!allowedRoles.includes(user)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
  
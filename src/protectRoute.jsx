import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles }) => {
  // If user is undefined (still loading), render nothing or a loader
  if (user === null || user === undefined) {
    return null; // or a <Spinner /> while loading
  }

  if (!user) {
    // Not logged in  
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user)) {
    // Role not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

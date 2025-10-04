import React from "react";
import { Link } from "react-router-dom";

function AuthLayout({ children }) {
  return (
    <div >
      <div className="relative ">
        <Link to="/" className="text-gray-600 opacity-70 hover:underline absolute top-4 left-4">
          Go back
        </Link>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default AuthLayout;

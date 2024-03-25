import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminAuthProvider = ({ children }) => {
  const isLoggedIn = localStorage.getItem("IsloggenIn");
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      {isLoggedIn === "false" ? (
        <Navigate to={"/"} />
      ) : isAdmin !== "true" ? (
        <Navigate to={"/"} /> // Redirect to home if user is not an admin
      ) : (
        <div>{children}</div> // Render children if user is logged in and is an admin
      )}
    </>
  );
};

export default AdminAuthProvider;

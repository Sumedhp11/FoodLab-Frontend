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
        <Navigate to={"/"} />
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default AdminAuthProvider;

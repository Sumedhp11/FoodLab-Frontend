import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const isloggedIn = localStorage.getItem("IsloggenIn");
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      {isloggedIn === "false" ? (
        <Navigate to={"/"} />
      ) : isAdmin === "true" ? (
        <Navigate to={"/admin"} />
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default AuthProvider;

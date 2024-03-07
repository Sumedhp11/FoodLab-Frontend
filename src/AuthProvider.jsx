import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const isloggedIn = localStorage.getItem("IsloggenIn");

  return (
    <>
      {isloggedIn === "false" ? <Navigate to={"/"} /> : <div>{children}</div>}
    </>
  );
};

export default AuthProvider;

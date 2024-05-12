import { Outlet, Navigate } from "react-router-dom";
import { useMyContext } from "../../context/DataProvider";

const PrivateRoutes = () => {
  const { state } = useMyContext();
  const isAuthenticated = state.isAuth;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;

import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { Restringido } from "../pages/Restringido";


export default function PrivateRouteWithRole({ children }) {
  const { rol } = useContext(AuthContext);

  if (rol === "Doctor") {
    return <Restringido />;
  } else {
    return children;
  }
}

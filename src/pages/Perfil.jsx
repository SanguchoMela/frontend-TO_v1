import CardPerfil from "../components/Perfil/CardPerfil";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Perfil = () => {

  const { auth } = useContext(AuthContext); 

  return (
    <>
      <TitulosOutlet titulo="Perfil" />
      <div className="flex justify-around flex-wrap gap-7 md:flex-nowrap">
        {/* <div className="px-5 w-full md:w-1/2 md:place-content-center">
          <Formulario />
        </div> */}
        <div className="w-full md:w-1/2 justify-center px-5">
          <CardPerfil nombre={auth?.nombre} apellido={auth?.apellido} email={auth?.email} />
          {/* <Contrasena /> */}
        </div>
      </div>
    </>
  );
};

export default Perfil;

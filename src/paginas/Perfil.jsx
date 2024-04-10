import { useState } from "react";
import CardPerfil from "../components/Perfil/CardPerfil";
import Contrasena from "../components/Perfil/Contraseña";
import Formulario from "../components/Perfil/Formulario";
import TitulosOutlet from "../components/TitulosOutlet";

const Perfil = () => {
  return (
    <>
      <TitulosOutlet titulo="Perfil" />
      <div className="flex justify-around flex-wrap gap-7 md:flex-nowrap">
        <div className="px-5 w-full md:w-1/2 md:place-content-center">
          <Formulario />
        </div>
        <div className="w-full md:w-1/2 justify-center px-5">
          <CardPerfil />
          <Contrasena />
        </div>
      </div>
    </>
  );
};

export default Perfil;

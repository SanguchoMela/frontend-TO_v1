import CardPerfil from "../components/Perfil/CardPerfil";
import Formulario from "../components/Perfil/Formulario";
import TitulosOutlet from "../components/TitulosOutlet";

const PerfilPaciente = () => {
  return (
    <>
      <TitulosOutlet titulo="Perfil del paciente" />
      <div className="flex justify-around flex-wrap gap-7 md:flex-nowrap items-center">
        <div className="px-5 w-full md:w-1/2">
          <Formulario />
        </div>
        <div className="w-full md:w-1/2 justify-center px-5">
          <CardPerfil />
        </div>
      </div>
    </>
  );
};

export default PerfilPaciente;

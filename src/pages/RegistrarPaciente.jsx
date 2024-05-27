import Formulario from "../components/Perfil/Formulario";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";

const RegistrarPaciente = () => {
  return (
    <>
      <TitulosOutlet titulo="Registrar paciente" />
      <div className="w-1/2 m-auto">
        <p className="py-2 text-turquesa-fuerte font-semibold">
          Ingresa los datos del paciente a registrar
        </p>
        <div className="">
          <Formulario ruta={"/dashboard/perfilPaciente"} />
        </div>
      </div>
    </>
  );
};

export default RegistrarPaciente;

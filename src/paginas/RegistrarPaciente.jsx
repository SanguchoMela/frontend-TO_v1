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
          {/* <div className="mt-5 py-2 text-center text-blanco font-bold bg-turquesa-500 rounded-lg hover:bg-turquesa-fuerte">
            Registrar paciente
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RegistrarPaciente;

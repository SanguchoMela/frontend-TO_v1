import Formulario from "../components/Perfil/Formulario";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";

const RegistrarPaciente = () => {
  return (
    <>
      <TitulosOutlet titulo="Registrar paciente" />
      <Formulario ruta={"/dashboard/perfilPaciente"} />
    </>
  );
};

export default RegistrarPaciente;

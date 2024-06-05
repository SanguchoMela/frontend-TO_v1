import Buscador from "../components/Modals/Buscador";
import Tabla from "../components/Tabla";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";

const ListaPacientes = () => {
  return (
    <>
      <TitulosOutlet titulo="Lista de pacientes" />
      <Tabla />
    </>
  );
};

export default ListaPacientes;

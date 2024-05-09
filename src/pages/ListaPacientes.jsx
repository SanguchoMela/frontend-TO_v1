import Buscador from "../components/Modals/Buscador";
import Tabla from "../components/Tabla";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";

const ListaPacientes = () => {
  return (
    <>
      <TitulosOutlet titulo="Lista de pacientes" />
      <Buscador />
      <Tabla />
    </>
  );
};

export default ListaPacientes;

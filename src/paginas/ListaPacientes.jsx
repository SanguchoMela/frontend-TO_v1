import Buscador from "../components/Buscador";
import Tabla from "../components/Tabla";
import TitulosOutlet from "../components/TitulosOutlet";

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

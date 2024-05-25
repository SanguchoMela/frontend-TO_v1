import { RiSearchLine } from "react-icons/ri";

const Buscador = () => {
  return (
    <div className="my-2 flex justify-center">
      <input
        className="w-1/2 md:w-1/3 py-2 pl-2 border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
        id="buscador"
        type="search"
        placeholder="Buscar paciente por cédula"
        name="buscador"
      />
      <div className="px-2 flex justify-center items-center border-r border-y border-turquesa-fuerte rounded-r-lg">
        <RiSearchLine className="w-6 text-turquesa-fuerte" />
      </div>
    </div>
  );
};

export default Buscador;

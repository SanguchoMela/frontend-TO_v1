import logoLupa from "../assets/iconos/lupa.png";

const Buscador = () => {
  return (
    <div className="my-2 flex justify-center">
      <input
        className="py-2 pl-2 w-1/3 border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
        id="buscador"
        type="text"
        placeholder="Buscar paciente por cédula"
        name="buscador"
      />
      <div className="px-2 flex justify-center items-center border-r border-y border-turquesa-fuerte rounded-r-lg">
        <img src={logoLupa} width={26} />
      </div>
    </div>
  );
};

export default Buscador;

import Buscador from "../components/Buscador";
import Formulario from "../components/Perfil/Formulario";
import TitulosOutlet from "../components/TitulosOutlet";

const AgendarCita = () => {
  return (
    <>
      <TitulosOutlet titulo="Agendamiento de citas" />
      <section>
        <h4 className="text-turquesa-fuerte font-titulos font-semibold">
          Detalle del paciente
        </h4>
        <Buscador />
        {/* <Formulario/> */}
      </section>
      <section>
        <h4 className="text-turquesa-fuerte font-titulos font-semibold">
          Detalle de la cita
        </h4>
        <form className="mx-5 my-2 grid grid-cols-2 gap-x-5">
          <div>
            <label className="text-sm font-semibold" htmlFor="fecha">
              Fecha
            </label>
            <input
              className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
              id="fecha"
              type="date"
              placeholder="Ingresa tu nombre"
              name="nombre"
            />
          </div>
          <div>
            <label className="text-sm font-semibold" htmlFor="hora">
              Hora
            </label>
            <select
              className="p-2 block w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
              name="hora"
              id="hora"
            >
              <option value="1:00">1:00</option>
              <option value="2:00">2:00</option>
            </select>
          </div>
          <div className="mt-1">
            <label className="text-sm font-semibold" htmlFor="sintomaInicial">
              Síntomas Iniciales
            </label>
            <textarea
              className="block w-full p-2 border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
              name="sintomaInicial"
              id="sintomaInicial"
            ></textarea>
          </div>
        </form>
        <form className="mt-3 flex justify-end">
          <input
            className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
            type="submit"
            value="Agendar"
          />
          <input
            className="ml-3 px-4 py-2 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
            type="submit"
            value="Cancelar"
          />
        </form>
      </section>
    </>
  );
};

export default AgendarCita;

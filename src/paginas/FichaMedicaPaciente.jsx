import Formulario from "../components/Perfil/Formulario";
import TitulosOutlet from "../components/TitulosOutlet";

const FichaMedicaPaciente = () => {
  return (
    <>
      <TitulosOutlet titulo="Ficha médica del paciente" />
      <div>
        <Formulario />
        <div>
          <div className="text-center my-3">
            <h1 className="font-titulos font-bold text-lg">
              Historial de citas
            </h1>
            <hr className="text-turquesa-fuerte border" />
          </div>
          <p>
            <strong>Fecha de la cita:</strong>{" "}
          </p>
          <form>
            <label htmlFor="descripcion">Descripción</label>
            <textarea name="descripcion" id="descripcion"></textarea>
          </form>
        </div>
      </div>
    </>
  );
};

export default FichaMedicaPaciente;

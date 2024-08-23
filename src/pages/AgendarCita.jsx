import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";
import Mensaje from "../components/Alertas/Mensaje";
import TablaAgendar from "../components/TablaAgendar";
import moment from "moment";
import AuthContext from "../context/AuthProvider";
import Error from "../components/Alertas/Error";

const AgendarCita = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [fechaMinima, setFechaMinima] = useState("");
  const { rol } = useContext(AuthContext);
  const titulo = useRef(null);
  const [error, setError] = useState("");

  let isAutorizado = "";

  if (rol === "Secretaria") {
    isAutorizado = true;
  }

  const [form, setForm] = useState({
    start: "",
    end: "",
    comentarios: "",
    idPaciente: "",
    idDoctor: import.meta.env.VITE_ID_DOCTOR || "",
  });

  const setearIDPaciete = (idPaciente) => {
    setForm({
      ...form,
      idPaciente: idPaciente,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let fin = form.end;

    if (name === "start") {
      const start = e.target.value;
      const inicio = moment(start).format("YYYY-MM-DDTHH:mm");
      const horaInicio = moment(inicio).hour();
      const minutos = moment(inicio).minutes();

      if (moment(inicio).day() === 0) {
        setError("No puedes seleccionar un domingo");
        return;
      }
      setError("");

      if (moment(inicio).day() !== 6) {
        if (
          (horaInicio === 10 && minutos < 30) ||
          (horaInicio >= 17 && minutos > 0) ||
          horaInicio < 10 ||
          horaInicio > 16
        ) {
          setError(
            "El horario de entre semana debe estar entre las 10:30 AM y las 4:00 PM"
          );
          return;
        }

        if (horaInicio === 16 && minutos === 30) {
          setError("El último horario de entre semana inicia a las 4:00 PM");
          return;
        }
        setError("");
      }

      if (moment(inicio).day() === 6) {
        if (
          (horaInicio >= 17 && minutos > 0) ||
          horaInicio < 11 ||
          horaInicio > 17
        ) {
          setError(
            "El horario del sábado debe estar entre las 11:00 AM y las 5:00 PM"
          );
          return;
        }

        if (horaInicio === 17 && minutos === 30) {
          setError("El último horario del sábado inicia a las 5:00 PM");
          return;
        }
        setError("");
      }

      if (minutos !== 0 && minutos !== 30) {
        setError("Los minutos deben ser 00 o 30");
        return;
      }

      setError("");
      fin = moment(inicio).add(1, "hours").format("YYYY-MM-DDTHH:mm");
    }
    setForm({
      ...form,
      [name]: value,
      end: fin,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/citas/registrar`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          isSecre: isAutorizado.toString(),
        },
      };
      // Datos del formulario al endpont
      await axios.post(url, form, options);
      // Mensaje de confirmación
      setMensaje({ respuesta: "Cita registrada exitosamente", tipo: true });
      // Navegar a otra interfaz
      setTimeout(() => {
        navigate("/dashboard/citas");
      }, 3000);
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
        // window.location.reload();
      }, 3000);
    } finally {
      irTitulo();
    }
  };

  const handleCancel = () => {
    setForm({
      start: "",
      end: "",
      comentarios: "",
      idPaciente: "",
      idDoctor: import.meta.env.VITE_ID_DOCTOR || "",
    });
    irTitulo();
  };

  const irTitulo = () => {
    if (titulo.current) {
      titulo.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fechaHoy = new Date();
    const fechaFormateada = fechaHoy.toISOString().slice(0, 16);
    setFechaMinima(fechaFormateada);
  }, []);

  return (
    <>
      <div ref={titulo}></div>
      <TitulosOutlet titulo="Agendamiento de citas" />

      <div className="my-2 w-full text-center">
        <span>No sabes cuando agendar una cita? &nbsp;</span>
        <span className="text-turquesa-fuerte hover:underline hover:underline-turquesa-fuerte hover:font-semibold">
          <Link to="/dashboard/citas">Ve los horarios disponibles</Link>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="md:h-min h-4/5">
        <div className="w-2/3 md:w-1/2 m-auto my-1">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
        </div>

        <div className="flex justify-around gap-x-10 mx-6 my-3 flex-wrap md:flex-nowrap">
          <div className="w-full">
            <h4 className="text-turquesa-fuerte font-titulos font-semibold">
              Detalle del paciente
            </h4>

            <div className="mt-2">
              <div>
                <label className="text-sm font-semibold" htmlFor="idPaciente">
                  ID del paciente
                </label>
                <input
                  className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                  id="idPaciente"
                  type="text"
                  name="idPaciente"
                  value={form.idPaciente}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="mt-1">
                <p className="text-sm font-semibold" htmlFor="idPaciente">
                  Busca el ID del paciente por su cédula o apellido
                </p>
                <div className="overflow-y-scroll h-44 mb-5 pr-1 md:mb-0">
                  <TablaAgendar pacienteSeleccionado={setearIDPaciete} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h4 className="text-turquesa-fuerte font-titulos font-semibold">
              Detalle de la cita
            </h4>

            <div className="px-5 w-4/5 m-auto my-2">
              {error.length > 0 && <Error mensaje={error} />}
            </div>

            <div className="mt-2 mb-5">
              <div>
                <label className="text-sm font-semibold" htmlFor="start">
                  Fecha y hora de inicio
                </label>
                <input
                  className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                  id="start"
                  type="datetime-local"
                  min={fechaMinima}
                  name="start"
                  value={form.start}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-1">
                <label className="text-sm font-semibold" htmlFor="end">
                  Fecha y hora de fin
                </label>
                <input
                  className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                  id="end"
                  type="datetime-local"
                  min={fechaMinima}
                  name="end"
                  value={form.end}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="mt-1">
                <label className="text-sm font-semibold" htmlFor="comentarios">
                  Comentarios
                </label>
                <textarea
                  className="block w-full p-2 border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                  name="comentarios"
                  // placeholder="Ingresa un comentario solo si es necesario"
                  id="comentarios"
                  value={form.comentarios || ""}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-6 flex justify-end">
          <input
            className="px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
            type="submit"
            value="Agendar"
          />
          <div
            className="ml-3 px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
            onClick={handleCancel}
          >
            Cancelar
          </div>
        </div>
      </form>
    </>
  );
};

export default AgendarCita;

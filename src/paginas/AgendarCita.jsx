import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buscador from "../components/Buscador";
import TitulosOutlet from "../components/TitulosOutlet";
import Mensaje from "../components/Alertas/Mensaje";

const AgendarCita = () => {

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});

  const [form, setForm] = useState({
    start: "",
    end: "",
    comentarios: "",
    idPaciente: "",
    idDoctor: "66136ac2e2bb69d9e5a225fb"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/citas/registrar`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(url, form, options);
      setMensaje({ respuesta: "Cita registrada exitosamente", tipo: true });
      setTimeout(() => {
        navigate("/dashboard/citas");
      }, 3000);
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  const handleCancel = () => {
    setForm({
      start: "",
      end: "",
      comentarios: "",
      idPaciente: "", 
      idDoctor: "66136ac2e2bb69d9e5a225fb"
    })
  }

  return (
    <>
      <TitulosOutlet titulo="Agendamiento de citas" />

      <form onSubmit={handleSubmit}>

        <div className="w-1/2 m-auto my-1">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
        </div>

        <div>
          <h4 className="text-turquesa-fuerte font-titulos font-semibold">
            Detalle del paciente
          </h4>
          <Buscador />

          <div className="mx-6 my-6 grid grid-cols-2 gap-x-10">
            <div>
              <label className="text-sm font-semibold" htmlFor="idDoctor">ID del doctor</label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="idDoctor"
                type="text"
                name="idDoctor"
                value={form.idDoctor}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="idPaciente">ID del paciente</label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="idPaciente"
                type="text"
                name="idPaciente"
                value={form.idPaciente}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>

        <div>
          <h4 className="text-turquesa-fuerte font-titulos font-semibold">
            Detalle de la cita
          </h4>
          
          <div className="mx-6 mt-3 mb-5 grid grid-cols-2 gap-x-10">
            <div>
              <label className="text-sm font-semibold" htmlFor="start">
                Fecha y hora de inicio
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="start"
                type="datetime-local"
                name="start"
                value={form.start}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="end">
                Fecha y hora de fin
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="end"
                type="datetime-local"
                name="end"
                value={form.end}
                onChange={handleChange}
              />
            </div>
            <div className="mt-1">
              <label className="text-sm font-semibold" htmlFor="comentarios">
                Comentarios
              </label>
              <textarea
                className="block w-full p-2 border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                name="comentarios"
                placeholder="Ingresa un comentario solo si es necesario"
                id="comentarios"
                value={form.comentarios}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

        </div>

        <div className="mx-6 flex justify-end">
          <input
            className="px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
            type="submit"
            value="Agendar"
            />
          <div className="ml-3 px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer" onClick={handleCancel}>Cancelar</div>
        </div>

      </form> 
    </>
  );
};

export default AgendarCita;

import axios from "axios";
import { useState } from "react";
import Mensaje from "../Alertas/Mensaje";

const ActualizarCitaModal = ({ onClose, idCita }) => {
  const [mensaje, setMensaje] = useState({});

  const [form, setForm] = useState({
    start: "",
    end: "",
    comentarios: "",
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
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/citas/actualizar/${idCita}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // Datos del formulario al endpont
      await axios.put(url, form, options);
      // Mensaje de confirmación
      setMensaje({ respuesta: "Cita actualizada con exito", tipo: true });
      // Cerrar el modal y recargar la ventana
      setTimeout(() => {
        setMensaje({});
        onClose()
        window.location.reload()
      }, 2000);
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({ respuesta: "Error al actualizar la cita", tipo: false });
      setTimeout(() => {
        setMensaje({});
        onClose()
      }, 3000);
    }
  };

  const handleCerrarModal = () => {
    onClose();
    setForm({})
  };

  return (
    <>
      <div className="mt-5">
        <h3 className="font-titulos font-bold text-lg text-center">
          Actualizar cita
        </h3>
        <hr className="text-turquesa-fuerte border" />
        <div className="mt-5 mx-10">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="m-8 p-5 border border-turquesa-fuerte shadow-md">
            <div>
              <label className="text-sm font-semibold" htmlFor="start">
                Fecha y hora de inicio
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="start"
                type="datetime-local"
                name="start"
                value={form.start || ""}
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
                value={form.end || ""}
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
                // placeholder="Ingresa un comentario solo si es necesario"
                id="comentarios"
                value={form.comentarios || ""}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <input
              className="px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
              type="submit"
              value="Actualizar"
            />
            <div
              className="ml-3 px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
              onClick={handleCerrarModal}
            >
              Cancelar
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ActualizarCitaModal;

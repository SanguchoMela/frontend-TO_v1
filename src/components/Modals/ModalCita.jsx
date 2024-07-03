import axios from "axios";
import moment from "moment";
import Modal from "react-modal";
import Mensaje from "../Alertas/Mensaje";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const ModalCita = ({ isOpen, onClose, idCita }) => {
  const { rol } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState({});
  const [cita, setCita] = useState(null);
  const [editable, setEditable] = useState(false);
  const [citaActualizada, setCitaActualizada] = useState({});
  const [fechaMinima, setFechaMinima] = useState("");
  const navigate = useNavigate();

  let isSecre = "";
  if (rol === "Secretaria") {
    isSecre = "true";
  }

  const mostrarCitaId = async () => {
    try {
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/citas/mostrar/${idCita}`;
      const options = {
        headers: {
          "Content-Type": "aplication/json",
          Authorization: `Bearer ${token}`,
          isSecre: isAutorizado,
        },
      };
      const response = await axios.get(url, options);
      // Guardar la respuesta del endpoint en una variable
      const citaData = response.data.data;
      // Guardar el detalle de la cita en un estado
      setCita(citaData);
      setCitaActualizada(citaData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelarCita = async (id) => {
    try {
      // Ventana de confirmación del navegador
      const confirmar = window.confirm(
        "Vas a cancelar la cita, ¿estás seguro de realizar esta acción?"
      );
      // Solo se ejecuta si confirma
      if (confirmar) {
        // Endpoint del backend
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/citas/cancelar/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            isSecre: isSecre
          },
        };
        // Respuesta del endpoint
        const response = await axios.put(url, {}, options);
        // Mensaje de confirmación y cierre de modal
        setMensaje({ respuesta: response.data.msg, tipo: true });
        setTimeout(() => {
          setMensaje({});
          onClose();
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  const handleActualizarCita = async (e) => {
    e.preventDefault();
    try {
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/citas/actualizar/${idCita}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // Datos del formulario al endpont
      await axios.put(url, citaActualizada, options);
      setMensaje({ respuesta: "Cita actualizada con exito", tipo: true });
      setEditable(false);
      // Cerrar el modal y recargar la ventana
      setTimeout(() => {
        setMensaje({});
        mostrarCitaId();
      }, 2000);
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({ respuesta: "Error al actualizar la cita", tipo: false });
      setTimeout(() => {
        setMensaje({});
        onClose();
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let fin = citaActualizada.end;

    if (name === "start") {
      const inicio = moment(value).format("YYYY-MM-DDTHH:mm");
      fin = moment(inicio).add(1, "hours").format("YYYY-MM-DDTHH:mm");
    }

    setCitaActualizada({
      ...citaActualizada,
      [name]: value,
      end: fin
    });
  };

  const handleCerrar = () => {
    onClose();
    setEditable(false);
    setMensaje({});
  };

  const handleCancelarActualizar = () => {
    setEditable(false);
    mostrarCitaId();
  };

  const handleActualizarClick = (e) => {
    e.preventDefault();
    setEditable(true);
  };

  let isAutorizado = ''
  // Se muestra el modal si las condiciones cambian
  useEffect(() => {
    // Verifica el modal abierto e ID válido
    if (rol === "Secretaria" || rol === "Doctor") {
      isAutorizado = 'true'
      if (isOpen && idCita) {
        mostrarCitaId();
        const fechaHoy = new Date();
        const fechaFormateada = fechaHoy.toISOString().slice(0, 16);
        setFechaMinima(fechaFormateada);
      }
    }
    // Efecto cuando las dependencias cambian
  }, [rol, isOpen, idCita]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "8px",
      maxWidth: "80%", // Personaliza el ancho máximo del modal
      maxHeight: "80%", // Personaliza la altura máxima del modal
      width: "auto", // Usa "auto" para ajustar automáticamente el ancho al contenido
      // overflowY: "auto", // Permite el desplazamiento vertical si el contenido es largo
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Detalles de la cita"
    >
      <div className="flex items-center">
        <h3 className="font-titulos font-bold text-lg text-center flex-1">
          Detalles de la cita
        </h3>
        <button
          className="px-3 py-1 my-1 text-blanco font-semibold bg-naranja rounded-md cursor-pointer"
          onClick={handleCerrar}
        >
          x
        </button>
      </div>
      <hr className="text-turquesa-fuerte border" />
      <div className="mt-4 mx-10 text-center">
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        {editable ? (
          <p className="text-turquesa-fuerte font-semibold">
            Modifica los datos permitidos
          </p>
        ) : null}
      </div>
      {cita && (
        <div className="mx-5 mt-2 leading-7">
          <div>
            <p>
              <strong>Paciente:</strong>{" "}
              {`${cita.idPaciente.nombre} ${cita.idPaciente.apellido}`}
            </p>
            <p>
              <strong>Estado de la cita:</strong>{" "}
              {cita.isCancelado ? "Cancelada" : "Activa"}
            </p>
            <div>
              <label className="text-base font-bold" htmlFor="start">
                Inicio:
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="start"
                type={editable ? "datetime-local" : "text"}
                min={fechaMinima}
                name="start"
                value={
                  editable
                    ? citaActualizada.start?.slice(0, 16)
                    : moment(cita.start).format("LLL")
                }
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>
            <div>
              <label className="text-base font-bold" htmlFor="end">
                Fin:
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="end"
                type={editable ? "datetime-local" : "text"}
                min={fechaMinima}
                name="end"
                value={
                  editable
                    ? citaActualizada.end?.slice(0, 16)
                    : moment(cita.end).format("LLL")
                }
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div>
              <label className="text-base font-bold" htmlFor="comentarios">
                Comentarios:
              </label>
              <textarea
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="comentarios"
                name="comentarios"
                value={citaActualizada.comentarios}
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>
          </div>
          {/* Botones para acciones dependiendo del rol */}
          {rol === "Secretaria" && (
            <div className="mt-3 flex justify-end">
              {editable ? (
                <>
                  <button
                    onClick={handleActualizarCita}
                    className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                  >
                    Guardar cambios
                  </button>
                  <button
                    onClick={handleCancelarActualizar}
                    className="ml-3 px-4 py-2 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleActualizarClick}
                    className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                  >
                    Actualizar Cita
                  </button>
                  <button
                    className="ml-3 px-4 py-2 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
                    onClick={() => {
                      handleCancelarCita(idCita);
                    }}
                  >
                    Cancelar Cita
                  </button>
                </>
              )}
            </div>
          )}
          {rol === "Doctor" && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  navigate(`/dashboard/perfilPaciente/${cita.idPaciente._id}`)
                }
                className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
              >
                Ver información del paciente
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ModalCita;

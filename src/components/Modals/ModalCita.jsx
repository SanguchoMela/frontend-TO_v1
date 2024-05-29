import axios from "axios";
import moment from "moment";
import Modal from "react-modal";
import Mensaje from "../Alertas/Mensaje";
import React, { useContext, useEffect, useState } from "react";
import ActualizarCitaModal from "./ActualizarCitaModal";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const ModalCita = ({ isOpen, onClose, idCita }) => {
  const { rol } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState({});
  const [cita, setCita] = useState(null);
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [citaActualizar, setCitaActualizar] = useState(null);
  const [idPaciente, setIdPaciente] = useState(null)
  const navigate = useNavigate()

  const handleMostrarModalActualizar = () => {
    setMostrarModalActualizar(true);
    setCitaActualizar(idCita);
  };

  const handleCerrarModalActualizar = () => {
    setMostrarModalActualizar(false);
  };

  const mostrarCitaId = async () => {
    try {
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/citas/mostrar/${idCita}`;
      const options = {
        headers: {
          "Content-Type": "aplication/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);
      // Guardar la respuesta del endpoint en una variable
      const citaData = response.data.data;
      // Doctor: Guardar en el estado el ID del paciente para redirigir 
      setIdPaciente(citaData.idPaciente._id);
      // Guardar el detalle de la cita en un estado
      setCita(citaData);
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
          },
        };
        // Respuesta del endpoint
        const response = await axios.post(url, {}, options);
        // Mensaje de confirmación y cierre de modal
        setMensaje({ respuesta: response.data.msg, tipo: true });
        setTimeout(() => {
          setMensaje({});
          onClose();
        }, 3000);
      }
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  // Se muestra el modal si las condiciones cambian
  useEffect(() => {
    // Verifica el modal abierto e ID válido
    if (isOpen && idCita) {
      mostrarCitaId();
    }
    // Efecto cuando las dependencias cambian
  }, [isOpen, idCita]);

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
      {cita ? (
        <div>
          <div className="flex items-center">
            <h3 className="font-titulos font-bold text-lg text-center flex-1">
              Detalles de la cita
            </h3>
            <button
              className="px-3 py-1 my-1 text-blanco font-semibold bg-naranja rounded-md cursor-pointer"
              onClick={onClose}
            >
              x
            </button>
          </div>
          <hr className="text-turquesa-fuerte border" />
          <div className="mt-5 mx-10">
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
          </div>
          <div className="mx-5 my-6 leading-7 ">
            <p>
              <strong>Paciente:</strong>{" "}
              {`${cita.idPaciente.nombre} ${cita.idPaciente.apellido}`}
            </p>
            <p>
              <strong>Inicio:</strong> {moment(cita.start).format("LLLL")}
            </p>
            <p>
              <strong>Fin:</strong> {moment(cita.end).format("LLLL")}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {cita.isCancelado ? "Cancelada" : "Activa"}
            </p>
            <p>
              <strong>Comentarios:</strong> {cita.comentarios}
            </p>
          </div>
          {/* Botones para acciones dependiendo del rol */}
          {rol === "Secretaria" && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleMostrarModalActualizar}
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
            </div>
          )}
          {rol === "Doctor" && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  navigate(
                    `/dashboard/perfilPaciente/${idPaciente}`
                  )
                }
                className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
              >
                Ver información del paciente
              </button>
            </div>
          )}
          {/* Modal dependiendo del rol */}
          {rol === "Secretaria" && mostrarModalActualizar && (
            <ActualizarCitaModal
              onClose={handleCerrarModalActualizar}
              idCita={idCita}
            />
          )}
        </div>
      ) : (
        <p>Cargando detalles de la cita...</p>
      )}
    </Modal>
  );
};

export default ModalCita;

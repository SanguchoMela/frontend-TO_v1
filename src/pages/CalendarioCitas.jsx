import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Calendario from "../components/Calendario/Calendario";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";
import Mensaje from "../components/Alertas/Mensaje";
import ModalCita from "../components/Modals/ModalCita";
import AuthContext from "../context/AuthProvider";

const CalendarioCitas = () => {
  const [mensaje, setMensaje] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { rol } = useContext(AuthContext);

  const mostrarCitas = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/citas/mostrar-todas`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          isSecre: isAutorizado,
        },
      };

      const response = await axios.get(url, options);
      let citas = response.data.data;
      console.log("Citas obtenidas:", citas);

      citas = citas.filter((cita) => !cita.isCancelado);
      console.log("Citas no canceladas:", citas);

      const citasFormateadas = citas
        .map((cita) => {
          if (cita.idPaciente) {
            return {
              id: cita._id,
              title: `${cita.idPaciente.nombre} ${cita.idPaciente.apellido}`,
              start: new Date(cita.start),
              end: new Date(cita.end),
            };
          } else {
            console.warn("Cita con idPaciente nulo:", cita);
            return null; 
          }
        })
        .filter((cita) => cita !== null);

      console.log("Citas formateadas:", citasFormateadas);
      setEvents(citasFormateadas);
    } catch (error) {
      console.error("Error al mostrar las citas:", error);
      setMensaje({ respuesta: "No se pudieron cargar las citas", tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  let isAutorizado = "";
  useEffect(() => {
    if (rol === "Secretaria" || rol === "Doctor") {
      isAutorizado = "true";
      mostrarCitas();
    }
  }, [rol]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <TitulosOutlet titulo="Calendario de citas" />
      <div className="h-5/6">
        <div className="w-1/2 m-auto my-1">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
        </div>
        <Calendario events={events} onSelectEvent={handleEventClick} />
      </div>

      {selectedEvent && (
        <ModalCita
          isOpen={modalOpen}
          onClose={closeModal}
          idCita={selectedEvent.id}
        />
      )}
    </>
  );
};

export default CalendarioCitas;

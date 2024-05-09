import axios from "axios";
import React, { useState, useEffect } from "react";
import Calendario from "../components/Calendario/Calendario";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";
import Mensaje from "../components/Alertas/Mensaje";
import ModalCita from "../components/Modals/ModalCita";

const CalendarioCitas = () => {
  const [mensaje, setMensaje] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const mostrarCitas = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/citas/mostrar-todas`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, options);
      const citas = response.data.data;

      // console.log(citas)

      const eventosFormateados = citas.map((cita) => ({
        id: cita._id,
        title: `${cita.idPaciente.nombre} ${cita.idPaciente.apellido}`,
        start: new Date(cita.start),
        end: new Date(cita.end),
      }));

      setEvents(eventosFormateados);
    } catch (error) {
      console.log(error);
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  useEffect(() => {
    mostrarCitas();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Al hacer clic en una cita, establece el estado de la cita seleccionada
    setModalOpen(true); // Abre el modal al hacer clic en una cita
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

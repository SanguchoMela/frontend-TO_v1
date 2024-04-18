import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import Calendario from "../components/Calendario/Calendario";
import TitulosOutlet from "../components/TitulosOutlet";

const CalendarioCitas = () => {
  const [events, setEvents] = useState([]);
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
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

        const eventosFormateados = citas.map((cita) => ({
          start: moment(cita.start).toDate(),
          end: moment(cita.end).toDate(),
          title: cita.idPaciente,
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
    mostrarCitas();
  }, []);

  const eventos = [
    {
      start: moment("2024-04-18T10:00:00").toDate(),
      end: moment("2024-04-18T11:00:00").toDate(),
      title: "Juana Martinez",
    },
    {
      start: moment("2024-04-18T11:00:00").toDate(),
      end: moment("2024-04-18T12:00:00").toDate(),
      title: "Juan Perez",
    },
  ];

  return (
    <>
      <TitulosOutlet titulo="Calendario de citas" />
      <div className="h-5/6">
        <Calendario events={events} />
      </div>
    </>
  );
};

export default CalendarioCitas;

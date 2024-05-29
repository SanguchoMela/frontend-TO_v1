import axios from "axios";
import moment from "moment";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";
import AuthContext from "../../context/AuthProvider";
import CrearRegMedicoModal from "../Modals/CrearRegMedicoModal";

const CitasPaciente = () => {
  const { id } = useParams();
  const { rol } = useContext(AuthContext);
  const [citasPaciente, setCitasPaciente] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const verCitasPaciente = async () => {
      try {
        // Endpoint del backend
        const token = localStorage.getItem("token");
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/citas/mostrar-por-paciente/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        // Respuesta del endpoint
        const response = await axios.get(url, options);
        // Guardar la respuesta del endpoint en una variable
        let citasPaciente = response.data.data;
        // Mostrar las citas no canceladas en orden descendente
        citasPaciente = citasPaciente
          .filter((cita) => !cita.isCancelado)
          .sort((a, b) => (moment(a.start).isBefore(b.start) ? 1 : -1));
        // Guardar las citas en el estado
        setCitasPaciente(citasPaciente);
      } catch (error) {
        // Manejo y muestra de errores
        setMensaje({
          respuesta: "Error al mostrar las citas del paciente",
          tipo: false,
        });
        setTimeout(() => {
          setMensaje({});
        });
      }
    };
    verCitasPaciente();
  }, [id]);

  const handleAbrirModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (citasPaciente.length === 0) {
    return <Mensaje tipo={false}>{"No existen registros"}</Mensaje>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="font-titulos font-bold text-lg">Historial de citas</h1>
        <hr className="text-turquesa-fuerte border" />
      </div>
      <div className="w-1/2 m-auto my-1">
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
      </div>
      {citasPaciente.map((cita, index) => (
        <div
          key={cita._id}
          className="border rounded-md border-turquesa-fuerte m-4 p-5"
        >
          <div className="text-center   ">
            <h1 className="font-titulos font-bold text-base">Cita</h1>
            <hr className="text-turquesa-fuerte border" />
          </div>
          <div>
            {/* <div>
              <p>{index+1}</p>
            </div> */}
            <p>
              <strong>Fecha de la cita: </strong>
              {moment(cita.start).format("LLLL")}
            </p>
            <p>
              <strong>Comentarios: </strong>
              {cita.comentarios || ""}
            </p>
          </div>
          {rol === "Doctor" && (
            <form>
              <div className="text-center my-3">
                <h1 className="font-titulos font-bold text-base">
                  Registro médico
                </h1>
                <hr className="text-turquesa-fuerte border" />
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  onClick={handleAbrirModal}
                  className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                >
                  Crear
                </button>
                <button
                  className="ml-3 px-4 py-2 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
                  // onClick={() => {
                  //   handleCancelarCita(idCita);
                  // }}
                >
                  Actualizar
                </button>
              </div>
            </form>
          )}
        </div>
      ))}
      {}
      <CrearRegMedicoModal
        isOpen={modalOpen}
        onClose={closeModal}
        // idCita={selectedEvent.id}
      />
    </>
  );
};

export default CitasPaciente;

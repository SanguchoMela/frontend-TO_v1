import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Mensaje from "./Alertas/Mensaje";

const CitasPaciente = () => {
  const { id } = useParams();
  const [citasPaciente, setCitasPaciente] = useState([]);

  useEffect(() => {
    const verCitasPaciente = async () => {
      try {
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
        const response = await axios.get(url, options);
        let citasPaciente = response.data.data;

        // Mostrar las citas no canceladas en orden descendente
        citasPaciente = citasPaciente
          .filter(cita => !cita.isCancelado)
          .sort((a, b) => moment(a.start).isBefore(b.start) ? 1 : -1
        );

        setCitasPaciente(citasPaciente);

      } catch (error) {
        console.log(error);
      }
    };
    verCitasPaciente();
  }, [id]);

  if (citasPaciente.length === 0) {
    return <Mensaje tipo={false}>{"No existen registros"}</Mensaje>;
  }

  return (
    <>
      <div className="text-center my-3">
        <h1 className="font-titulos font-bold text-lg">Historial de citas</h1>
        <hr className="text-turquesa-fuerte border" />
      </div>
      {citasPaciente.map((cita, index) => (
        <form key={cita._id} className="py-2 px-6">
          <div className="mb-1">
            <label className="font-semibold">
              Fecha de la cita:
              <span className="font-normal">
                {" "}
                {moment(cita.start).format("LLLL")}
              </span>
            </label>
          </div>
          <div className="mt-1">
            <label className="font-semibold" htmlFor="comentarios">
              Comentarios
            </label>
            <textarea
              className="block w-full p-2 border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
              name="comentarios"
              id="comentarios"
              value={cita.comentarios || ""}
              readOnly
            ></textarea>
          </div>
          <hr className="text-turquesa-fuerte border mt-6" />
        </form>
      ))}
    </>
  );
};

export default CitasPaciente;

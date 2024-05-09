import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Mensaje from "./Alertas/Mensaje";

const FichaMedicaPaciente = () => {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState({});
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const verHistorial = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, options);
        const historial = response.data.data;
      } catch (error) {
        console.log(error);
      }
    };
    verHistorial();
  }, []);

  return (
    <>
      {historial.length == 0 ? (
        <Mensaje tipo={"active"}>{"No existen registros"}</Mensaje>
      ) : (
        <>
          <div className="text-center my-3">
            <h1 className="font-titulos font-bold text-lg">
              Historial de citas
            </h1>
            <hr className="text-turquesa-fuerte border" />
          </div>

          {historial.map((historia, index) => (
            <>
              <p>
                <strong>Fecha de la cita:</strong>{historia.fecha}
              </p>
              <form>
                <label htmlFor="descripcion">
                  <strong>Descripción</strong>
                </label>
                <textarea
                  className="block w-full p-2 border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                  name="descripcion"
                  id="descripcion"
                ></textarea>
              </form>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default FichaMedicaPaciente;

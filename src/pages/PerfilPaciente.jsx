import Mensaje from "../components/Alertas/Mensaje";
import CardPerfil from "../components/Perfil/CardPerfil";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import CitasPaciente from "../components/CitasPaciente";
import RegMedicoPaciente from "../components/RegMedicoPaciente";

const PerfilPaciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [mensaje, setMensaje] = useState({});

  const { rol } = useContext(AuthContext);

  useEffect(() => {
    const verPaciente = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/detallePaciente/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, options);
        setPaciente(response.data.paciente);
      } catch (error) {
        setMensaje({ respuesta: error.response.paciente.msg, tipo: false });
        setTimeout();
      }
    };
    verPaciente();
  }, []);

  return (
    <>
      <TitulosOutlet titulo="Perfil del paciente" />
      <div className="flex justify-around h-5/6 flex-wrap gap-7 md:flex-nowrap">
        <div className="px-5 w-full md:w-1/2 md:place-content-center">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <CardPerfil
            nombre={paciente?.nombre}
            apellido={paciente?.apellido}
            email={paciente?.email}
          />
        </div>
        <div className="md:overflow-y-scroll h-full my-5 w-full md:w-1/2 md:place-content-center px-5">
          {rol === "Doctor" && (
            <RegMedicoPaciente />
          )}
          {rol === "Secretaria" && (
            <CitasPaciente />
          )}
        </div>
      </div>
    </>
  );
};

export default PerfilPaciente;

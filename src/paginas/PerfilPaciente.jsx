import Mensaje from "../components/Alertas/Mensaje";
import CardPerfil from "../components/Perfil/CardPerfil";
import Formulario from "../components/Perfil/Formulario";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import FichaMedicaPaciente from "../components/FichaMedicaPaciente";

const PerfilPaciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [mensaje, setMensaje] = useState({});

  const { rol } = useContext(AuthContext);

  useEffect(() => {
    const verPaciente = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, options);

        setPaciente(response.data.paciente);
        // console.log(paciente)
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
      <div className="flex justify-around flex-wrap gap-7 md:flex-nowrap items-center">
        {rol === "Secretaria" && (
          <div className="px-5 w-full md:w-1/2">
            <Formulario />
          </div>
        )}
        <div className="w-full md:w-1/2 justify-center px-5">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <CardPerfil
            nombre={paciente?.nombre}
            apellido={paciente?.apellido}
            email={paciente?.email}
          />
        </div>
        {rol === "Doctor" && (
          <div className="px-5 w-full md:w-1/2">
            <FichaMedicaPaciente />
          </div>
        )}
      </div>
    </>
  );
};

export default PerfilPaciente;

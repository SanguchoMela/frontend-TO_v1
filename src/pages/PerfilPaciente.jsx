import Mensaje from "../components/Alertas/Mensaje";
import CardPerfil from "../components/Perfil/CardPerfil";
import TitulosOutlet from "../components/Estilos/TitulosOutlet";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CitasPaciente from "../components/Perfil/CitasPaciente";
import AuthContext from "../context/AuthProvider";

const PerfilPaciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const { rol } = useContext(AuthContext);

  const verPaciente = async () => {
    try {
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/detallePaciente/${id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          isSecre: isAutorizado,
        },
      };
      // Respuesta del endpoint
      const response = await axios.get(url, options);
      // Guardar la información del paciente en el estado
      setPaciente(response.data.paciente);
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({ respuesta: error.response.paciente.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  let isAutorizado = "";
  // Efecto al mostrar el componente
  useEffect(() => {
    if (rol === "Secretaria" || rol === "Doctor") {
      isAutorizado = "true";
      verPaciente();
    }
  }, [rol, id]);

  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fechaNac = paciente?.fechaNacimiento
    ? new Date(paciente.fechaNacimiento).toLocaleString("es-ES", {
        ...opciones,
        timeZone: "UTC",
      })
    : "";

  return (
    <>
      <TitulosOutlet titulo="Perfil del paciente" />
      <div className="flex justify-around h-5/6 flex-wrap gap-7 md:flex-nowrap">
        <div className="mx-5 w-full md:w-1/2 md:place-content-center">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <CardPerfil
            nombre={paciente?.nombre}
            apellido={paciente?.apellido}
            cedula={paciente?.cedula}
            fechaNacimiento={fechaNac}
            lugarNacimiento={paciente?.lugarNacimiento}
            estadoCivil={paciente?.estadoCivil}
            direccion={paciente?.direccion}
            telefono={paciente?.telefono}
            email={paciente?.email}
          />
        </div>
        <div className="md:overflow-y-scroll md:h-full md:my-5 w-full md:w-1/2 md:place-content-center px-5 mx-2">
          <CitasPaciente />
        </div>
      </div>
    </>
  );
};

export default PerfilPaciente;

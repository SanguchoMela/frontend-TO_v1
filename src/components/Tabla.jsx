import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { RiDeleteBin2Fill, RiInformationFill } from "react-icons/ri";
import Mensaje from "../components/Alertas/Mensaje";
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [pacientes, setPacientes] = useState([]);

  const { rol } = useContext(AuthContext);

  const listarPacientes = async () => {
    try {
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/listar-pacientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // Respuesta del endpoint
      const response = await axios.get(url, options);
      // Guardar la respuesta del endpoint en una variable
      const pacientes = response.data.data;
      // Informacion de pacientes guardada en el estado
      setPacientes(pacientes);
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({
        respuesta: "Ocurrió un error al listar los pacientes",
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
      },3000);
    }
  };

  useEffect(() => {
    listarPacientes();
  }, []);

  const handleEliminarPaciente = async (id) => {
    try {
      // Ventana de confirmación del navegador
      const confirmar = window.confirm(
        "Vas a eliminar a un paciente, ¿estás seguro de realizar esta acción?"
      );
      // Solo se ejecuta si confirma
      if (confirmar) {
        // Endpoint del backend
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarUsuario/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        // Respuesta del endpoint
        const response = await axios.delete(url, options);
        // Mensaje de confirmación y recarga de la ventana
        setMensaje({ respuesta: response.data.msg, tipo: true });
        setTimeout(() => {
          setMensaje({});
          window.location.reload();
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

  return (
    <>
      {pacientes.length == 0 ? (
        <Mensaje tipo={false}>{"No existen registros"}</Mensaje>
      ) : (
        <>
          <div className="w-1/2 m-auto my-1">
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
          </div>
          <table className="w-full mt-5 table-auto shadow-lg">
            <thead>
              <tr className="font-titulos">
                <th>N°</th>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Correo electrónico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {pacientes.map((paciente, index) => (
                <tr key={paciente._id}>
                  <td>{index + 1}</td>
                  <td>{paciente.cedula}</td>
                  <td>
                    {paciente.nombre} {paciente.apellido}
                  </td>
                  <td>{paciente.email}</td>
                  <td className="text-center">
                    <RiInformationFill
                      className="h-5 w-5 text-turquesa-fuerte inline mr-3 cursor-pointer"
                      onClick={() =>
                        navigate(`/dashboard/perfilPaciente/${paciente._id}`)
                      }
                    />
                    {rol === "Secretaria" && (
                      <RiDeleteBin2Fill
                        className="h-5 w-5 text-turquesa-fuerte inline cursor-pointer"
                        onClick={() => {
                          handleEliminarPaciente(paciente._id);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Tabla;

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
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/listar-pacientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, options);
      const pacientes = response.data.data;

      setPacientes(pacientes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminarPaciente = async (id) => {
    try {
      const confirmar = window.confirm(
        "Vas a eliminar a un paciente, ¿estás seguro de realizar esta acción?"
      );
      if (confirmar) {
        const token = localStorage.getItem("token");
        const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarUsuario/${id}`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(url, options);

        setMensaje({ respuesta: response.data.msg, tipo: true });
        setTimeout(() => {
          setMensaje({});
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  useEffect(() => {
    listarPacientes();
  }, []);

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

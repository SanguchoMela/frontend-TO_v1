import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { RiDeleteBin2Fill, RiInformationFill } from "react-icons/ri";
import Mensaje from "../components/Alertas/Mensaje";
import AuthContext from "../context/AuthProvider";

const Tabla = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    listarPacientes();
  }, []);

  return (
    <>
      {pacientes.length == 0 ? (
        <Mensaje tipo={"active"}>{"No existen registros"}</Mensaje>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg">
          <thead>
            <tr className="font-titulos">
              <th>N°</th>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pacientes.map((paciente, index) => (
              <tr key={paciente._id}>
                <td>{index + 1}</td>
                <td>{paciente.ci}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td className="text-center">
                  <RiInformationFill
                    className="h-5 w-5 text-turquesa-fuerte inline mr-3 cursor-pointer"
                    onClick={() =>
                      navigate(`/dashboard/perfilPaciente/${paciente._id}`)
                    }
                  />
                  {/* <RiEditFill className="h-5 w-5 text-turquesa-fuerte inline mr-3"/> */}
                  {rol === "Secretaria" && (
                    <RiDeleteBin2Fill className="h-5 w-5 text-turquesa-fuerte inline cursor-pointer" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Tabla;

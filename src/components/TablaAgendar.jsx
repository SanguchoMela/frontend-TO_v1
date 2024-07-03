import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSelect } from "react-icons/ai";
import Buscador from "./Modals/Buscador";
import AuthContext from "../context/AuthProvider";

const TablaAgendar = ({ pacienteSeleccionado }) => {
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [search, setSearch] = useState("");
  const { rol } = useContext(AuthContext);

  const obtenerPacientes = async () => {
    try {
      // Endpoint del backend
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/listar-pacientes`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          isSecre: isAutorizado
        },
      };
      // Respuesta del endpoint
      const response = await axios.get(url, options);
      // Guardar la respuesta del endpoint en una variable
      const pacientes = response.data.data;
      // Informacion de pacientes guardada en el estado
      setPacientes(pacientes);
      setPacientesFiltrados(pacientes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (searchValue) => {
    setSearch(searchValue);
    const resultadosFiltrados = pacientes.filter((paciente) =>
      paciente.cedula.includes(searchValue)
    );
    setPacientesFiltrados(resultadosFiltrados);
  };

  const seleccionarPaciente = (idPaciente) => {
    pacienteSeleccionado(idPaciente);
  };

  let isAutorizado = "";
  useEffect(() => {
    if (rol === "Secretaria" || rol === "Doctor") {
      isAutorizado = "true";
      obtenerPacientes();
    }
  }, [rol]);

  return (
    <div className="flex flex-col">
      <Buscador
        pacientes={pacientes}
        setPacientesFiltrados={setPacientesFiltrados}
        onSearchChange={handleSearchChange}
      />
      <table className="shadow-lg">
        <thead>
          <tr className="font-titulos text-sm">
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {pacientesFiltrados &&
            search &&
            pacientesFiltrados.map((pacienteFil, index) => (
              <tr key={pacienteFil._id}>
                <td>{pacienteFil.cedula}</td>
                <td>
                  {pacienteFil.nombre} {pacienteFil.apellido}
                </td>
                <td className="text-center">
                  <AiOutlineSelect
                    className="h-5 w-5 text-turquesa-fuerte inline mr-3 cursor-pointer"
                    onClick={() => seleccionarPaciente(pacienteFil._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAgendar;

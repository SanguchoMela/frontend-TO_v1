import { useEffect, useState } from "react";

const Buscador = ({ pacientes, setPacientesFiltrados, onSearchChange }) => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  useEffect(() => {
    const resultadosFiltrados = pacientes.filter((paciente) => {
      const cedulaMatch = paciente.cedula && paciente.cedula.includes(search);
      const apellidoMatch =
        paciente.apellido &&
        paciente.apellido.toLowerCase().includes(search.toLowerCase());
      return cedulaMatch || apellidoMatch;
    });
    setPacientesFiltrados(resultadosFiltrados);
  }, [search, pacientes, setPacientesFiltrados]);

  return (
    <>
      <div className="mb-2 mt-1 flex justify-center">
        <input
          className="w-full py-2 pl-2 border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="buscador"
          type="search"
          value={search}
          onChange={handleChange}
          placeholder="Buscar paciente por cédula o apellido"
          name="buscador"
        />
      </div>
    </>
  );
};

export default Buscador;

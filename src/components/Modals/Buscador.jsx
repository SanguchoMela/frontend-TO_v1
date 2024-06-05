import { useEffect, useState } from "react";

const Buscador = ({ pacientes, setPacientesFiltrados }) => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  console.log(search)
  useEffect(() => {
    const resultadosFiltrados = pacientes.filter((paciente) =>
      paciente.cedula.includes(search)
    );
    setPacientesFiltrados(resultadosFiltrados);
    console.log(resultadosFiltrados);
  }, [search, pacientes, setPacientesFiltrados]);

  return (
    <>
      <div className="my-2 flex justify-center">
        <input
          className="w-1/2 md:w-1/3 py-2 pl-2 border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="buscador"
          type="search"
          value={search}
          onChange={handleChange}
          placeholder="Buscar paciente por cédula"
          name="buscador"
        />
      </div>
    </>
  );
};

export default Buscador;

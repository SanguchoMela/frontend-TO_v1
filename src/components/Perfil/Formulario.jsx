import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";
import axios from "axios";

const Formulario = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    isPaciente: "true",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
      const response = await axios.post(url,form);
      setMensaje({
        respuesta: "Paciente registrado exitosamente y correo enviado",
        tipo: true,
      });
      setTimeout(() => {
        navigate("/dashboard/listaPacientes");
      }, 3000);
    } catch (error) {
      // setMensaje({ respuesta: error.response.data.msg, tipo: false });
      if (error.response && error.response.data && error.response.data.msg) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      } else {
        setMensaje({
          respuesta: "Ocurrió un error al intentar registrar el paciente.",
          tipo: false,
        });
      }
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-2/3 m-auto my-1">
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
      </div>
      <div>
        <label className="text-sm font-semibold" htmlFor="nombre">
          Nombre
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="nombre"
          type="text"
          placeholder="Ingresa tu nombre"
          name="nombre"
          value={form.nombre || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="apellido">
          Apellido
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="apellido"
          type="text"
          placeholder="Ingresa tu apellido"
          name="apellido"
          value={form.apellido || ""}
          onChange={handleChange}
        />
      </div>
      {/* <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="ci">
          CI
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="ci"
          type="text"
          placeholder="Ingresa tu número de cédula"
          name="ci"
        />
      </div>
      <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="fecha_nacimiento">
          Fecha de nacimiento
        </label>
        <input
          className="py-2 px-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="fecha_nacimiento"
          type="date"
          name="fecha_nacimiento"
        />
      </div> */}
      <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="email"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mt-1">
        <label className="text-sm font-semibold">Contraseña</label>
        <div className="flex">
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            name="contraseña"
            value={form.contraseña || ""}
            onChange={handleChange}
            className="py-2 pl-2 block w-full border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          />
          {/* <div>
            <VerPassword show={showPass} switchShow={setShowPass} />
          </div> */}
        </div>
      </div>
      <input
        className="mt-5 py-2 text-center w-full text-blanco font-bold bg-turquesa-500 rounded-lg hover:bg-turquesa-fuerte cursor-pointer"
        type="submit"
        value="Registrar"
      />
    </form>
  );
};

export default Formulario;

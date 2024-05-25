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
    cedula: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    estadoCivil: "",
    direccion: "",
    telefono: "",
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
      await axios.post(url, form);
      console.log(form);
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
        setForm({});
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <>
      <div className="w-2/3 m-auto mt-2 mb-5">
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
      </div>
      <form onSubmit={handleSubmit} className="md:overflow-y-scroll h-96">
        <div>
          <label className="text-sm font-semibold" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="nombre"
            type="text"
            placeholder="Ingresa el nombre"
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
            placeholder="Ingresa el apellido"
            name="apellido"
            value={form.apellido || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="cedula">
            CI
          </label>
          <input
            className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="cedula"
            type="text"
            placeholder="Ingresa el número de cédula"
            name="cedula"
            value={form.cedula || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="email"
            type="email"
            placeholder="Ingresa el correo electrónico"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="fechaNacimiento">
            Fecha de nacimiento
          </label>
          <input
            className="py-2 px-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="fechaNacimiento"
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="lugarNacimiento">
            Lugar de nacimiento
          </label>
          <input
            className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="lugarNacimiento"
            type="text"
            placeholder="Ingresa el lugar de nacimiento"
            name="lugarNacimiento"
            value={form.lugarNacimiento || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="estadoCivil">
            Estado civil
          </label>
          <input
            className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="estadoCivil"
            type="text"
            placeholder="Ingresa el estado civil"
            name="estadoCivil"
            value={form.estadoCivil || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="direccion">
            Dirección
          </label>
          <input
            className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="direccion"
            type="text"
            placeholder="Ingresa la direccion"
            name="direccion"
            value={form.direccion || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="telefono">
            Teléfono
          </label>
          <input
            className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            id="telefono"
            type="text"
            placeholder="Ingresa el telefono"
            name="telefono"
            value={form.telefono || ""}
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
    </>
  );
};

export default Formulario;

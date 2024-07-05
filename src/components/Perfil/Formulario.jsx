import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";
import axios from "axios";

const Formulario = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const titulo = useRef(null);

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
    password: "",
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
      // Endpoint del backend
      const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
      // Enviar datos del formulario al endpoint
      await axios.post(url, form);
      // Mensaje de confirmación
      setMensaje({
        respuesta: "Paciente registrado exitosamente y correo enviado",
        tipo: true,
      });
      // Redirigir a otra interfaz
      setTimeout(() => {
        navigate("/dashboard/listaPacientes");
      }, 3000);
    } catch (error) {
      // Manejo y muestra de errores (del endpoint y otros)
      if (error.response && error.response.data && error.response.data.msg) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      } else {
        setMensaje({
          respuesta: "Ocurrió un error al intentar registrar el paciente.",
          tipo: false,
        });
      }
      // Vaciar los datos del formulario
      setTimeout(() => {
        setMensaje({});
        setForm({});
        window.location.reload();
      }, 3000);
    } finally {
      irTitulo()
    }
  };

  const irTitulo = () => {
    if (titulo.current) {
      titulo.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCancel = () => {
    setForm({})
    irTitulo()
  }

  return (
    <>
      <div
        ref={titulo}
        className="mt-2 w-full text-center text-turquesa-fuerte"
      >
        <span>Ingresa los datos del paciente que desees registrar</span>
      </div>
      <div className="md:w-1/2 w-2/3 m-auto mt-2 mb-5">
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
      </div>
      <form onSubmit={handleSubmit} className="md:h-min h-4/5">
        <div className="flex justify-around gap-x-10 mx-6 flex-wrap md:flex-nowrap">
          <div className="w-full">
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
              <label
                className="text-sm font-semibold"
                htmlFor="lugarNacimiento"
              >
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
              <label
                className="text-sm font-semibold"
                htmlFor="fechaNacimiento"
              >
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
          </div>
          <div className="w-full">
            <div>
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
                type="tel"
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
                  name="password"
                  value={form.password || ""}
                  onChange={handleChange}
                  className="py-2 pl-2 block w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                />
                {/* <div>
            <VerPassword show={showPass} switchShow={setShowPass} />
          </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="m-6 flex justify-end">
          <input
            className="py-2 px-3 text-center text-sm md:text-base text-blanco font-bold bg-turquesa-500 rounded-xl hover:bg-turquesa-fuerte cursor-pointer"
            type="submit"
            value="Registrar"
          />
          <div
            className="ml-3 px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
            onClick={handleCancel}
          >
            Cancelar
          </div>
        </div>
      </form>
    </>
  );
};

export default Formulario;

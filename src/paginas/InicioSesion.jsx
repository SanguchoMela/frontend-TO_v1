import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Header from "../components/Header";
import AuthContext from "../context/AuthProvider";
import Mensaje from "../components/Alertas/Mensaje";
import VerPassword from "../components/Modals/VerPassword";
import axios from "axios";

const InicioSesion = () => {
  const navigate = useNavigate();
  const { auth, setAuth, login, error } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState({});

  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    email: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("contraseña");

    try {
      await login(email, password);
      console.log(response)
      navigate("/dashboard");
    } catch (e) {
      setForm({});
    }
  };

  return (
    <>
      <Header />
      <div className="w-1/2 h-screen flex justify-center items-center">
        <div className="w-full md:w-1/2">
          {error && (
            <Mensaje tipo={mensaje.tipo}>{error}</Mensaje>
          )}
          {/* {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )} */}

          <h1 className="py-4 text-lg text-center font-titulos font-bold">
            Iniciar Sesión
          </h1>
          <div className="px-8 py-7 border border-turquesa-fuerte shadow-md shadow-turquesa-fuerte">
            <p className="pb-4 text-turquesa-fuerte font-semibold">
              Ingresa a tu cuenta
            </p>

            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-semibold">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="py-2 pl-2 block w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                />
              </div>
              <div className="mt-1">
                <label className="text-sm font-semibold">Contraseña</label>
                <div className="flex">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    name="contraseña"
                    value={form.contraseña || ""}
                    onChange={handleChange}
                    className="py-2 pl-2 block w-full border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                  />
                  <div>
                    <VerPassword show={showPass} switchShow={setShowPass} />
                  </div>
                </div>
              </div>
              <div className="pt-6 pb-2 text-right">
                <span className="text-sm text-turquesa-fuerte hover:underline hover:underline-turquesa-fuerte hover:font-semibold">
                  <Link to="/recuperarPass">Olvidé la contraseña</Link>
                </span>
              </div>
              <div>
                <button className="py-2 w-full text-center text-blanco font-bold bg-turquesa-500 rounded-lg hover:bg-turquesa-fuerte">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InicioSesion;

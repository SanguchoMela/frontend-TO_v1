import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logoTO from "../assets/imagenes/logoTO.svg";
import logoPass from "../assets/iconos/cambiar-la-contrasena.png";
import Mensaje from "../components/Alertas/Mensaje";
import axios from "axios";
import VerPassword from "../components/Modals/VerPassword";

const RestablecerPass = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState({});
  const [tokenback, setTokenBack] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [form, setForm] = useState({
    contraseña: "",
    confirmContraseña: "",
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
      const url = `${import.meta.env.VITE_BACKEND_URL}/nueva-password/${token}`;
      // Pasa los datos del formulario al endpoint
      const respuesta = await axios.post(url, form);
      setForm({});
      // Mensaje de confirmación
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
      // Redirige al inicio de sesión
      setTimeout(() => {
        navigate("/inicioSesion");
      }, 3000);
    } catch (error) {
      // Manejo y muestra de errores
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setForm({});
    }
  };

  const verifyToken = async () => {
    try {
      // Endpoint del backend
      const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`;
      const respuesta = await axios.get(url);
      // Configurar el token como correcto
      setTokenBack(true);
      // Mensaje de confirmación
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
    } catch (error) {
      // Manejo y muestra de error
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="h-1/6 p-3 pl-5 pr-5 flex justify-between bg-turquesa-500">
          <ul className="flex items-center text-xl font-titulos font-semibold">
            <li>
              <img src={logoTO} className="w-7 md:w-10"></img>
            </li>
            <li className="px-2 text-sm text-verde-amarillo text-stroke md:text-base">
              Termo
            </li>
            <li className="text-sm text-naranja text-stroke md:text-base">
              Oasis
            </li>
          </ul>
        </nav>
      </header>

      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="w-full md:w-1/2">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}

          <h1 className="py-4 text-lg text-center font-titulos font-bold">
            Restablece tu contraseña
          </h1>

          <div className="px-8 py-7 border border-turquesa-fuerte shadow-md shadow-turquesa-fuerte">
            <div className="pb-2 flex justify-center">
              <img src={logoPass} width={100} />
            </div>
            {tokenback && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-semibold">Contraseña</label>
                  <div className="flex">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Ingresa tu contraseña nueva"
                      value={form.contraseña || ""}
                      name="contraseña"
                      onChange={handleChange}
                      className="py-2 pl-2 block w-full border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                    />
                    <div>
                      <VerPassword show={showPass} switchShow={setShowPass} />
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <label className="text-sm font-semibold">
                    Confirmar contraseña
                  </label>
                  <div className="flex">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="Confirma tu contraseña nueva"
                      value={form.confirmContraseña || ""}
                      name="confirmContraseña"
                      onChange={handleChange}
                      className=" py-2 pl-2 block w-full border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                    />
                    <div>
                      <VerPassword
                        show={showConfirmPass}
                        switchShow={setShowConfirmPass}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="py-2 w-full text-center text-blanco font-bold bg-turquesa-500 rounded-lg hover:bg-turquesa-fuerte">
                    Restablecer contraseña
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestablecerPass;

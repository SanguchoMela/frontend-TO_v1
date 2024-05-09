import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas/Mensaje";
import Header from "../components/Header";

const RecuperarPass = () => {
  const [mensaje, setMensaje] = useState({});
  const [mail, setMail] = useState({});

  const handleChange = (e) => {
    setMail({
      ...mail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`;
      const respuesta = await axios.post(url, mail);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
      setMail("");
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <div className="w-1/2 h-screen flex justify-center items-center">
        <div className="w-full md:w-1/2">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}

          <h1 className="py-4 text-lg text-center font-titulos font-bold">
            Recuperar contraseña
          </h1>
          <div className="px-8 py-7 border border-turquesa-fuerte shadow-md shadow-turquesa-fuerte">
            <p className="pb-4 text-turquesa-fuerte font-medium">
              Ingresa tu correo electrónico para que puedas recuperar tu cuenta
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-semibold">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className=" py-2 pl-2 block w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <button className="py-2 w-full text-center text-blanco font-bold bg-turquesa-500 rounded-lg hover:bg-turquesa-fuerte">
                  Enviar correo electrónico
                </button>
              </div>
              <div className="pt-2 text-right text-sm">
                <span>Ya recordaste? &nbsp;</span>
                <span className="text-turquesa-fuerte hover:underline hover:underline-turquesa-fuerte hover:font-semibold">
                  <Link to="/inicioSesion">Inicia Sesión</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecuperarPass;

import { Link } from "react-router-dom";
import logoTO from "../assets/imagenes/logoTO.svg";
import logoAdvertencia from "../assets/iconos/advertencia.png";

const NoEncontrada = () => {
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
      <div className="w-1/2 h-screen flex justify-center items-center">
        <div className="w-full md:w-1/2 px-8 py-6 border border-turquesa-fuerte shadow-md shadow-turquesa-fuerte">
          <h1 className="text-lg text-center font-titulos font-semibold">
            Página no encontrada
          </h1>
          <div className="py-5 flex justify-center">
            <img src={logoAdvertencia} width={80} />
          </div>
          <p className="text-center text-sm text-turquesa-fuerte font-medium">
            Lo sentimos, la página que estás buscando no pudo ser encontrada
          </p>
          <div className="mt-3 py-2 text-center text-blanco font-bold bg-turquesa-500 rounded-lg hover:bg-turquesa-fuerte">
            <Link to="/">Volver al inicio</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoEncontrada;

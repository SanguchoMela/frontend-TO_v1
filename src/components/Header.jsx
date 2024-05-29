import { Link } from "react-router-dom";
import logoTO from "../assets/imagenes/logoTO.svg";

const Header = () => {
  return (
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
        <ul className="flex items-center text-blanco font-semibold text-xs">
          <li>
            <Link to="/" className="bg-naranja px-5 py-2 rounded-xl md:text-base">
              Inicio
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import logoTO from "../../assets/imagenes/logoTO.svg";

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
            <Link to="/">
              <button className="bg-naranja px-5 py-2 pl-3 rounded-xl md:text-base flex items-center hover:bg-opacity-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                </svg>
                <span className="ml-3">Inicio</span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

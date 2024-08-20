import { useContext } from "react";
import {
  Link,
  Outlet,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import logoTO from "../assets/imagenes/logoTO.svg";
import logoUsuario from "../assets/iconos/usuario.png";
import AuthContext from "../context/AuthProvider";
import MenuDesp from "../components/Modals/MenuDesp";

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;

  const { auth, setAuth, rol } = useContext(AuthContext);
  const autenticado = localStorage.getItem("token");

  const { id } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  // Arreglo de items para el dropdown (menú desplegable)
  const itemsCitas = [
    {
      slug: "/dashboard/agendarCita",
      anchor: "Agendar cita",
    },
    {
      slug: "/dashboard/citas",
      anchor: "Calendario de citas",
    },
  ];
  const itemsPacientesSecre = [
    {
      slug: "/dashboard/registrarPaciente",
      anchor: "Registrar paciente",
    },
    {
      slug: "/dashboard/listaPacientes",
      anchor: "Lista de pacientes",
    },
  ];

  return (
    <div className="md:flex md:min-h-screen">
      <nav className="mb-5 md:mb-0 flex flex-col justify-between md:w-1/5 bg-turquesa-500 md:h-screen">
        <div>
          <div className="mt-2 flex justify-center">
            <div className="w-1/5 my-3 ml-3 p-2 rounded-l-2xl bg-turquesa-100 grid place-content-center">
              <img src={logoUsuario} width={32} />
            </div>
            <div className="w-4/5 my-3 ml-1 mr-3 py-2 px-5 text-center font-bold rounded-r-2xl bg-turquesa-100">
              <p>
                {auth?.nombre} {auth?.apellido}
              </p>
              {rol && <p>{rol}</p>}
            </div>
          </div>
          <div>
            <ul className="text-center mx-3 text-blanco">
              <li className="mt-6 mb-7">
                <Link
                  to="/dashboard"
                  className={`${
                    urlActual === "/dashboard"
                      ? "font-semibold bg-turquesa-fuerte py-3"
                      : "font-medium"
                  } block hover:font-semibold`}
                >
                  Mi Perfil
                </Link>
              </li>
              {rol === "Secretaria" && (
                <>
                  <li className="mb-7">
                    <div
                      className={`${
                        urlActual === "/dashboard/citas" ||
                        urlActual === "/dashboard/agendarCita"
                          ? "py-3 bg-turquesa-fuerte"
                          : ""
                      }`}
                    >
                      <MenuDesp title={"Citas"} items={itemsCitas} />
                    </div>
                  </li>
                  <li>
                    <div
                      className={`${
                        urlActual === "/dashboard/registrarPaciente" ||
                        urlActual === "/dashboard/listaPacientes" ||
                        urlActual === "/dashboard/perfilPaciente"
                          ? "py-3 bg-turquesa-fuerte"
                          : ""
                      }`}
                    >
                      <MenuDesp
                        title={"Pacientes"}
                        items={itemsPacientesSecre}
                      />
                    </div>
                  </li>
                </>
              )}
              {/* Menú solo para doctor */}
              {rol === "Doctor" && (
                <>
                  <li className="py-2">
                    <Link
                      to="/dashboard/citas"
                      className={`${
                        urlActual === "/dashboard/citas"
                          ? "font-semibold bg-turquesa-fuerte py-3"
                          : "font-medium"
                      } block hover:font-semibold`}
                    >
                      Citas
                    </Link>
                  </li>
                  <li className="pt-2 pb-6">
                    <Link
                      to="/dashboard/listaPacientes"
                      className={`${
                        urlActual === "/dashboard/listaPacientes" ||
                        urlActual === `/dashboard/perfilPaciente/${id}`
                          ? "font-semibold bg-turquesa-fuerte py-3"
                          : "font-medium"
                      } block hover:font-semibold`}
                    >
                      Pacientes
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="mx-3 mb-5 flex justify-between md:justify-end">
          <div className="inline-flex items-center md:hidden">
            <img src={logoTO} width={40} height={40} />
            <p className="px-2 text-verde-amarillo text-stroke text-base font-titulos font-bold">
              Termo
            </p>
            <p className="pr-5 text-naranja text-stroke text-base font-titulos font-bold">
              Oasis
            </p>
          </div>
          <div className="m-2">
            <Link to="/" onClick={handleLogout}>
              <button className="px-5 py-2 ml-3 md:text-base text-sm flex items-center md:px-4 text-blanco font-semibold bg-naranja rounded-xl hover:shadow-lg hover:shadow-turquesa-fuerte">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                  />
                </svg>
                <span className="ml-3">Cerrar Sesión</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <section className="flex-1 flex-col justify-between h-screen">
        <header className="m-3 md:flex md:justify-end md:items-center hidden">
          <p className="px-2 text-verde-amarillo text-stroke text-base font-titulos font-bold">
            Termo
          </p>
          <p className="pr-3 text-naranja text-stroke text-base font-titulos font-bold">
            Oasis
          </p>
          <img src={logoTO} width={40} height={40} />
        </header>
        <div className="overflow-y-scroll px-8 h-5/6 flex flex-col justify-center">
          {autenticado ? <Outlet /> : <Navigate to="/inicioSesion" />}
        </div>
        <footer className="md:h-10">
          <p className="text-sm text-center font-medium text-turquesa-fuerte leading-[3.6rem]">
            Todos los derechos reservados
          </p>
        </footer>
      </section>
    </div>
  );
};

export default Dashboard;

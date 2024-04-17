import { useContext } from "react";
import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import logoTO from "../assets/imagenes/logoTO.svg";
import logoUsuario from "../assets/iconos/usuario.png";
import Dropdown from "../components/Modals/Dropdown";
import AuthContext from "../context/AuthProvider";

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;

  const { auth, setAuth } = useContext(AuthContext);
  const autenticado = localStorage.getItem("token");

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
      anchor: "Lista de citas",
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
    {
      slug: "/dashboard/perfilPaciente",
      anchor: "Perfil por paciente",
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
              <p>{auth?.rol}</p>
            </div>
          </div>
          <div>
            <ul className="text-center mx-3 text-blanco">
              <li className="py-2">
                <Link
                  to="/dashboard"
                  className={`${urlActual === "/dashboard" ? "font-semibold bg-turquesa-fuerte py-3" : "font-medium"} block hover:font-semibold`}
                >
                  Perfil
                </Link>
              </li>
              <li className="py-2">
                <div
                  className={`${urlActual === "/dashboard/citas" ? "py-3 bg-turquesa-fuerte font-semibold" : ""}`}
                >
                  <Dropdown dropdownTitle={"Citas"} items={itemsCitas} />
                </div>
              </li>
              <li className="pt-2 pb-6">
                <div
                  className={`${urlActual === "/dashboard/pacientes" ? "py-3 bg-turquesa-fuerte font-semibold" : ""}`}
                >
                  {/* <Link to='/dashboard/pacientes' className={`${urlActual === '/dashboard/opiniones' ? 'font-semibold bg-turquesa-fuerte py-3' : 'font-medium'} block hover:font-semibold`}>Pacientes</Link> */}
                  <Dropdown
                    dropdownTitle={"Pacientes"}
                    items={itemsPacientesSecre}
                  />
                </div>
              </li>
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
            <Link
              to="/"
              className="p-3 ml-3 md:text-base text-center text-sm md:px-4 text-blanco font-semibold bg-naranja rounded-xl hover:shadow-lg hover:shadow-turquesa-fuerte"
              onClick={handleLogout}
            >
              Cerrar Sesión
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

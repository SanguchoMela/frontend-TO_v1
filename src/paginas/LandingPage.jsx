import { Link } from "react-router-dom";
import { useRef } from "react";
import logoTO from "../assets/imagenes/logoTO.svg";
import equipoTO from "../assets/imagenes/equipoTO.png";
import logoFacebook from "../assets/iconos/facebook.png";
import logoInsta from "../assets/iconos/instagram.png";
import logoWhats from "../assets/iconos/whatsapp.png";

const LandingPage = () => {
  const secInicio = useRef();
  const secServicios = useRef();
  const secOpiniones = useRef();
  const secContactos = useRef();

  const irInicio = () => secInicio.current.scrollIntoView();
  const irServicios = () => secServicios.current.scrollIntoView();
  const irOpiniones = () => secOpiniones.current.scrollIntoView();
  const irContactos = () => secContactos.current.scrollIntoView();

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
          <ul className="flex items-center text-blanco font-semibold text-xs">
            <li>
              <Link
                to="/inicioSesion"
                className="bg-naranja px-5 py-2 rounded-xl md:text-sm"
              >
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="bg-blanco">
        {/* Presentacion */}
        <section ref={secInicio} className="h-screen grid place-content-center">
          <div className="text-center">
            <div className="text-5xl text-stroke font-titulos font-bold  flex justify-center md:text-6xl">
              <h2 className="px-2 text-verde-amarillo">Termo</h2>
              <h2 className="px-2 text-naranja">Oasis</h2>
            </div>
            <h3 className="text-2xl text-turquesa-fuerte font-titulos font-semibold pt-4 md:text-3xl">
              Centro de terapias alternativas
            </h3>
          </div>
          <div className="flex items-center mx-20 my-20 md:mx-56">
            <p className="pr-20 text-sm text-turquesa-fuerte md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              numquam nesciunt harum ullam corporis pariatur maxime quibusdam, a
              vitae provident temporibus quam vero consequatur exercitationem
              qui iure nisi tempore quaerat?
            </p>
            <img
              src={equipoTO}
              width={250}
              className="rounded-xl md:w-4/12"
            ></img>
          </div>
        </section>
        {/* Servicios */}
        <section ref={secServicios}>
          <div className="w-80 text-blanco text-lg font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
            <p className="py-3">Servicios</p>
          </div>
          <div className="my-8 flex justify-center flex-col md:flex-row md:my-16">
            <div className="h-60 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 md:h-96">
              <p>Quiropraxia Inka</p>
            </div>
            <div className="h-60 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 md:h-96">
              <p>TK Emocional</p>
            </div>
            <div className="h-60 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 md:h-96">
              <p>Praxis vertebral tibetana</p>
            </div>
          </div>
        </section>
        {/* Opiniones */}
        <section ref={secOpiniones}>
          <div className="w-80 text-blanco text-lg font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
            <p className="py-3">Opiniones</p>
          </div>
          <div className="my-8 flex justify-center flex-wrap md:flex-nowrap md:mx-52">
            <div className="w-1/3 h-60  text-center mx-10 my-6  shadow-inner shadow-turquesa-100">
              <p>Opinion 1</p>
            </div>
            <div className="w-1/3 h-60 text-center mx-10 my-6  shadow-inner shadow-turquesa-100">
              <p>Opinion 2</p>
            </div>
            <div className="w-1/3 h-60 text-center mx-10 my-6  shadow-inner shadow-turquesa-100">
              <p>Opinion 3</p>
            </div>
          </div>
        </section>
        {/* Contactos */}
        <section ref={secContactos}>
          <div className="w-80 text-blanco text-lg font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
            <p className="py-3">Contactos</p>
          </div>
          <div className="my-8 flex justify-center md:mx-52">
            <a href="https://www.facebook.com" target="_blank">
              <div className="w-24 h-24 mx-10 my-6 rounded-full bg-turquesa-500 grid place-items-center">
                <img src={logoFacebook} width={70}></img>
              </div>
            </a>
            <a
              href="https://www.instagram.com/termo_oasis?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            >
              <div className="w-24 h-24 mx-10 my-6 rounded-full bg-turquesa-500 grid place-items-center">
                <img src={logoInsta} width={65}></img>
              </div>
            </a>
            <a href="https://www.whatsapp.com" target="_blank">
              <div className="w-24 h-24 mx-10 my-6 rounded-full bg-turquesa-500 grid place-items-center">
                <img src={logoWhats} width={65}></img>
              </div>
            </a>
          </div>
          <div className="my-32 grid place-content-center">
            Ubicación en el mapa
          </div>
        </section>
        {/* Final */}
        <footer className="bg-turquesa-500 h-52 grid grid-cols-2 place-content-center">
          <div className="mx-7 text-center">
            <p className="text-naranja text-lg font-bold">
              Horarios de Atención
            </p>
            <div className="h-2"></div>
            <div className="mx-16 text-blanco font-medium">
              <p>De lunes a viernes de 10:30am a 17:00pm</p>
              <div className="h-2"></div>
              <p>Sábados de 11:00am a 18:00pm</p>
            </div>
          </div>
          <ul className="text-center text-blanco font-medium">
            <li onClick={irInicio} className="cursor-pointer">
              Inicio
            </li>
            <li onClick={irServicios} className="cursor-pointer">
              Servicios
            </li>
            <li onClick={irOpiniones} className="cursor-pointer">
              Opiniones
            </li>
            <li onClick={irContactos} className="cursor-pointer">
              Contáctanos
            </li>
            <li>
              <Link to="/inicioSesion">Iniciar Sesión</Link>
            </li>
          </ul>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;

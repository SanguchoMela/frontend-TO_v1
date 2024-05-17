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
          <div className="flex items-center m-16 md:m-12 md:mx-56">
            <p className="pr-32 text-sm text-turquesa-fuerte md:text-base leading-5 text-center">
              Somos un Centro Terapeutico con especialidades en:
              <ul className="text-center">
                <li>Quiropraxia Inka</li>
                <li>TK Emocional</li>
                <li>Praxis vertebral Tibetana</li>
              </ul>
              <br />
              Tratamos problemas como:
              <ul>
                <li>Escoliosis</li>
                <li>Saltalgias</li>
                <li>Nervio Ciático</li>
                <li>Estrés</li>
                <li>Crecimiento en adolescentes o niños</li>
              </ul>
              <br />
              Nuestro eslogan principal es: <br />
              <strong className="font-titulos">Manos que curan con Amor</strong>
            </p>
            <img
              src={equipoTO}
              width={250}
              className="rounded-xl md:w-96"
            ></img>
          </div>
        </section>
        {/* Servicios */}
        <section ref={secServicios}>
          <div className="w-80 text-blanco md:text-lg text-base font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
            <p className="py-3">Servicios</p>
          </div>
          <div className="my-8 md:text-base text-sm flex justify-center flex-col md:flex-row md:my-16">
            <div className="flex flex-col justify-center py-6 px-8 h-60 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 md:h-96">
              <p className="font-titulos  font-semibold">Quiropraxia Inka</p>
              {/* <p className="pt-4">
                Tratamiento fundado por el Dr. Ivan Reyna Mercado. Se basa en un
                tratamiento integral no intrusivo de ajustes al sistema
                Oseo-Muscular que permite mejorar radicalmente la calidad de
                vida de las personas.
              </p> */}
              <ul className="md:pt-3 leading-8">
                <li>Hernias de disco cervical y lumbar</li>
                <li>Lumbalgias</li>
                <li>Cervicalgia</li>
                <li>Tendinitis</li>
                <li>Hombro congelado u homalgias</li>
                <li>Pubialgia</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center py-6 px-8 h-60 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 md:h-96 p-6">
              <p className="font-titulos font-semibold">TK Emocional</p>
              <ul className="md:pt-3 leading-8">
                <li>Depresión crónica</li>
                <li>Enfermedades auto inmunes</li>
                <li>Insomnio</li>
                <li>Migraña</li>
                <li>Y más</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center py-6 px-8 h-64 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 md:h-96 p-6">
              <p className="font-titulos font-semibold">
                Praxis vertebral tibetana
              </p>
              {/* <p>
                Método manual aplicado en la columna, basado en una Técnica
                Oriental Tibetana milenaria. Un precursor llamado Yhom Thanm
                Mnegom Po coincidió con la afirmación que luego hiciera
                Hipócrates (padre de la medicina) aseverando que en la columna
                vertebral se encontraba la raíz de casi todas las enfermedades.
                En Argentina el Dr. Pistacchia corroboró la eficacia de dicho
                método, fundando en 2000 el Centro de estudios e investigación
                Praxis Vertebral.
              </p> */}
              <ul className="md:pt-3 leading-8">
                <li>Rectificación cervical</li>
                <li>Estrechamiento de canal lumbar</li>
                <li>Hiperlordosis Cervical</li>
                <li>Hiperlordosis Lumbar</li>
                <li>Desviación de la columna</li>
                <li>Desplazamiento de cadera en niños y adultos</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Opiniones */}
        <section ref={secOpiniones}>
          <div className="w-80 text-blanco md:text-lg text-base font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
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
          <div className="w-80 text-blanco md:text-lg text-base font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
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
            <p className="text-naranja md:text-lg text-base font-bold">
              Horarios de Atención
            </p>
            <div className="h-2"></div>
            <div className="mx-16 text-blanco md:text-base text-sm font-medium">
              <p>De lunes a viernes de 10:30am a 17:00pm</p>
              <div className="h-2"></div>
              <p>Sábados de 11:00am a 18:00pm</p>
            </div>
          </div>
          <ul className="text-center text-blanco leading-7 md:text-base text-sm font-medium">
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

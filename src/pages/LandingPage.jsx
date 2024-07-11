import { Link } from "react-router-dom";
import { useRef } from "react";
import logoTO from "../assets/imagenes/logoTO.svg";
import equipoTO from "../assets/imagenes/equipoTO.png";
import logoFacebook from "../assets/iconos/facebook.png";
import logoInsta from "../assets/iconos/instagram.png";
import logoWhats from "../assets/iconos/whatsapp.png";

const LandingPage = () => {
  const secInicio = useRef();

  const irInicio = () => secInicio.current.scrollIntoView();

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
              <button className="bg-naranja px-5 py-2 pl-3 rounded-xl md:text-base flex items-center overflow-hidden transition-all duration-200 hover:bg-opacity-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
                <span className="ml-3">
                  <Link to="/inicioSesion">Iniciar Sesión</Link>{" "}
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Presentacion */}
        <section
          ref={secInicio}
          className="h-screen grid place-content-center mx-20 md:mx-0"
        >
          <div className="mt-12 md:mt-10 text-center">
            <div className="text-5xl text-stroke font-titulos font-bold flex justify-center md:text-6xl">
              <h2 className="px-2 text-verde-amarillo">Termo</h2>
              <h2 className="px-2 text-naranja">Oasis</h2>
            </div>
            <h3 className="text-2xl text-turquesa-fuerte font-titulos font-semibold pt-4 md:text-3xl">
              Centro de terapias alternativas
            </h3>
          </div>
          <div className="flex flex-row justify-evenly items-center mt-10 gap-16 md:mt-14 md:gap-32">
            <div className="flex flex-col">
              <p className="text-xl text-turquesa-500 font-titulos font-semibold md:text-2xl">
                Manos que curan con amor
              </p>
              <div className="text-sm text-turquesa-500 md:text-base mt-3">
                Somos un Centro Terapeutico que se especializa en:
                <br />
                Quiropraxia Inka, TK Emocional y Praxis vertebral Tibetana,
                <br />
                para tratar problemas como:
                <br />
                escoliosis, saltalgias, nervio ciático, estrés <br />y
                crecimiento en adolescentes y niños.
              </div>
              <div className="my-6 md:text-base text-sm text-turquesa-500">
                <p className="font-semibold">
                  Necesitas tener a mano la información de tus citas?
                </p>
                <p className="">
                  Descarga nuestra aplicación movil y permanece <br /> cerca de
                  nosotros
                </p>
                <button className="mt-2 px-5 py-2 text-center text-blanco font-bold bg-naranja rounded-xl hover:bg-opacity-90 flex items-center md:text-base text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                  <a href="public/apk/apk-termooasis.apk" className="ml-3">Descargar</a>
                </button>
              </div>
            </div>
            <img
              src={equipoTO}
              width={200}
              className="rounded-xl md:w-96"
            ></img>
          </div>
        </section>
        {/* Servicios */}
        <section>
          <div className="w-80 text-blanco md:text-lg text-base font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
            <p className="py-3">Servicios</p>
          </div>
          <div className="my-8 md:text-base text-sm flex justify-center flex-col items-center md:flex-row md:my-16">
            <div className="flex flex-col justify-center py-6 px-8 h-60 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 w-1/2 md:h-96">
              <p className="font-titulos  font-semibold">Quiropraxia Inka</p>
              <ul className="md:pt-3 leading-8">
                <li>Hernias de disco cervical y lumbar</li>
                <li>Lumbalgias</li>
                <li>Cervicalgia</li>
                <li>Tendinitis</li>
                <li>Hombro congelado u homalgias</li>
                <li>Pubialgia</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center py-6 px-8 h-60 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 w-1/2 md:h-96 p-6">
              <p className="font-titulos font-semibold">TK Emocional</p>
              <ul className="md:pt-3 leading-8">
                <li>Depresión crónica</li>
                <li>Enfermedades auto inmunes</li>
                <li>Insomnio</li>
                <li>Migraña</li>
                <li>Y más</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center py-6 px-8 h-64 text-center mx-8 my-6 bg-turquesa-100 md:w-1/5 w-1/2 md:h-96 p-6">
              <p className="font-titulos font-semibold">
                Praxis vertebral tibetana
              </p>
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
        <section>
          <div className="w-80 text-blanco md:text-lg text-base font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
            <p className="py-3">Opiniones</p>
          </div>
          <div className="my-8 md:my-16 md:text-base text-sm flex justify-center flex-wrap md:flex-nowrap md:mx-52">
            <div className="flex flex-col justify-center p-6 w-1/3 h-60  text-center mx-10 my-6  shadow-inner shadow-turquesa-100">
              <p>
                "Agradecemos a los especialistas de Termo Oasis, confiamos en
                sus servicios y agradecemos por la atención brindada a cada uno
                de nuestros jóvenes."
              </p>
              <p className="mt-3 font-semibold text-right leading-5">
                Club de Basketball <br /> Nightmares
              </p>
            </div>
            <div className="flex flex-col justify-center p-6 w-1/3 h-60 text-center mx-10 my-6  shadow-inner shadow-turquesa-100">
              <p>
                "Muy agradecida y bendecida por haberles encontrado a ustedes y
                que me hayan dado la solución para mi hijo después de haber
                pasado momentos muy difíciles."
              </p>
              <p className="mt-3 font-semibold text-right leading-5">
                Madre de <br /> Mayquel Saca
              </p>
            </div>
            <div className="flex flex-col justify-center p-6 w-1/3 h-60 text-center mx-10 my-6  shadow-inner shadow-turquesa-100">
              <p>
                Antes tenía miedo de ir al quiropráctico, pero ahora siento un
                gran alivio y mi salud ha mejorado notablemente. Quiero
                recomendar al doctor [...], ya que su tratamiento es económico y
                100% garantizado.
              </p>
              <p className="mt-3 font-semibold text-right leading-5">
                Genesis Anchundia
              </p>
            </div>
          </div>
        </section>
        {/* Contactos */}
        <section>
          <div className="w-80 text-blanco md:text-lg text-base font-titulos font-semibold bg-turquesa-300 rounded-r-lg flex justify-center">
            <p className="py-3">Contactos</p>
          </div>
          <div className=" my-16 flex justify-center md:mx-52">
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
          {/* <div className="my-32 grid place-content-center">
            Ubicación en el mapa
          </div> */}
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
          <ul className="text-center text-blanco leading-7 md:text-base text-sm font-medium flex flex-col justify-center">
            <li onClick={irInicio} className="cursor-pointer">
              Inicio
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

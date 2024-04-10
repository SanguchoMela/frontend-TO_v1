import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const CardPerfil = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className="relative h-60 my-8">
        <div className="h-full bg-turquesa-100 rounded-xl rounded-tr-3xl">
          <div className="absolute w-48 h-48 -top-8 -right-5 bg-blanco border-2 border-turquesa-300 rounded-full">
            <img src="" alt="" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <p>
              <strong>Nombre:</strong> {auth?.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {auth?.apellido}
            </p>
            <p>
              <strong>CI:</strong>{" "}
            </p>
            <p>
              <strong>Fecha de nacimiento: </strong>{" "}
            </p>
            <p>
              <strong>Correo electrónico:</strong> {auth?.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPerfil;

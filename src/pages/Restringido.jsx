import { TiWarning } from "react-icons/ti";

export const Restringido = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-8 border border-turquesa-fuerte shadow-md shadow-turquesa-fuerte">
        <h1 className="text-lg text-center font-titulos font-semibold">
          Página no permitida
        </h1>
        <div className="py-3 flex justify-center">
          <TiWarning className="text-turquesa-fuerte w-24 h-24" />
        </div>
        <p className="text-center text-sm text-turquesa-fuerte font-medium">
          Lo sentimos, no estás autorizado para acceder a esta página
        </p>
      </div>
    </div>
  );
};

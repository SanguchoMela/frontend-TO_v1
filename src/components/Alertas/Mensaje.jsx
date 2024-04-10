import { TiWarning } from "react-icons/ti";

const Mensaje = ({ children, tipo }) => {
  return (
    <div
      className={`border ${tipo ? "border-turquesa-fuerte" : "border-naranja"} rounded-r-xl flex items-center`}
    >
      <div
        className={`border-r p-5 ${tipo ? "border-turquesa-fuerte" : "border-naranja"}`}
      >
        <TiWarning
          className={`w-8 h-8 ${tipo ? "text-turquesa-fuerte" : "text-naranja"}`}
        />
      </div>
      <div className="mx-3">
        <div
          className={`text-sm font-medium ${tipo ? "text-turquesa-fuerte" : "text-naranja"}`}
        >
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Mensaje;

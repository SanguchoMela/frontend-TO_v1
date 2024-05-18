import { TiWarning } from "react-icons/ti";
import { FaCircleCheck } from "react-icons/fa6";

const Mensaje = ({ children, tipo }) => {
  const getIcon = () => {
    switch (tipo) {
      case true:
        return <FaCircleCheck className={`w-8 h-8 text-turquesa-fuerte`} />;
      default:
        return <TiWarning className={`w-8 h-8 text-naranja`}/>
    }
  }
  return (
    <div
      className={`border ${tipo ? "border-turquesa-fuerte" : "border-naranja"} rounded-r-xl flex items-center`}
    >
      <div className={`border-r p-5 ${tipo ? "border-turquesa-fuerte" : "border-naranja"}`}>
        {getIcon()}
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

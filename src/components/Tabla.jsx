import { useNavigate } from "react-router-dom";
import {
  RiDeleteBin2Fill,
  RiEditFill,
  RiInformationFill,
} from "react-icons/ri";

const Tabla = () => {
  const navigate = useNavigate();

  return (
    <table className="w-full mt-5 table-auto shadow-lg">
      <thead>
        <tr className="font-titulos">
          <th>N°</th>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td>1</td>
          <td>1753650389</td>
          <td>Melany</td>
          <td>Sangucho</td>
          <td className="text-center">
            <RiInformationFill
              className="h-5 w-5 text-turquesa-fuerte inline mr-3 cursor-pointer"
              onClick={() => navigate("/dashboard/perfilPaciente")}
            />
            {/* <RiEditFill className="h-5 w-5 text-turquesa-fuerte inline mr-3"/> */}
            <RiDeleteBin2Fill className="h-5 w-5 text-turquesa-fuerte inline cursor-pointer" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Tabla;

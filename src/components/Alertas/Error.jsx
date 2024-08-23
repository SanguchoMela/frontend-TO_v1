import { TiWarning } from "react-icons/ti";
import { FaCircleCheck } from "react-icons/fa6";

const Error = ({ mensaje }) => {
  return (
    <div className="border border-naranja rounded-r-xl flex items-center">
      <div className="border-r p-3 border-naranja">
        <TiWarning className="w-6 h-6 text-naranja" />
      </div>
      <div className="mx-3">
        <div className="text-sm font-medium text-naranja">
          <p>{mensaje}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;

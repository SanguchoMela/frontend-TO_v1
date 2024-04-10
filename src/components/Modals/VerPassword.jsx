import { BiShow, BiHide } from "react-icons/bi";

const VerPassword = ({ show, switchShow }) => {
  return (
    <div
      onClick={() => {
        switchShow(!show);
      }}
      className="p-3 flex justify-center items-center border-r border-y border-turquesa-fuerte rounded-r-lg"
    >
      {show ? (
        <BiHide className="h-5 w-5 text-turquesa-fuerte" />
      ) : (
        <BiShow className="h-5 w-5 text-turquesa-fuerte" />
      )}
    </div>
  );
};

export default VerPassword;

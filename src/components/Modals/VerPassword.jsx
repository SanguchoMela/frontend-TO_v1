import { BiShow, BiHide } from "react-icons/bi";

const VerPassword = ({ show, switchShow }) => {
  return (
    <div
      onClick={() => {
        switchShow(!show);
      }}
      className="p-2 md:p-3 flex justify-center items-center border-r border-y border-turquesa-fuerte rounded-r-lg cursor-pointer"
    >
      {show ? (
        <BiHide className="h-6 w-6 md:h-5 md:w-5 text-turquesa-fuerte" />
      ) : (
        <BiShow className="h-6 w-6 md:h-5 md:w-5 text-turquesa-fuerte" />
      )}
    </div>
  );
};

export default VerPassword;

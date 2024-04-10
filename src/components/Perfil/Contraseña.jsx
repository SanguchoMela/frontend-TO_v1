import { useState } from "react";
import VerPassword from "../Modals/VerPassword";

const Contraseña = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <>
      <div className="text-center my-3">
        <h1 className="font-titulos font-bold text-lg">Cambiar contraseña</h1>
        <hr className="text-turquesa-fuerte border" />
      </div>
      <form>
        <div>
          <label className="text-sm font-semibold" htmlFor="pass_actual">
            Contraseña actual
          </label>
          <div className="flex">
            <input
              id="pass_actual"
              type={showPass ? "text" : "password"}
              placeholder="Ingresa tu contraseña actual"
              name="pass_actual"
              className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            />
            <div>
              <VerPassword show={showPass} switchShow={setShowPass} />
            </div>
          </div>
        </div>
        <div className="mt-1">
          <label className="text-sm font-semibold" htmlFor="pass_nueva">
            Contraseña nueva
          </label>
          <div className="flex">
            <input
              id="pass_nueva"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Ingresa tu contraseña nueva"
              name="pass_nueva"
              className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-l-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
            />
            <div>
              <VerPassword
                show={showConfirmPass}
                switchShow={setShowConfirmPass}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <input
            className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
            type="submit"
            value="Cambiar"
          />
          <input
            className="ml-3 px-4 py-2 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
            type="submit"
            value="Cancelar"
          />
        </div>
      </form>
    </>
  );
};

export default Contraseña;

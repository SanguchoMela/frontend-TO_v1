import axios from "axios";
import Modal from "react-modal";
import { useEffect, useRef, useState } from "react";
import Mensaje from "../Alertas/Mensaje";

Modal.setAppElement("#root");

const RegMedicoModal = ({ isOpen, onClose, idCita }) => {
  const [regMedico, setRegMedico] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const titulo = useRef(null);
  const [editable, setEditable] = useState(false);
  const [regActualizado, setRegActualizado] = useState({});
  const [idRegMedico, setIdRegMedico] = useState(null);

  const verRegMedico = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/registroMedico/${idCita}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, options);

      setIdRegMedico(response.data.data._id);

      setRegMedico(response.data.data);
      setRegActualizado(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActualizarReg = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/registroMedico/editar/${idRegMedico}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(url, regActualizado, options);

      setRegMedico(response.data.data);
      setMensaje({ tipo: true, respuesta: response.data.msg });
      setEditable(false);

      setTimeout(() => {
        handleCerrar();
      }, 2000);
    } catch (error) {
      setMensaje({
        tipo: false,
        respuesta: "Error al actualizar el registro médico",
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    } finally {
      if (titulo.current) {
        titulo.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("receta_")) {
      const [_, index, field] = name.split("_");
      const nuevaReceta = [...regActualizado.receta];
      nuevaReceta[index][field] = value;
      setRegActualizado({ ...regActualizado, receta: nuevaReceta });
    } else {
      setRegActualizado({
        ...regActualizado,
        [name]: value,
      });
    }
  };

  const handleCerrar = () => {
    onClose();
    setEditable(false);
    setMensaje({});
  };

  const handleCancelarActualizar = () => {
    setEditable(false);
    verRegMedico();
  };

  const handleActualizarClick = (e) => {
    e.preventDefault();
    setEditable(true);
    if (titulo.current) {
      titulo.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      verRegMedico();
    }
  }, [idCita, isOpen]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "8px",
      maxWidth: "80%", // Personaliza el ancho máximo del modal
      maxHeight: "80%", // Personaliza la altura máxima del modal
      width: "auto", // Usa "auto" para ajustar automáticamente el ancho al contenido
      // overflowY: "auto", // Permite el desplazamiento vertical si el contenido es largo
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Registro médico"
      >
        <div ref={titulo} className="flex items-center">
          <h3 className="font-titulos font-bold text-lg text-center flex-1">
            Registro médico
          </h3>
          <button
            className="px-3 py-1 my-1 text-blanco font-semibold bg-naranja rounded-md cursor-pointer"
            onClick={handleCerrar}
          >
            x
          </button>
        </div>
        <hr className="text-turquesa-fuerte border" />
        <div className="mt-5 mx-10">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          {editable ? (
            <p className="py-2 text-turquesa-fuerte font-semibold">
              Modifica los datos que desees
            </p>
          ) : null}
        </div>
        {regMedico && (
          <form className="mx-5">
            {/* Campos simples */}
            <div className="mt-2">
              <label className="text-sm font-semibold" htmlFor="dieta">
                Dieta
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="dieta"
                type="text"
                name="dieta"
                value={regActualizado.dieta}
                onChange={handleInputChange}
                readOnly={!editable}
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="actividad">
                Actividad
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="actividad"
                type="text"
                name="actividad"
                value={regActualizado.actividad}
                onChange={handleInputChange}
                readOnly={!editable}
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="cuidados">
                Cuidados
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="cuidados"
                type="text"
                name="cuidados"
                value={regActualizado.cuidados}
                onChange={handleInputChange}
                readOnly={!editable}
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="comments">
                Comentarios
              </label>
              <textarea
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="comments"
                name="comments"
                value={regActualizado.comments}
                onChange={handleInputChange}
                readOnly={!editable}
              />
            </div>
            {/* Campos que se guardan como objetos */}
            {/* Objeto para información médica */}
            <div className="mt-3 px-5 py-3 border border-turquesa-fuerte shadow-md">
              <div>
                <p className="font-bold">Información médica</p>
                <div>
                  <label
                    className="text-sm font-semibold"
                    htmlFor="informacionMedica-altura"
                  >
                    Altura
                  </label>
                  <input
                    className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                    id="informacionMedica-altura"
                    type="text"
                    name="informacionMedica-altura"
                    value={`${regActualizado.informacionMedica.altura} cm`}
                    onChange={handleInputChange}
                    readOnly={!editable}
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-semibold"
                    htmlFor="informacionMedica-peso"
                  >
                    Peso
                  </label>
                  <input
                    className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                    id="informacionMedica-peso"
                    type="text"
                    name="informacionMedica-peso"
                    value={`${regActualizado.informacionMedica.peso} kg`}
                    onChange={handleInputChange}
                    readOnly={!editable}
                  />
                </div>
              </div>
            </div>
            {/* Campos que se guardan como arreglos */}
            {/* Arreglo para receta */}
            <div className="mt-3 px-5 py-3 border border-turquesa-fuerte shadow-md flex flex-col">
              <p className="font-bold text-center">Receta</p>
              {regMedico.receta &&
                regMedico.receta.map((receta, index) => (
                  <div key={receta._id}>
                    <p className="font-bold">{index + 1}</p>
                    <div>
                      <label
                        className="text-sm font-semibold"
                        htmlFor={`receta-nombre-${index}`}
                      >
                        Nombre
                      </label>
                      <input
                        className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                        id={`receta-nombre-${index}`}
                        type="text"
                        name={`receta-nombre-${index}`}
                        value={regActualizado.receta[index].nombre}
                        onChange={handleInputChange}
                        readOnly={!editable}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-semibold"
                        htmlFor={`receta-dosis-${index}`}
                      >
                        Dosis
                      </label>
                      <input
                        className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                        id={`receta-dosis-${index}`}
                        type="text"
                        name={`receta-dosis-${index}`}
                        value={regActualizado.receta[index].dosis}
                        onChange={handleInputChange}
                        readOnly={!editable}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-semibold"
                        htmlFor={`receta-frecuencia-${index}`}
                      >
                        Frecuencia
                      </label>
                      <input
                        className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                        id={`receta-frecuencia-${index}`}
                        type="text"
                        name={`receta-frecuencia-${index}`}
                        value={regActualizado.receta[index].frecuencia}
                        onChange={handleInputChange}
                        readOnly={!editable}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-5 flex justify-end">
              {editable ? (
                <>
                  <button
                    className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                    onClick={handleActualizarReg}
                  >
                    Guardar cambios
                  </button>
                  <button
                    className="ml-3 px-4 py-2 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
                    onClick={handleCancelarActualizar}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                  onClick={handleActualizarClick}
                >
                  Actualizar registro
                </button>
              )}
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default RegMedicoModal;

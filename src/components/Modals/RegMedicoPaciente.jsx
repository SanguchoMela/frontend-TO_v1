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
      const registroData = response.data.data;

      setIdRegMedico(registroData._id);

      setRegMedico(registroData);
      setRegActualizado(registroData);
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
        setMensaje({});
        verRegMedico();
      }, 2000);
    } catch (error) {
      setMensaje({
        respuesta: "Error al actualizar el registro médico",
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
        onClose()
      }, 3000);
    } finally {
      irTitulo();
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

  const irTitulo = () => {
    if (titulo.current) {
      titulo.current.scrollIntoView({ behavior: "smooth" });
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
    irTitulo();
  };

  const handleActualizarClick = (e) => {
    e.preventDefault();
    setEditable(true);
    irTitulo();
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
        <div className="mt-4 mx-10 text-center">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          {editable ? (
            <p className="text-turquesa-fuerte font-semibold">
              Modifica los datos que desees
            </p>
          ) : null}
        </div>
        {regMedico && (
          <form className="mx-5 mt-2 leading-7">
            {/* Campos simples */}
            <div>
              <label className="text-base" htmlFor="dieta">
                <strong>Dieta: </strong>
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="dieta"
                type="text"
                name="dieta"
                value={regActualizado.dieta}
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>
            <div>
              <label className="text-base" htmlFor="actividad">
                <strong>Actividad:</strong>
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="actividad"
                type="text"
                name="actividad"
                value={regActualizado.actividad}
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>
            <div>
              <label className="text-base" htmlFor="cuidados">
                <strong>Cuidados:</strong>
              </label>
              <input
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="cuidados"
                type="text"
                name="cuidados"
                value={regActualizado.cuidados}
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>
            <div>
              <label className="text-base" htmlFor="comments">
                <strong>Comentarios:</strong>
              </label>
              <textarea
                className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                id="comments"
                name="comments"
                value={regActualizado.comments}
                onChange={handleInputChange}
                disabled={!editable}
              />
            </div>
            {/* Campos que se guardan como objetos */}
            {/* Objeto para información médica */}
            <div className="mt-3 px-5 py-3 border border-turquesa-fuerte shadow-md">
              <div>
                <p className="font-bold text-center">Información médica</p>
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
                    disabled={!editable}
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
                    disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
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
                        disabled={!editable}
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

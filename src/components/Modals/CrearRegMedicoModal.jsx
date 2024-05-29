import axios from "axios";
import Modal from "react-modal";
import { useEffect, useRef, useState } from "react";
import Mensaje from "../Alertas/Mensaje";

Modal.setAppElement("#root");

const CrearRegMedicoModal = ({ isOpen, onClose, datosCita }) => {
  const [mensaje, setMensaje] = useState({});
  const titulo = useRef(null);

  console.log(datosCita);

  const formInicial = {
    idCita: "",
    idPaciente: "",
    idDoctor: "",
    receta: [],
    dieta: "",
    actividad: "",
    cuidados: "",
    informacionMedica: {
      altura: "",
      peso: "",
    },
    comments: "",
  };
  
  const [form, setForm] = useState(formInicial);

  useEffect(() => { 
    if (datosCita) {
      setForm({
        ...form,
        idCita: datosCita._id,
        idPaciente: datosCita.idPaciente,
        idDoctor: datosCita.idDoctor._id,
      });
    }
  }, [datosCita, isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield, index] = name.split("-");
    const formCopy = { ...form };

    if (index !== undefined) {
      const idx = parseInt(index, 10);
      if (field === "receta") {
        formCopy.receta[idx][subfield] = value;
      }
    } else if (field === "informacionMedica") {
      formCopy.informacionMedica[subfield] = value;
    } else {
      formCopy[field] = value;
    }

    setForm(formCopy);
  };

  const addRecetaField = () => {
    setForm({
      ...form,
      receta: [...form.receta, { nombre: "", dosis: "", frecuencia: "" }],
    });
  };

  const eliminarReceta = (index) => {
    const recetasActualizadas = [...form.receta];
    recetasActualizadas.splice(index, 1);
    setForm({
      ...form,
      receta: recetasActualizadas,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/registroMedico/crear`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(url, form, options);

      setMensaje({ respuesta: response.data.msg, tipo: true });
      setTimeout(() => {
        setMensaje({});
        setForm(formInicial);
        onClose()
      }, 2000);
    } catch (error) {
      console.log(error);
      setMensaje({
        respuesta: "Error al crear el registro médico",
        tipo: false,
      });
      setTimeout(() => {
        setMensaje({});
        setForm(formInicial);
      }, 3000);
    } finally {
      if (titulo.current) {
        titulo.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCancelar = () => {
    onClose();
    setForm(formInicial);
  };

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
        contentLabel="Crear registro médico"
      >
        <div>
          <div ref={titulo} className="flex items-center">
            <h3 className="font-titulos font-bold text-lg text-center flex-1">
              Crear registro médico
            </h3>
            <button
              className="px-3 py-1 my-1 text-blanco font-semibold bg-naranja rounded-md cursor-pointer"
              onClick={handleCancelar}
            >
              x
            </button>
          </div>
          <hr className="text-turquesa-fuerte border" />
          <div className="mt-5 mx-10">
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="m-5 p-5 border border-turquesa-fuerte shadow-md">
              {/* Campos que se guardan como arreglos */}
              {/* Arreglo para receta */}
              <div className="mt-3 px-5 py-3 border border-turquesa-fuerte shadow-md flex flex-col">
                <p className="font-bold text-center">Receta</p>
                {form.receta &&
                  form.receta.map((receta, index) => (
                    <div key={index}>
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
                          value={receta.nombre || ""}
                          onChange={handleChange}
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
                          value={receta.dosis || ""}
                          onChange={handleChange}
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
                          value={receta.frecuencia || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="mt-3 px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
                          onClick={() => eliminarReceta(index)}
                        >
                          Eliminar receta
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="mt-4 px-3 py-2 text-sm md:text-base text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                  onClick={addRecetaField}
                >
                  Añadir una receta
                </button>
              </div>
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
                  value={form.dieta || ""}
                  onChange={handleChange}
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
                  value={form.actividad || ""}
                  onChange={handleChange}
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
                  value={form.cuidados || ""}
                  onChange={handleChange}
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
                      value={form.informacionMedica?.altura || ""}
                      onChange={handleChange}
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
                      value={form.informacionMedica?.peso || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold" htmlFor="comments">
                  Comentarios
                </label>
                <input
                  className="p-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
                  id="comments"
                  type="text"
                  name="comments"
                  value={form.comments || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <input
                className="px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                type="submit"
                value="Crear"
              />
              <div
                className="ml-3 px-3 py-2 text-sm md:text-base md:px-4 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
                onClick={handleCancelar}
              >
                Cancelar
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CrearRegMedicoModal;

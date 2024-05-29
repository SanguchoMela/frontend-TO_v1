import axios from "axios";
import Modal from "react-modal";
import { useEffect, useRef, useState } from "react";
import Mensaje from "../Alertas/Mensaje";

Modal.setAppElement("#root");

const RegMedicoModal = ({ isOpen, onClose, idCita }) => {
  const [regMedico, setRegMedico] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const titulo = useRef(null);

  console.log(idCita);

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

      console.log(response);
      setRegMedico(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCerrar = () => {
    onClose();
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
        </div>
        {regMedico && (
          <div className="m-5">
            <div className="px-3 leading-7">
              <p>
                <strong>Dieta: </strong> {regMedico.dieta}
              </p>
              <p>
                <strong>Actividad: </strong> {regMedico.actividad}
              </p>
              <p>
                <strong>Cuidados: </strong> {regMedico.cuidados}
              </p>
              <div className="leading-6">
                <strong>Comentarios: </strong>
                <p>{regMedico.comments}</p>
              </div>
            </div>
            <div className="mt-3 px-5 py-3 border border-turquesa-fuerte shadow-md">
              <strong className="block text-center mb-1">
                Información Médica
              </strong>
              <p>
                <strong>Altura: </strong>
                {regMedico.informacionMedica.altura} cm
              </p>
              <p>
                <strong>Peso: </strong>
                {regMedico.informacionMedica.peso} kg
              </p>
            </div>
            <div className="mt-3 px-5 py-3 border border-turquesa-fuerte shadow-md">
              <strong className="block text-center mb-1">Recetas</strong>
              {regMedico.receta.map((item) => (
                <div key={item._id}>
                  <p>
                    <strong>Nombre:</strong> "{item.nombre}"
                  </p>
                  <p>
                    <strong>Dosis:</strong> {item.dosis}
                  </p>
                  <p>
                    <strong>Frecuencia:</strong> {item.frecuencia}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <button
                className="ml-3 px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
                // onClick={() => {
                //   handleCancelarCita(idCita);
                // }}
              >
                Actualizar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RegMedicoModal;

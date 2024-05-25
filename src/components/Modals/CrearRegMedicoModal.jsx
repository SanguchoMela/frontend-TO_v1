import Modal from "react-modal";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

const CrearRegMedicoModal = ({ isOpen, onClose }) => {

  useEffect(() => {
    if (isOpen) {
      // mostrarCitaId(); 
      console.log("Modal crear registro")
    }
  }, [isOpen]);

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
          <div className="flex items-center">
            <h3 className="font-titulos font-bold text-lg text-center flex-1">
              Crear registro médico
            </h3>
            <button
              className="px-3 py-1 my-1 text-blanco font-semibold bg-naranja rounded-md cursor-pointer"
              onClick={onClose}
            >
              x
            </button>
          </div>
          <hr className="text-turquesa-fuerte border" />
          {/* <div className="mt-5 mx-10">
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
          </div>
          <div className="m-8 p-5 border border-turquesa-fuerte shadow-md">
            <p>
              <strong>ID de la cita:</strong> {`${cita._id}`}
            </p>
            <p>
              <strong>Paciente:</strong>{" "}
              {`${cita.idPaciente.nombre} ${cita.idPaciente.apellido}`}
            </p>
            <p>
              <strong>Inicio:</strong> {moment(cita.start).format("LLLL")}
            </p>
            <p>
              <strong>Fin:</strong> {moment(cita.end).format("LLLL")}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {cita.isCancelado ? "Cancelada" : "Activa"}
            </p>
            <p>
              <strong>Comentarios:</strong> {cita.comentarios}
            </p>
          </div> */}
          <div className="mt-3 flex justify-end">
            <button
              // onClick={handleMostrarModalActualizar}
              className="px-4 py-2 text-blanco font-semibold bg-turquesa-fuerte rounded-xl cursor-pointer"
            >
              Crear registro
            </button>
            <button
              className="ml-3 px-4 py-2 text-blanco font-semibold bg-naranja rounded-xl cursor-pointer"
              // onClick={() => {
              //   handleCancelarCita(idCita);
              // }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CrearRegMedicoModal;

import axios from "axios";
import moment from "moment";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";

Modal.setAppElement("#root");

const ModalCita = ({ isOpen, onClose, idCita }) => {

  const [cita, setCita] = useState(null) 
  const [cancelada, setCancelada] = useState(null)

  const mostrarCitaId = async() => {
      try {
        const token = localStorage.getItem("token")
        const url = `${import.meta.env.VITE_BACKEND_URL}/citas/mostrar/${idCita}`
        const options = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(url, options)
        const citaData = response.data.data

        // console.log(citaData)

        if (citaData.isCancelado) {
          setCancelada(true)
        }
        
        setCita(citaData)

      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        if (isOpen && idCita) {
            mostrarCitaId()
        }
    }, [isOpen, idCita])

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
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
            style={customStyles}
            contentLabel="Detalles de la cita"
        >
        {cita ? (
        <div>
            <div className="flex items-center">
                <h3 className="font-titulos font-bold text-lg text-center flex-1">Detalles de la cita</h3>
                <button className="px-3 py-1 my-1 text-blanco font-semibold bg-naranja rounded-md cursor-pointer" onClick={onClose}>x</button>
            </div>
            <hr className="text-turquesa-fuerte border" />
            <div className="m-8 p-5 border border-turquesa-fuerte shadow-md">
                <p><strong>Paciente:</strong> {`${cita.idPaciente.nombre} ${cita.idPaciente.apellido}`}</p>
                <p><strong>Inicio:</strong> {moment(cita.start).format('LLLL')}</p>
                <p><strong>Fin:</strong> {moment(cita.end).format('LLLL')}</p>
                <p><strong>Estado:</strong> {cancelada ? "Cancelada":"Activa"}</p>
                <p><strong>Comentarios:</strong> {cita.comentarios}</p>
            </div>
        </div>
        ) : (
            <p>Cargando detalles de la cita...</p>
        )}
        </Modal>
    )
}

export default ModalCita
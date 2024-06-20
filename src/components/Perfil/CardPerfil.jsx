const CardPerfil = ({
  nombre,
  apellido,
  cedula,
  fechaNacimiento,
  lugarNacimiento,
  estadoCivil,
  direccion,
  telefono,
  email,
}) => {
  return (
    <>
      <div className="relative h-72 my-8">
        <div className="h-full bg-turquesa-100 rounded-xl">
          {/* <div className="absolute w-48 h-48 -top-8 -right-5 bg-blanco border-2 border-turquesa-300 rounded-full">
            <img src="" alt="" />
          </div> */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 leading-7">
            <p>
              <strong>Nombre: </strong>{nombre} {apellido}
            </p>
            <p>
              <strong>CI: </strong> 
              {cedula}
            </p>
            <p>
              <strong>Fecha de nacimiento: </strong>
              {fechaNacimiento}
            </p>
            <p>
              <strong>Lugar de nacimiento: </strong>
              {lugarNacimiento}
            </p>
            <p>
              <strong>Estado civil: </strong>
              {estadoCivil}
            </p>
            <p>
              <strong>Dirección: </strong>
              {direccion}
            </p>
            <p>
              <strong>Teléfono: </strong>
              {telefono}
            </p>
            <p>
              <strong>Correo electrónico:</strong> {email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPerfil;

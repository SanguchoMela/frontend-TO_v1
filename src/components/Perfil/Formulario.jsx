const Formulario = () => {
  return (
    <form>
      <div>
        <label className="text-sm font-semibold" htmlFor="nombre">
          Nombre
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="nombre"
          type="text"
          placeholder="Ingresa tu nombre"
          name="nombre"
        />
      </div>
      <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="apellido">
          Apellido
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="apellido"
          type="text"
          placeholder="Ingresa tu apellido"
          name="apellido"
        />
      </div>
      <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="ci">
          CI
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="ci"
          type="text"
          placeholder="Ingresa tu número de cédula"
          name="ci"
        />
      </div>
      <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="fecha_nacimiento">
          Fecha de nacimiento
        </label>
        <input
          className="py-2 px-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="fecha_nacimiento"
          type="date"
          name="fecha_nacimiento"
        />
      </div>
      <div className="mt-1">
        <label className="text-sm font-semibold" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="py-2 pl-2 w-full border border-turquesa-fuerte rounded-lg focus:outline-none focus:ring-1 focus:ring-turquesa-100"
          id="email"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          name="email"
        />
      </div>
      {/* <input type="submit" className="my-3 px-5 py-3 text-blanco font-bold bg-turquesa rounded-xl"/> */}
    </form>
  );
};

export default Formulario;

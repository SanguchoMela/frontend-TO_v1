const TitulosOutlet = ({ titulo }) => {
  return (
    <div className="text-center mb-4">
      <h1 className="font-titulos font-extrabold text-2xl">{titulo}</h1>
      <hr className="text-turquesa-fuerte border-2" />
    </div>
  );
};

export default TitulosOutlet;

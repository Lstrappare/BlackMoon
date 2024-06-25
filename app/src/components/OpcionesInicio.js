import { Link } from "react-router-dom";

export const OpcionesInicio = (props) => {
  return (
    <div>
      <Link to={props.ruta} className={`flex flex-col justify-center items-center rounded-xl 
      hover:scale-105 ease-in-out duration-300 h-52 ${props.colorTexto} ${props.background}`}>
        <div className="p-20 text-center">
          <img src={props.imagen} alt={props.descripcionImagen} />
          <h2 className="text-2xl">{props.opcion}</h2>
        </div>
      </Link>
    </div>
  );
};
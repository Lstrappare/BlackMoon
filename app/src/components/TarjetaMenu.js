export const TarjetaMenu = (props) => {
  return(
    <div className='bg-orange-200 rounded-xl text-lg grid  gap-y-12'>
      <header className='bg-orange-400 m-3 py-4  rounded-2xl text-xl text-center'>
        <h2>{props.tipoAlimento}</h2>
      </header>
      <div className='grid grid-cols-3 gap-2 '>
        <div className='bg-orange-400 rounded-full text-center flex items-center justify-center'>
          <img className='text-center' src={props.imagenAlimentoUno} alt={`${props.descripcionImagenUno}`} />
        </div>
        <h3 className='flex items-center justify-between'>{props.alimentoUno}</h3>
      </div>
      <div className='grid grid-cols-3 gap-2 mb-12'>
        <h3 className='col-start-2 flex items-center justify-end'>{props.alimentoDos}</h3>
        <div className='bg-orange-400 rounded-full flex items-center justify-center'>
          <img className="rounded-full text-center" src={props.imagenAlimentoDos} alt={`${props.descripcionImagenDos}`} />
        </div>
      </div>
    </div>
  );
}
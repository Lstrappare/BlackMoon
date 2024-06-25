import { OpcionesInicio } from '../components/OpcionesInicio'
import { Header } from '../components/Header'

export const InicioRegistrado = () => {
  const opciones = [
    {
      ruta: '/domicilio',
      opcion: 'Ordenar a domicilio',
      colorTexto: 'text-white',
      imagen: '', 
      descripcionImagen: 'Ordenar',
      background: 'bg-purple-400'
    },
    {
      ruta: '/menu',
      opcion: 'Menú',
      imagen: '', 
      descripcionImagen: 'Menú',
      background: 'bg-indigo-200'
    },
    {
      ruta: '/promociones',
      opcion: 'Promociones',
      colorTexto: 'text-white',
      imagen: '', 
      descripcionImagen: 'Promociones',
      background: 'bg-purple-400'
    },
    {
      ruta: '/sucursales',
      opcion: 'Sucursales',
      imagen: '', 
      descripcionImagen: 'Sucursales',
      background: 'bg-orange-200'
    },
    {
      ruta: '/blackmoon',
      opcion: '¿Qué es BlackMoon?',
      colorTexto: 'text-white',
      imagen: '', 
      descripcionImagen: 'BlackMoon',
      background: 'bg-yellow-500'
    },
    {
      ruta: '/terminos',
      opcion: 'Términos y Condiciones',
      imagen: '',
      descripcionImagen: 'Términos y Condiciones',
      background: 'bg-indigo-200'
    }
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <Header tituloPagina='¡Bienvenidos a BlackMoon!' />
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 gap-5 p-10 w-full md:grid-cols-3">
          {opciones.map((opcion, index) => (
            <OpcionesInicio
              key={index}
              ruta={opcion.ruta}
              opcion={opcion.opcion}
              colorTexto={opcion.colorTexto}
              imagen={opcion.imagen}
              descripcionImagen={opcion.descripcionImagen}
              background={opcion.background}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

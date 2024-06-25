import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';
import { Menu } from './Menu'

export const OrdenDomicilio = () => {
  const [direccion, setDireccion] = useState({
    estado: 'Ciudad de México',
    delegacion: '',
    calle: '',
    numeroCalle: '',
    codigoPostal: '',
    palabraSecreta: ''
  });
  const [menu, setMenu] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [sucursalesAbiertas, setSucursalesAbiertas] = useState(true); // Agregamos estado para verificar si las sucursales están abiertas
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarMenu = async () => {
      try {
        const response = await axios.get('http://localhost:3001/alimentos');
        setMenu(response.data);
      } catch (error) {
        setError('Error al cargar el menú');
      }
    };

    cargarMenu();
  }, []);

  useEffect(() => {
    const verificarSucursalesAbiertas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sucursales');
        setSucursalesAbiertas(response.data.length > 0); // Verificamos si hay al menos una sucursal abierta
      } catch (error) {
        setError('Error al verificar las sucursales');
      }
    };

    verificarSucursalesAbiertas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDireccion({
      ...direccion,
      [name]: value
    });
  };

  const handlePedido = (alimento) => {
    if (pedidos.length < 5) {
      setPedidos([...pedidos, alimento]);
    } else {
      setError('Solo puedes agregar hasta 5 alimentos');
    }
  };

  const handleEliminarPedido = (index) => {
    setPedidos(pedidos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (direccion.estado !== 'Ciudad de México') {
      setMensaje('Lo sentimos, solo entregamos en la Ciudad de México');
      return;
    }

    if (!sucursalesAbiertas) {
      setMensaje('Lo sentimos, todas las sucursales están cerradas en este momento');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/ordenar', {
        direccion,
        pedidos,
        sucursalesAbiertas // Pasamos el estado de las sucursales abiertas al backend
      });
      setMensaje('Orden realizada con éxito, tú pedido va en camino...');
    } catch (error) {
      setError('Error al realizar la orden');
    }
  };

  return (
    <div>
      <Header tituloPagina="Orden a Domicilio" />
      <div className="container mx-auto">
        <div className="flex">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md my-4 w-8/12 bg-white">
            <h2 className="text-xl font-bold mb-4">Dirección de Entrega</h2>
            <label className="block mb-2">
              Delegación:
              <input
                type="text"
                name="delegacion"
                value={direccion.delegacion}
                onChange={handleInputChange}
                className="block w-full p-2 border rounded"
                required
              />
            </label>
            <label className="block mb-2">
              Calle:
              <input
                type="text"
                name="calle"
                value={direccion.calle}
                onChange={handleInputChange}
                className="block w-full p-2 border rounded"
                required
              />
            </label>
            <label className="block mb-2">
              Número de Calle:
              <input
                type="text"
                name="numeroCalle"
                value={direccion.numeroCalle}
                onChange={handleInputChange}
                className="block w-full p-2 border rounded"
                required
              />
            </label>
            <label className="block mb-2">
              Código Postal:
              <input
                type="text"
                name="codigoPostal"
                value={direccion.codigoPostal}
                onChange={handleInputChange}
                className="block w-full p-2 border rounded"
                required
              />
            </label>
            <label className="block mb-2">
              Palabra Secreta para recibir la orden:
              <input
                type="text"
                name="palabraSecreta"
                value={direccion.palabraSecreta}
                onChange={handleInputChange}
                className="block w-full p-2 border rounded"
                required
              />
            </label>
            <div className="flex justify-between items-center">
              <input type="submit" value="Realizar Orden" className="bg-blue-500 text-white p-2 rounded mt-4 cursor-pointer" />
              {mensaje && <p className="text-green-500 text-xl">{mensaje}</p>}
              {error && <p className="text-red-500 text-xl">{error}</p>}
            </div>
          </form>

          <div className="text-center w-4/12 bg-white rounded-lg m-10 sticky top-0 shadow-2xl h-96 overflow-auto">
            <h2 className="text-xl font-bold mt-8">Tu Pedido</h2>
            <ul>
              {pedidos.map((pedido, index) => (
                <li key={index} className="flex justify-between items-center m-14">
                  -- {pedido.nombreAlimento} --
                  <button
                    onClick={() => handleEliminarPedido(index)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <p>**Recuerda tener preparado tu efectivo**</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-white text-5xl text-center rounded-xl bg-purple-500 py-5">Menú</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {menu.map((alimento) => (
            <div key={alimento.alimento_id} className="p-4 rounded shadow-lg text-white bg-purple-800">
              <h3 className="text-lg font-bold">{alimento.nombreAlimento}</h3>
              <p>{`$${alimento.precio}`}</p>
              <button
                onClick={() => handlePedido(alimento)}
                className="bg-green-500 text-white p-2 rounded mt-4"
              >
                Agregar al pedido
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';

export const Promociones = () => {
  const [promociones, setPromociones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPromociones = async () => {
      try {
        const response = await axios.get('http://localhost:3001/promociones');
        setPromociones(response.data);
      } catch (error) {
        setError('Error al cargar las promociones');
      }
    };

    cargarPromociones();
  }, []);

  return (
    <div>
      <Header tituloPagina="Promociones" />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Promociones Disponibles</h2>
        {error && <p className="text-red-500 text-xl text-center">{error}</p>}
        <div className="grid md:grid-cols-3 gap-6">
          {promociones.map((promocion) => (
            <div key={promocion.promocion_id} className="border p-4 rounded shadow-lg bg-white">
              <img src={promocion.imagen} alt={promocion.titulo} className="mb-4 rounded w-full h-48 object-cover" />
              <h3 className="text-lg font-bold">{promocion.titulo}</h3>
              <p className="mt-2">{promocion.descripcion}</p>
              <p className="mt-4 text-sm text-gray-600">{`Válido desde: ${new Date(promocion.fecha_inicio).toLocaleDateString()} hasta ${new Date(promocion.fecha_fin).toLocaleDateString()}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';

export const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sucursales');
        setSucursales(response.data);
      } catch (error) {
        console.error('Error al obtener las sucursales:', error);
      }
    };

    fetchData();
  }, []);

  const aperturaOCierreAutomatico = (sucursal) => {
    const horaActual = new Date().getHours();
    const minutosActuales = new Date().getMinutes();

    if (
      (horaActual > sucursal.horaApertura || (horaActual === sucursal.horaApertura && minutosActuales >= sucursal.minutoApertura)) &&
      (horaActual < sucursal.horaCierre || (horaActual === sucursal.horaCierre && minutosActuales < sucursal.minutoCierre))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="">
      <Header tituloPagina="Sucursales" />
      <div className="grid grid-cols-3 gap-6 mt-6 container mx-auto py-8">
        {sucursales.map((sucursal) => (
          <div key={sucursal.sucursal_id} className={`border p-4 rounded shadow-lg ${aperturaOCierreAutomatico(sucursal) ? 'bg-green-200' : 'bg-red-300'}`}>
            <h2 className="text-lg font-bold mb-2">{sucursal.nombreSucursal}</h2>
            <p className="mb-1">Estado: {sucursal.estado}</p>
            <p className="mb-1">Dirección: {sucursal.calle}, {sucursal.numeroCalle}</p>
            <p className="mb-1">Código Postal: {sucursal.codigoPostal}</p>
            <p className="mb-1">Delegación: {sucursal.delegacion}</p>
            <p className="mb-1">Hora de Apertura: {sucursal.horaApertura}:{sucursal.minutoApertura}</p>
            <p className="mb-1">Hora de Cierre: {sucursal.horaCierre}:{sucursal.minutoCierre}</p>
            <p>Abierto: {aperturaOCierreAutomatico(sucursal) ? 'Sí' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

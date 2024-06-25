import React, { useState, useEffect } from "react";
import { TarjetaMenu } from "../components/TarjetaMenu";
import { Header } from "../components/Header";

export const Menu = () => {
  
  const [alimentos, setAlimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarAlimentos = async () => {
      try {
        const response = await fetch("http://localhost:3001/alimentos");
        if (!response.ok) {
          throw new Error('Error al cargar los alimentos');
        }
        const data = await response.json();
        setAlimentos(data);
      } catch (error) {
        console.error("Error al cargar los alimentos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarAlimentos();
  }, []);

  // Filtrar alimentos por sección de menú
  const bebidasCalientes = alimentos.filter(alimento => alimento.seccionMenu === 'Bebidas Calientes');
  const bebidasFrias = alimentos.filter(alimento => alimento.seccionMenu === 'Bebidas Frias');
  const complementos = alimentos.filter(alimento => alimento.seccionMenu === 'Complementos');
  const momentoDulce = alimentos.filter(alimento => alimento.seccionMenu === 'Momento Dulce');

  return (
    <div>
      <Header tituloPagina="¡Buen Provecho!" />
      <div className="grid md:grid-cols-3 m-10 gap-6">
        <TarjetaMenu
          tipoAlimento="Bebidas"
          alimentoUno="Bebidas Calientes"
          imagenAlimentoUno=""
          descripcionImagenUno="Bebida Caliente"
          alimentoDos="Bebidas Frias"
          imagenAlimentoDos=""
          descripcionImagenDos="Bebida fria"
          alimentosUno={bebidasCalientes}
          alimentosDos={bebidasFrias}
        />

        <TarjetaMenu
          tipoAlimento="Complementos"
          alimentoUno="Sandwich"
          imagenAlimentoUno=""
          descripcionImagenUno="Sandwich"
          alimentoDos="Baguette"
          imagenAlimentoDos=""
          descripcionImagenDos="Baguette"
          alimentosUno={complementos}
          alimentosDos={momentoDulce}
        />

        <TarjetaMenu
          tipoAlimento="Momento Dulce"
          alimentoUno="Pasteles"
          imagenAlimentoUno=""
          descripcionImagenUno="Pastel"
          alimentoDos="Muffin"
          imagenAlimentoDos=""
          descripcionImagenDos="Muffin"
          alimentosUno={momentoDulce}
          alimentosDos={bebidasCalientes}
        />
      </div>
      <div className="grid md:grid-cols-3 m-10 gap-6">
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Bebidas Calientes</h2>
            <ul className="divide-y divide-gray-300">
              {bebidasCalientes.map(alimento => (
                <li key={alimento.alimento_id} className="py-2">
                  <span className="font-semibold">{alimento.nombreAlimento}</span>
                  <span className="ml-2">{`$${alimento.precio}`}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 mt-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Bebidas Frías</h2>
            <ul className="divide-y divide-gray-300">
              {bebidasFrias.map(alimento => (
                <li key={alimento.alimento_id} className="py-2">
                  <span className="font-semibold">{alimento.nombreAlimento}</span>
                  <span className="ml-2">{`$${alimento.precio}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Complementos</h2>
            <ul className="divide-y divide-gray-300">
              {complementos.map(alimento => (
                <li key={alimento.alimento_id} className="py-2">
                  <span className="font-semibold">{alimento.nombreAlimento}</span>
                  <span className="ml-2">{`$${alimento.precio}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Momento Dulce</h2>
            <ul className="divide-y divide-gray-300">
              {momentoDulce.map(alimento => (
                <li key={alimento.alimento_id} className="py-2">
                  <span className="font-semibold">{alimento.nombreAlimento}</span>
                  <span className="ml-2">{`$${alimento.precio}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

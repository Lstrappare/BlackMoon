import React from 'react';

export const NavBar = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <nav className="flex-grow p-4">
        <ul>
          <li className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={() => setActiveTab('home')}>Inicio</li>
          <li className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={() => setActiveTab('sucursales')}>Sucursales</li>
          <li className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={() => setActiveTab('alimentos')}>Alimentos</li>
          <li className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={() => setActiveTab('empleados')}>Empleados</li>
          <li className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={() => setActiveTab('clientes')}>Clientes</li>
          <li className="cursor-pointer py-2 px-4 hover:bg-gray-700" onClick={() => setActiveTab('promociones')}>Promociones</li>
        </ul>
      </nav>
    </div>
  );
};


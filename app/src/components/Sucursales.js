import React, { useState, useEffect } from "react";
import { Header } from "../Layout/Header";
import { NavBar } from "./Navbar";

export const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSucursal, setNewSucursal] = useState({
    nombreSucursal: "",
    saldoSucursal: "",
    estado: "",
    calle: "",
    numeroCalle: "",
    codigoPostal: "",
    delegacion: "",
    horaApertura: "",
    minutoApertura: "",
    horaCierre: "",
    minutoCierre: "",
    blackmoon_id: "",
    administrador_id: "",
    abierto: false,
  });
  
  useEffect(() => {
    const cargarSucursales = async () => {
      try {
        const response = await fetch("http://localhost:3001/sucursales");
        if (!response.ok) {
          throw new Error('Error al cargar las sucursales');
        }
        const data = await response.json();
        setSucursales(data);
      } catch (error) {
        console.error("Error al cargar las sucursales:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarSucursales();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSucursal({
      ...newSucursal,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddSucursal = async () => {
    try {
      const response = await fetch("http://localhost:3001/sucursales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSucursal),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar la sucursal: ${errorText}`);
      }

      const addedSucursal = await response.json();
      setSucursales([...sucursales, addedSucursal]);
      setShowModal(false);
      setNewSucursal({
        nombreSucursal: "",
        saldoSucursal: "",
        estado: "",
        calle: "",
        numeroCalle: "",
        codigoPostal: "",
        delegacion: "",
        horaApertura: "",
        minutoApertura: "",
        horaCierre: "",
        minutoCierre: "",
        blackmoon_id: "",
        administrador_id: "",
        abierto: false,
      });
    } catch (error) {
      console.error("Error al agregar la sucursal:", error);
      alert(`Error al agregar la sucursal: ${error.message}`);
    }
  };

  const handleDeleteSucursal = async (sucursalId) => {
    try {
      const response = await fetch(`http://localhost:3001/sucursales/${sucursalId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar la sucursal: ${errorText}`);
      }

      // Actualiza la lista de sucursales eliminando la sucursal eliminada
      const updatedSucursales = sucursales.filter(sucursal => sucursal.sucursal_id !== sucursalId);
      setSucursales(updatedSucursales);
    } catch (error) {
      console.error("Error al eliminar la sucursal:", error);
      alert(`Error al eliminar la sucursal: ${error.message}`);
    }
  };

  const handleEditSucursal = (sucursal) => {
    setEditingSucursal(sucursal);
    setShowModal(true);
    setNewSucursal(sucursal);
  };

  const handleUpdateSucursal = async () => {
    try {
      const response = await fetch(`http://localhost:3001/sucursales/${editingSucursal.sucursal_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSucursal),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al modificar la sucursal: ${errorText}`);
      }
  
      const data = await response.json();  // Asegurarse de que la respuesta sea JSON
      const updatedSucursales = sucursales.map(sucursal =>
        sucursal.sucursal_id === editingSucursal.sucursal_id ? data : sucursal
      );
      setSucursales(updatedSucursales);
      setShowModal(false);
      setEditingSucursal(null);
      setNewSucursal({
        nombreSucursal: "",
        saldoSucursal: "",
        estado: "",
        calle: "",
        numeroCalle: "",
        codigoPostal: "",
        delegacion: "",
        horaApertura: "",
        minutoApertura: "",
        horaCierre: "",
        minutoCierre: "",
        blackmoon_id: "",
        administrador_id: "",
        abierto: false
      });
  
      // Recargar la página después de modificar la sucursal
      window.location.reload();
    } catch (error) {
      console.error("Error al modificar la sucursal:", error);
      alert(`Error al modificar la sucursal: ${error.message}`);
    }
  };
  
  
  const handleModalClose = () => {
    setShowModal(false);
    setEditingSucursal(null);
    setNewSucursal({
      nombreSucursal: "",
      saldoSucursal: "",
      estado: "",
      calle: "",
      numeroCalle: "",
      codigoPostal: "",
      delegacion: "",
      horaApertura: "",
      minutoApertura: "",
      horaCierre: "",
      minutoCierre: "",
      blackmoon_id: "",
      administrador_id: "",
      abierto: false,
    });
  };

  return (
    <div className="min-h-screen">
      <Header tituloPagina="BlackMoonAdmin" />
      
      <main className="flex justify-center">
      <NavBar />
        <div className="w-full p-6 ml-4">
          <h1 className="text-2xl font-semibold mb-4 text-white">Información de las Sucursales</h1>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setShowModal(true)}
          >
            Agregar Sucursal
          </button>
          <div className="flex items-center justify-center">
          {loading ? (
            <p className="text-center mt-4">Cargando información de las sucursales...</p>
          ) : error ? (
            <p className="text-center mt-4 text-red-500">{error}</p>
          ) : (
            
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Saldo</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Dirección</th>
                  <th className="px-4 py-2">Hora de Apertura</th>
                  <th className="px-4 py-2">Hora de Cierre</th>
                  <th className="px-4 py-2">Abierto</th>
                  <th className="px-4 py-2">BlackMoon ID</th>
                  <th className="px-4 py-2">ID del Administrador</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sucursales.map(sucursal => (
                  <tr key={sucursal.sucursal_id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{sucursal.sucursal_id}</td>
                    <td className="px-4 py-2">{sucursal.nombreSucursal}</td>
                    <td className="px-4 py-2">{sucursal.saldoSucursal}</td>
                    <td className="px-4 py-2">{sucursal.estado}</td>
                    <td className="px-4 py-2">{`${sucursal.calle}, ${sucursal.numeroCalle}, ${sucursal.codigoPostal}, ${sucursal.delegacion}`}</td>
                    <td className="px-4 py-2">{`${sucursal.horaApertura}:${sucursal.minutoApertura}`}</td>
                    <td className="px-4 py-2">{`${sucursal.horaCierre}:${sucursal.minutoCierre}`}</td>
                    <td className="px-4 py-2">{sucursal.abierto ? 'Sí' : 'No'}</td>
                    <td className="px-4 py-2">{sucursal.blackmoon_id}</td>
                    <td className="px-4 py-2">{sucursal.administrador_id}</td>
                    <td className="px-4 py-2">
                      <div className="flex">
                        <button onClick={() => handleEditSucursal(sucursal)} className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                          Modificar
                        </button>
                        <button onClick={() => handleDeleteSucursal(sucursal.sucursal_id)} className="px-2 py-1 bg-red-500 text-white rounded">
                          Eliminar
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">{editingSucursal ? 'Modificar Sucursal' : 'Agregar Nueva Sucursal'}</h2>
            <form className="grid grid-cols-3 gap-5">
              {Object.keys(newSucursal).map((key) => (
                <div key={key} className="mb-2">
                  <label className="block mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
                  {key === 'abierto' ? (
                    <input
                      type="checkbox"
                      name={key}
                      checked={newSucursal[key]}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={newSucursal[key]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                  onClick={handleModalClose}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={editingSucursal ? handleUpdateSucursal : handleAddSucursal}
                >
                  {editingSucursal ? 'Modificar' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

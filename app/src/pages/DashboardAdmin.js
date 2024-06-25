import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from '../components/Navbar';
import { Header } from '../components/Header';

export const DashboardAdmin = () => {
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [sucursales, setSucursales] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/blackmoon');
        if (response.data && response.data.saldoTotal !== undefined) {
          setSaldoTotal(response.data.saldoTotal);
        } else {
          console.error('El campo saldoTotal no está definido en la respuesta');
        }
      } catch (error) {
        console.error('Error al obtener los datos de BlackMoon:', error);
      }
    };

    fetchData();
  }, []);

  const fetchSucursales = async () => {
    try {
      const response = await axios.get('http://localhost:3001/sucursales');
      setSucursales(response.data);
    } catch (error) {
      console.error('Error al obtener las sucursales:', error);
    }
  };

  const fetchAlimentos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/alimentos');
      setAlimentos(response.data);
    } catch (error) {
      console.error('Error al obtener los alimentos:', error);
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:3001/empleados');
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener los empleados:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const fetchPromociones = async () => {
    try {
      const response = await axios.get('http://localhost:3001/promociones');
      setPromociones(response.data);
    } catch (error) {
      console.error('Error al obtener las promociones:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'sucursales') fetchSucursales();
    if (activeTab === 'alimentos') fetchAlimentos();
    if (activeTab === 'empleados') fetchEmpleados();
    if (activeTab === 'clientes') fetchClientes();
    if (activeTab === 'promociones') fetchPromociones();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">BlackMoon</h2>
            <div className="bg-white p-6 rounded-lg shadow text-black">
              <p className="text-lg font-semibold">Saldo Total:</p>
              {saldoTotal !== undefined ? (
                <p className="text-2xl text-green-500">${saldoTotal.toFixed(2)}</p>
              ) : (
                <p className="text-red-500">Saldo total no disponible</p>
              )}
            </div>
          </div>
        );

      case 'sucursales':
        return (
          <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold mb-4">Sucursales</h2>
            <div className="shadow-2xl bg-white rounded-lg overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Nombre</th>
                    <th className="py-3 px-6 text-left">Estado</th>
                    <th className="py-3 px-6 text-left">Dirección</th>
                    <th className="py-3 px-6 text-left">Código Postal</th>
                    <th className="py-3 px-6 text-left">Delegación</th>
                    <th className="py-3 px-6 text-left">Hora de Apertura</th>
                    <th className="py-3 px-6 text-left">Hora de Cierre</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {sucursales.map(sucursal => (
                    <tr key={sucursal.sucursal_id} className="hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{sucursal.sucursal_id}</td>
                      <td className="py-3 px-6 text-left">{sucursal.nombreSucursal}</td>
                      <td className="py-3 px-6 text-left">{sucursal.estado}</td>
                      <td className="py-3 px-6 text-left">{`${sucursal.calle} ${sucursal.numeroCalle}, ${sucursal.delegacion}`}</td>
                      <td className="py-3 px-6 text-left">{sucursal.codigoPostal}</td>
                      <td className="py-3 px-6 text-left">{sucursal.delegacion}</td>
                      <td className="py-3 px-6 text-left">{`${sucursal.horaApertura}:${sucursal.minutoApertura}`}</td>
                      <td className="py-3 px-6 text-left">{`${sucursal.horaCierre}:${sucursal.minutoCierre}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'alimentos':
        return (
          <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold mb-4">Alimentos</h2>
            <div className="shadow-xl bg-white rounded-lg overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Nombre</th>
                    <th className="py-3 px-6 text-left">Precio</th>
                    <th className="py-3 px-6 text-left">Sección de Menú</th>
                    <th className="py-3 px-6 text-left">URL de Imagen</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {alimentos.map(alimento => (
                    <tr key={alimento.alimento_id} className="hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{alimento.alimento_id}</td>
                      <td className="py-3 px-6 text-left">{alimento.nombreAlimento}</td>
                      <td className="py-3 px-6 text-left">{alimento.precio}</td>
                      <td className="py-3 px-6 text-left">{alimento.seccionMenu}</td>
                      <td className="py-3 px-6 text-left">{alimento.imagenUrl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'empleados':
        return (
          <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold mb-4">Empleados</h2>
            <div className="shadow-xl bg-white rounded-lg overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Nombre</th>
                    <th className="py-3 px-6 text-left">Apellido</th>
                    <th className="py-3 px-6 text-left">DNI</th>
                    <th className="py-3 px-6 text-left">Correo</th>
                    <th className="py-3 px-6 text-left">Rol</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {empleados.map(empleado => (
                    <tr key={empleado.empleado_id} className="hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{empleado.empleado_id}</td>
                      <td className="py-3 px-6 text-left">{empleado.nombre}</td>
                      <td className="py-3 px-6 text-left">{empleado.apellido}</td>
                      <td className="py-3 px-6 text-left">{empleado.dni}</td>
                      <td className="py-3 px-6 text-left">{empleado.correo}</td>
                      <td className="py-3 px-6 text-left">{empleado.rol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'clientes':
        return (
          <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold mb-4">Clientes</h2>
            <div className="shadow-xl bg-white rounded-lg overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Nombre</th>
                    <th className="py-3 px-6 text-left">Correo</th>
                    <th className="py-3 px-6 text-left">Contraseña</th>
                    <th className="py-3 px-6 text-left">Día de Cumpleaños</th>
                    <th className="py-3 px-6 text-left">Mes de Cumpleaños</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {clientes.map(cliente => (
                    <tr key={cliente.id} className="hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{cliente.id}</td>
                      <td className="py-3 px-6 text-left">{cliente.nombre}</td>
                      <td className="py-3 px-6 text-left">{cliente.correo}</td>
                      <td className="py-3 px-6 text-left">{cliente.contrasenia}</td>
                      <td className="py-3 px-6 text-left">{cliente.dia_de_cumpleanos}</td>
                      <td className="py-3 px-6 text-left">{cliente.mes_de_cumpleanos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'promociones':
        return (
          <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold mb-4">Promociones</h2>
            <div className="shadow-xl bg-white rounded-lg overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Título</th>
                    <th className="py-3 px-6 text-left">Descripción</th>
                    <th className="py-3 px-6 text-left">Imagen</th>
                    <th className="py-3 px-6 text-left">Fecha de Inicio</th>
                    <th className="py-3 px-6 text-left">Fecha de Fin</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {promociones.map(promocion => (
                    <tr key={promocion.promocion_id} className="hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{promocion.promocion_id}</td>
                      <td className="py-3 px-6 text-left">{promocion.titulo}</td>
                      <td className="py-3 px-6 text-left">{promocion.descripcion}</td>
                      <td className="py-3 px-6 text-left">{promocion.imagen}</td>
                      <td className="py-3 px-6 text-left">{promocion.fecha_inicio}</td>
                      <td className="py-3 px-6 text-left">{promocion.fecha_fin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="text-white min-h-screen">
      <Header tituloPagina="BlackMoonAdmin" />
      <div className="flex">
        <NavBar setActiveTab={setActiveTab} />
        <main className="flex-grow p-8 ml-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};


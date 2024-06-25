import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from '../components/Administracion/Navbar';
import { Header } from '../components/Layout/Header';

export const DashboardAdmin = () => {
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/blackmoon');
        const { saldoTotal } = response.data;
        setSaldoTotal(saldoTotal);
      } catch (error) {
        console.error('Error al obtener los datos de BlackMoon:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white min-h-screen ">
      <Header tituloPagina="BlackMoonAdmin" />
      <div className="flex">
        <NavBar />
        <div className="flex-grow p-8 ml-10">
          <h2 className="text-3xl font-bold mb-4">BlackMoon</h2>
          <div className="bg-white p-6 rounded-lg shadow text-black">
            <p className="text-lg font-semibold">Saldo Total:</p>
            <p className="text-2xl text-green-500">${saldoTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

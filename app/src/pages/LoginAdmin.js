import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('Administrador');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/login-admin', { correo, contrasena, rol });
            
            if (response.data.success) {
                switch (response.data.rol) {
                    case 'Administrador':
                        navigate('/dashboardadmin');
                        break;
                    case 'Mesero':
                        navigate('/dashboardmesero');
                        break;
                    case 'Cocinero':
                        navigate('/dashboardcocinero');
                        break;
                    case 'Repartidor':
                        navigate('/dashboardrepartidor');
                        break;
                    case 'Cajero':
                        navigate('/dashboardcajero');
                        break;
                    default:
                        break;
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
                <h2 className="text-2xl mb-4">Login</h2>
                
                <label className="block mb-2">
                    Rol:
                    <select 
                        className="block w-full mt-1 p-2 border border-gray-300 rounded" 
                        value={rol} 
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="Administrador">Administrador</option>
                        <option value="Mesero">Mesero</option>
                        <option value="Cocinero">Cocinero</option>
                        <option value="Repartidor">Repartidor</option>
                        <option value="Cajero">Cajero</option>
                    </select>
                </label>
                
                <label className="block mb-2">
                    Correo:
                    <input 
                        type="email" 
                        className="block w-full mt-1 p-2 border border-gray-300 rounded" 
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </label>
                
                <label className="block mb-4">
                    Contraseña:
                    <input 
                        type="password" 
                        className="block w-full mt-1 p-2 border border-gray-300 rounded" 
                        value={contrasena} 
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </label>
                
                <button 
                    type="submit" 
                    className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default LoginAdmin;


import { InputsRegistro } from "../components/InputsRegistro";
import { useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/Header";

export const Registro = () => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    confirmarCorreo: "",
    contrasenia: "",
    confirmarContrasenia: "",
    dia_de_cumpleanos: "",
    mes_de_cumpleanos: "",
  });

  const [loginData, setLoginData] = useState({
    correo: "",
    contrasenia: "",
  });

  const [errors, setErrors] = useState({
    correo: "",
    contrasenia: "",
  });

  const [loginErrors, setLoginErrors] = useState({
    correo: "",
    contrasenia: "",
  });

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarThankYou, setMostrarThankYou] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { correo, confirmarCorreo, contrasenia, confirmarContrasenia } = formData;
    let valid = true;
    let newErrors = { correo: "", contrasenia: "" };

    if (correo !== confirmarCorreo) {
      newErrors.correo = "Los correos no coinciden";
      valid = false;
    }

    if (contrasenia !== confirmarContrasenia) {
      newErrors.contrasenia = "Las contraseñas no coinciden";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await axios.post("/guardar-cliente", formData);
        console.log(response.data); 
        setMostrarThankYou(true); // Show the thank you modal
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        newErrors.registro = "Error al registrarte, verifica los campos o inténtalo más tarde.";
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/iniciar-sesion", loginData);
      console.log(response.data);
      navigate('/inicio');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setLoginErrors({ ...loginErrors, correo: "Correo Incorrecto" });
    }
  };

  const abrirModal = (e) => {
    e.preventDefault();
    setMostrarLogin(true);
  };

  const cerrarModal = (e) => {
    e.preventDefault();
    setMostrarLogin(false);
  };

  const cerrarThankYouModal = (e) => {
    e.preventDefault();
    setMostrarThankYou(false);
    setMostrarLogin(true);
  };

  return (
    <div>
      <Header tituloPagina='¡Bienvenidos a BlackMoon!' />
      <form className="text-xl m-6 md:flex md:gap-4 md:items-end" onSubmit={handleSubmit}>
        <div className="bg-purple-400 rounded-lg p-4 md:w-1/2">
          <InputsRegistro 
            label='Nombre:'
            type='text'
            name='nombre'
            placeholder='Diego Tapia Reyes'
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <InputsRegistro 
            label='Correo:'
            type='email'
            name='correo'
            placeholder='diegod@ejemplo.com'
            value={formData.correo}
            onChange={handleInputChange}
          />
          <InputsRegistro 
            label='Confirmar correo:'
            type='email'
            name='confirmarCorreo'
            placeholder='diegod@ejemplo.com'
            value={formData.confirmarCorreo}
            onChange={handleInputChange}
          />
          <span className="text-red-500">{errors.correo}</span>
          <InputsRegistro 
            label='Contraseña:'
            type='password'
            name='contrasenia'
            placeholder='········'
            value={formData.contrasenia}
            onChange={handleInputChange}
          />
          <InputsRegistro 
            label='Confirmar contraseña:'
            type='password'
            name='confirmarContrasenia'
            placeholder='········'
            value={formData.confirmarContrasenia}
            onChange={handleInputChange}
          />
          <span className="text-red-500">{errors.contrasenia}</span>
          <p>Fecha de nacimiento:</p>
          <div className="grid grid-cols-2 text-center">
            <label>
              <input 
                type="number" 
                name="mes_de_cumpleanos"
                placeholder="08"
                className="w-11/12 bg-orange-200 rounded-lg text-center" 
                min="1" 
                max="12"
                value={formData.mes_de_cumpleanos}
                onChange={handleInputChange}
              />
              Mes
            </label>
            <label>
              <input 
                type="number" 
                name="dia_de_cumpleanos"
                placeholder="12"
                className="w-11/12 bg-orange-200 rounded-lg text-center" 
                min="1" 
                max="31"
                value={formData.dia_de_cumpleanos}
                onChange={handleInputChange}
              />
              Dia
            </label> 
          </div>
          <div className="text-center">
          <span className="text-red-500">{errors.registro}</span>
          </div>
        </div>
        <div className='w-full md:w-1/2 flex flex-col text-center gap-y-2'>
          <input type="submit" value="Registrarse" className="bg-orange-200 mt-4 py-4 rounded-2xl hover:scale-105 ease-in-out duration-300 md:h-full" />
          <button type="button" className='text-white text-xm' onClick={abrirModal}>--Inicia Sesión--</button>
        </div>
        
      </form>

      {mostrarLogin && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <form onSubmit={handleLoginSubmit}>
              <InputsRegistro 
                label='Correo:'
                type='email'
                name='correo'
                placeholder='diegod@ejemplo.com'
                value={loginData.correo}
                onChange={handleLoginInputChange}
                clase='py-2'
              />
              <span className="text-red-500">{loginErrors.correo}</span>
              <InputsRegistro 
                label='Contraseña:'
                type='password'
                name='contrasenia'
                placeholder='········'
                value={loginData.contrasenia}
                onChange={handleLoginInputChange}
                clase='py-2'
              />
              <span className="text-red-500">{loginErrors.contrasenia}</span>
              <input type="submit" value="Iniciar Sesión" className="bg-orange-200 mt-4 py-2 w-full rounded-xl hover:scale-105 ease-in-out duration-300" />
              <button type="button" onClick={cerrarModal} className="mt-4 hover:underline w-full text-center">Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {mostrarThankYou && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <p>Gracias, por registrarte, ahora puedes iniciar sesión</p>
            <button type="button" onClick={cerrarThankYouModal} className="mt-4 bg-orange-200 py-2 w-full rounded-xl hover:scale-105 ease-in-out duration-300">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


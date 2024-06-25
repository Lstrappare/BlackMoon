import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Registro } from './pages/Registro';
import { InicioRegistrado } from './pages/InicioRegistrado';
import { Menu } from './pages/Menu';
import { Nosotros } from './pages/Nosotros';
import { TerminosYCondiciones } from './pages/TerminosYCondiciones';
import { Sucursales } from './pages/Sucursales'
import { OrdenDomicilio } from './pages/OrdenDomicilio'
import { Promociones } from './pages/Promociones'
import LoginAdmin from './pages/LoginAdmin';
import { DashboardAdmin } from './pages/DashboardAdmin';



function App() {
  return (
    <div className="App bg-gradient-to-tl from-pink-600 to-blue-900 min-h-screen">
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/inicio" element={<InicioRegistrado />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/blackmoon" element={<Nosotros />} />
      <Route path="/terminos" element={<TerminosYCondiciones />} />
      <Route path="/sucursales" element={<Sucursales />} />
      <Route path="/domicilio" element={<OrdenDomicilio />} />
      <Route path="/promociones" element={<Promociones />} />
      <Route path="/admin" element={<LoginAdmin />} />
      <Route path="/dashboardadmin" element={<DashboardAdmin />} />
    </Routes>
    <footer>.</footer>
    </div>
  );
}

export default App;

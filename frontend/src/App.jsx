import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/rutaProtegida";
import Home from "./pages/home";
import GPUSection from "./pages/seccionGPU";
import Login from "./pages/seccionLogin";
import Register from "./pages/seccionRegistro";
import Cart from "./pages/carrito";
import RestablecerPassword from "./pages/restablecerPassword";
import EnviarRecuperacion from "./pages/enviarCorreo";
import MonitoresSeccion from "./pages/seccionMonitores";
import Resultados from "./pages/seccionResultadosAparte";
import TecladosSeccion from "./pages/seccionTeclados";
import MouseSeccion from "./pages/seccionMouse";
import ProcesadoresSeccion from "./pages/seccionProcesadores";
import RAMSeccion from "./pages/seccionRam";
import MotherboardsSection from "./pages/seccionMotherboard";
import AlmacenamientoSeccion from "./pages/storageSeccion";
import FuentesPoderSeccion from "./pages/seccionFuentePoder";
import MiPerfil from "./pages/miPerfil";
import Pago from "./pages/pagos";
import SelectAddressForPayment from "./components/seleccionarDireccionCompra";
import DashboardAdmin from "./pages/dashboardAdmin";
import AdministrarProductos from "./pages/gestionarProductos";
import GestionarUsuarios from "./pages/gestionarUsuarios";
import PaginasPedidos from "./pages/gestionarPedidos";
import GestionarPagos from "./pages/gestionarPagos";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/motherboards" element={<MotherboardsSection />} />
          <Route path="/tarjetas-graficas" element={<GPUSection />} />
          <Route path="/procesadores" element={<ProcesadoresSeccion />} />
          <Route path="/ram" element={<RAMSeccion />} />
          <Route path="/mouses" element={<MouseSeccion />} />
          <Route path="/monitores" element={<MonitoresSeccion />} />
          <Route path="/storage" element={<AlmacenamientoSeccion />} />
          <Route path="/teclados" element={<TecladosSeccion />} />
          <Route path="/fuentes-poder" element={<FuentesPoderSeccion />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/restablecer-password" element={<RestablecerPassword />} />
          <Route path="/enviar-correo" element={<EnviarRecuperacion />} />
          <Route path="/resultados" element={<Resultados />} />
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/carrito" element={<Cart />} />
            <Route path="/Pago" element={<Pago />} />
            <Route path="/seleccionar-direccion" element={<SelectAddressForPayment />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
            <Route path="/administrarProductos" element={<AdministrarProductos />} />
            <Route path="/gestionarUsuarios" element={<GestionarUsuarios />} />
            <Route path="/administrarPedidos" element={<PaginasPedidos/>} />
            <Route path="/administrarPagos" element={<GestionarPagos/>} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

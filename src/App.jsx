import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import InicioSesion from "./pages/InicioSesion";
import NoEncontrada from "./pages/NoEncontrada";
import Dashboard from "./layout/Dashboard";
import Perfil from "./pages/Perfil";
import CalendarioCitas from "./pages/CalendarioCitas";
import { AuthProvider } from "./context/AuthProvider";
import AgendarCita from "./pages/AgendarCita";
import RegistrarPaciente from "./pages/RegistrarPaciente";
import ListaPacientes from "./pages/ListaPacientes";
import PerfilPaciente from "./pages/PerfilPaciente";
import RecuperarPass from "./pages/RecuperarPass";
import RestablecerPass from "./pages/RestablecerPass";
import Auth from "./layout/Auth";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<LandingPage />} />

            <Route path="/" element={<Auth />}>
              <Route path="inicioSesion" element={<InicioSesion />} />
              <Route path="recuperarPass" element={<RecuperarPass />} />
              <Route
                path="restablecerPass/:token"
                element={<RestablecerPass />}
              />
              <Route path="*" element={<NoEncontrada />} />
            </Route>

            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Perfil />} />
                      <Route path="citas" element={<CalendarioCitas />} />
                      <Route path="agendarCita" element={<AgendarCita />} />
                      <Route
                        path="registrarPaciente"
                        element={<RegistrarPaciente />}
                      />
                      <Route
                        path="listaPacientes"
                        element={<ListaPacientes />}
                      />
                      <Route
                        path="perfilPaciente"
                        element={<PerfilPaciente />}
                      />
                    </Route>
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

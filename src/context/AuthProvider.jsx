import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    // Intentar cargar los datos de autenticación desde el localStorage al montar el componente
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = async (email, contraseña) => {
    try {
      // Endpoint del backend
      const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
      const response = await axios.post(url,{ email, contraseña });
      const userData = response.data;
      // Autorizar el inicio de sesión según rol y otorgar funciones 
      if (response.data.isSecre) {
        setRol("Secretaria");
      } else if (response.data.isDoctor) {
        setRol("Doctor");
      } else {
        navigate("/inicioSesion");
        setError("No estas autorizado para iniciar sesión");
        setTimeout(() => {
          setError(null)
        }, 3000)
        return;
      }
      // Guardar token en localStorage
      localStorage.setItem("token", userData.token);
      setAuth(userData);
      setError(null);
    } catch (error) {
      // Manejo y muestra de errores
      setError(error.response.data.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const fetchUserProfile = async (storedToken) => {
    try {
      // Endpoint del backend
      const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
      const options = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        }
      }
      const response = await axios.get(url,options);
      // Guardar los datos de usuario autenticado
      setAuth(response.data);
      // Clasificar al usuario según rol
      if (response.data.isSecre) {
        setRol("Secretaria")
      } else if (response.data.isDoctor) {
        setRol("Doctor")
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error al recuperar el perfil del usuario:", error);
    }
  };

  // Fetch user profile on component mount and after login

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        error,
        rol
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { email, contraseña },
      );
      const userData = response.data;

      if (response.data.isSecre) {
        setRol("Secretaria");
      } else if (response.data.isDoctor) {
        setRol("Doctor");
      }

      localStorage.setItem("token", userData.token); // Guardar token en localStorage
      setAuth(userData);
      setError(null);
    } catch (error) {
      setError(error.response.data.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const fetchUserProfile = async (storedToken) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/perfil`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );
      console.log(response.data.isSecre);
      setAuth(response.data);

      if (response.data.isSecre) {
        setRol("Secretaria")
      } else if (response.data.isDoctor) {
        setRol("Doctor")
      }

    } catch (error) {
      console.error("Error fetching user profile:", error);
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

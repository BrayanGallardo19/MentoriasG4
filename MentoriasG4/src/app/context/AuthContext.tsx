import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "mentor" | "estudiante";
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:8081/api/auth";

// Función utilitaria para extraer los datos del JWT sin librerías externas
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      // Validar si el token no ha expirado
      if (decoded && decoded.exp * 1000 > Date.now()) {
        return {
          id: 0, // El token actual no trae el ID, así que usamos 0 (se podría modificar el backend después)
          name: decoded.nombre,
          email: decoded.sub,
          role: decoded.role.toLowerCase() as "admin" | "mentor" | "estudiante",
        };
      } else {
        localStorage.removeItem("token");
      }
    }
    return null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        const decoded = parseJwt(data.token);
        setUser({
          id: 0,
          name: decoded.nombre,
          email: decoded.sub,
          role: decoded.role.toLowerCase() as "admin" | "mentor" | "estudiante",
        });
        return true;
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: name, email, password }),
      });

      if (response.ok) {
        // Tras registrarse correctamente, devolvemos true (sin login automático)
        return true;
      }
    } catch (error) {
      console.error("Error en registro:", error);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

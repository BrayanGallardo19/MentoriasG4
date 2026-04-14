import React, { createContext, useContext, useState } from "react";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "mentor" | "estudiante";
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios de prueba
const TEST_USERS = [
  {
    id: 1,
    name: "Ana García",
    email: "mentor@mentorias.com",
    password: "123456",
    role: "mentor" as const,
  },
  {
    id: 4,
    name: "Juan Pérez",
    email: "estudiante@mentorias.com",
    password: "123456",
    role: "estudiante" as const,
  },
  {
    id: 99,
    name: "Administrador",
    email: "admin@mentorias.com",
    password: "123456",
    role: "admin" as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Intentar leer del localStorage
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string, password: string): boolean => {
    const foundUser = TEST_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };
      setUser(authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
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

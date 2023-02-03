import { useState, createContext, useEffect, ReactNode } from "react";
import { AUTH_TYPE, ILOGINRESPONSE } from "../@types";
import { useAuth } from "../hooks";

export const AuthenticationContext = createContext<AUTH_TYPE | null>(null);

export const AuthenticationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { loading, login } = useAuth();
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("email");

    if (storedUser !== undefined && storedUser !== null && token) {
      setUser(storedUser);
    }
  }, []);

  const onLogin = async (payload: {
    email: string;
    password: string;
  }): Promise<any> => {
    const response: ILOGINRESPONSE = await login(payload);
    if (response) {
      sessionStorage.setItem("token", response?.token);
      sessionStorage.setItem("email", response?.email);
      sessionStorage.setItem("id", response?.id);

      setUser(response?.email);
      return (window.location.href = "/dashboard");
    }
  };

  const onLogout = (): any => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("id");
    return (window.location.href = "/");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        loading,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

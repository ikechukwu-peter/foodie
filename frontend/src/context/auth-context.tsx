import { useState, createContext, useEffect, ReactNode } from "react";
import { AUTH_TYPE, ILoginRes } from "../@types";
import { useAuth } from "../hooks";

export const AuthenticationContext = createContext<AUTH_TYPE | null>(null);

export const AuthenticationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { loading, login } = useAuth();
  const [user, setUser] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("email");
    const id = sessionStorage.getItem("id");

    if (storedUser !== undefined && storedUser !== null && id && token) {
      setUser(storedUser);
      setId(id as string);
    }
  }, []);

  const onLogin = async (payload: { email: string; password: string }) => {
    const response: ILoginRes = await login(payload);
    if (response) {
      sessionStorage.setItem("token", response?.token);
      sessionStorage.setItem("email", response?.email);
      sessionStorage.setItem("id", response?.id);

      setUser(response?.email);
      setId(response.id);
      return (window.location.href = "/dashboard");
    }
  };

  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("id");
    return (window.location.href = "/");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        id,
        loading,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

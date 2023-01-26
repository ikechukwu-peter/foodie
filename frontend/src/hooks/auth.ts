import { useState } from "react";
import { instance } from "../config";
export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await instance.post("/auth/join", payload);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
  };
};

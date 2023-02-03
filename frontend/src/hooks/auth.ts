import { AxiosResponse } from "axios";
import { useState } from "react";
import { ILOGINRESPONSE } from "../@types";
import { instance } from "../config";
export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (payload: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<ILOGINRESPONSE> | any> => {
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

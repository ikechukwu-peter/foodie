import { AxiosResponse } from "axios";
import { useState } from "react";
import { instance } from "../config";
import { IRECIPEPAYLOAD, IRECIPERESPONSE } from "./../@types/index";

export const useRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const searchRecipe = async (
    q: string
  ): Promise<AxiosResponse<IRECIPERESPONSE[] | []> | any> => {
    try {
      setLoading(true);
      const response = await instance.get(`/recipe/find?q=${q}`);
      if (response) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (payload: IRECIPEPAYLOAD): Promise<void> => {
    const { note, ...rest } = payload;
    const formData = new FormData();

    const payloadToArray = Object.keys(rest);

    for (const item of payloadToArray) {
      formData.append(item, rest[item as keyof typeof rest]);
    }
    if (note) {
      formData.append("note", note);
    }

    try {
      setLoading(true);
      await instance.post("/recipe/create", formData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addRecipe,
    searchRecipe,
  };
};

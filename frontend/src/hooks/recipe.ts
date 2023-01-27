import { useState } from "react";
import { IRECIPE_PAYLOAD } from "../@types";
import { instance } from "../config";
export const useRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const searchRecipe = async (q: string) => {
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

  const addRecipe = async (payload: IRECIPE_PAYLOAD) => {
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
      const response = await instance.post("/recipe/create", formData);
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
    addRecipe,
    searchRecipe,
  };
};

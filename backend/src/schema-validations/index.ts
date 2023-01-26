import * as yup from "yup";

const createRecipeSchema: yup.AnyObjectSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    note: yup.string().required(),
    ingredients: yup.string().required(),
    description: yup.string().required(),
  }),
});

const getRecipeSchema: yup.AnyObjectSchema = yup.object({
  params: yup.object({
    id: yup.string().required(),
  }),
});

const getUserRecipesSchema: yup.AnyObjectSchema = yup.object({
  params: yup.object({
    userId: yup.string().required(),
  }),
});

//register or login
const joinSchema: yup.AnyObjectSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  }),
});

export {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  joinSchema,
};

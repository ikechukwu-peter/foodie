import React, { FormEvent, useState, useContext } from "react";
import { Input, Form, Button } from "../../components";
import recipeOne from "../../assets/recipe-one.jpg";
import { validateEmail } from "../../utils";
import { AuthenticationContext } from "../../context";
import { AUTH_TYPE } from "../../@types";
import cogoToast from "cogo-toast";

enum TYPE {
  LOGIN = "Login",
  REGISTER = "Register",
}

type _STATE = {
  email: string;
  password: string;
};

export const Landing = () => {
  const { loading, onLogin } = useContext(AuthenticationContext) as AUTH_TYPE;
  const [state, setState] = useState<_STATE>({ email: "", password: "" });
  const [action, setAction] = useState<string>("Login");
  const handleState = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  };
  const handleNavigation = (type: TYPE) => {
    setAction(type);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(state?.email)) {
      return cogoToast.error("Invalid email");
    }
    if (!state?.password) {
      return cogoToast.error("Please provide password");
    }
    await onLogin(state);
  };
  return (
    <div className="container bg-black text-white h-[100%] flex flex-col-reverse md:flex-row w-full">
      <Form
        className="flex items-center justify-center w-full h-full p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2  w-full md:w-[50%]">
          <Input
            name="email"
            placeholder="Email"
            handleChange={handleState}
            type="text"
            className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />

          <Input
            name="password"
            placeholder="Password"
            handleChange={handleState}
            type="password"
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />

          <div className="w-full md:w-[50%] m-auto flex flex-col gap-2">
            <Button
              title={action === TYPE.LOGIN && loading ? "Loading" : "Login"}
              handleClick={() => handleNavigation(TYPE.LOGIN)}
              className={`bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full `}
              type="submit"
              disabled={loading}
            />
            <Button
              title={
                action === TYPE.REGISTER && loading ? "Loading" : "Register"
              }
              handleClick={() => handleNavigation(TYPE.REGISTER)}
              className={`bg-orange-500 text-white hover:bg-orange-600  py-1 px-6 w-full `}
              type="submit"
              disabled={loading}
            />
          </div>
        </div>
      </Form>

      <div className="w-full h-full saturate-200 ">
        <img
          src={recipeOne}
          alt="A dish with food recipes"
          className="w-full h-full object-center object-cover"
        />
      </div>
    </div>
  );
};

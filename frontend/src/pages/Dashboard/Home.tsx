import React, { useState, FormEvent, Suspense, useContext } from "react";
import { Card, Form, Input } from "../../components";
import { instance } from "../../config";
import useSWR from "swr";
import cogoToast from "cogo-toast";
import { AUTH_TYPE, RECIPERES, RECIPEUSER } from "../../@types";
import { AuthenticationContext } from "../../context";

export const Home = () => {
  const { user } = useContext(AuthenticationContext) as AUTH_TYPE;
  //useswr fetcher
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("/recipe", fetcher, { suspense: true });

  if (error) {
    console.log(error);
    return cogoToast.error(error);
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {};
  const [query, setQuery] = useState<string>("");

  const [recipes, setRecipes] = useState<number>(6);

  return (
    <Suspense fallback={<div>LOADING</div>}>
      <div className="text-white w-full h-full">
        <h2 className="font-extrabold text-xl ">Recipe</h2>
        <Form onSubmit={handleSearch}>
          <Input
            placeholder="Search for a recipe"
            type="text"
            handleChange={(e: FormEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)
            }
            className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm 
        hover:bg-zinc-800 cursor-pointer focus:outline-none my-3
        `}
          />
        </Form>

        <div className="grid grid-row-1 grid-col-1 md:grid-rows-2 md:grid-cols-3  gap-4  my-4 place-items-center py-4 w-full h-full py-4">
          {data.map((recipe: RECIPERES, index: number) => (
            <RecipeCard key={index + recipe._id} {...recipe} user={user} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

const RecipeCard = ({
  _id,
  title,
  ingredients,
  note,
  image,
  description,
  user,
}: RECIPEUSER) => {
  return (
    <Card
      id={_id}
      title={title}
      image={image?.url}
      description={description}
      email={user}
      avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    />
  );
};

import React, { useState, FormEvent } from "react";
import { Card, Form, Input } from "../../components";
import chicken from "../../assets/recipe-one.jpg";

export const Home = () => {
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {};
  const [query, setQuery] = useState<string>("");

  const [recipes, setRecipes] = useState<number>(6);

  return (
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
        {[...Array(recipes)].map((_, index) => (
          <Card
            key={index}
            id="1"
            title="Chicken"
            image={chicken}
            description="Chicken is the best meat in the world"
            username="Pete"
            email="pitiyek@gmail.com"
            avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          />
        ))}
      </div>
    </div>
  );
};

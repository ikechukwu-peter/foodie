import React from "react";
import { useNavigate } from "react-router-dom";
import { RECIPEUSER } from "../@types";
import { Button } from "./Button";

export const RecipeCard = ({
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
      ingredients={ingredients}
      note={note}
      description={description}
      email={user}
      avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    />
  );
};

export const Card = ({
  id,
  avatar,
  image,
  title,
  description,
  email,
  ingredients,
  note,
}: {
  id: string;
  avatar: string;
  image: string;
  description: string;
  title: string;
  email: string;
  ingredients: string;
  note?: string;
}) => {
  const navigate = useNavigate();
  const handleViewMore = (id: string) => {
    navigate("/dashboard/recipe/" + id);
  };
  return (
    <div
      className="w-[14rem]  bg-zinc-900 
      transition ease-in-out delay-150
      hover:translate-x-6 
      hover:scale-100
      duration-300
      mb-4
      "
    >
      <img
        src={image}
        alt={"A picture of " + title}
        className="w-[14rem] h-[10rem] object-cover"
      />
      <div className="p-2 bg-zinc-900 w-[14rem] h-15rem] overflow-clip my-3">
        <div className="flex gap-4 items-start w-full">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src={avatar}
            alt={"A picture of user"}
          />
          <div className="text-left">
            <p className="text-orange-500 font-light">{email}</p>
          </div>
        </div>
        <h2 className="text-orange-500 font-bold my-2 text-xl">{title}</h2>
        <p className="text-orange-500 font-light text-sm">
          ingredients:{" "}
          <span className="text-white truncate overflow-hidden ...">
            {ingredients}
          </span>
        </p>

        <p className="text-white font-light text-sm my-2 truncate overflow-hidden ...">
          {description}
        </p>

        {note && (
          <p className="text-orange-500 font-light text-sm py-4">
            note: <span className="text-white">{note}</span>
          </p>
        )}

        <div className="flex justify-end">
          <Button
            title="View  More"
            handleClick={() => handleViewMore(id)}
            className={`bg-orange-500 text-white hover:bg-orange-600 
          py-1 px-2 w-[50%]
          `}
          />
        </div>
      </div>
    </div>
  );
};

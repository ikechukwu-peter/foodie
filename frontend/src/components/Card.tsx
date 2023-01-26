import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Card = ({
  id,
  avatar,
  image,
  title,
  description,
  email,
}: {
  id: string;
  avatar: string;
  image: string;
  description: string;
  title: string;
  email: string;
}) => {
  const navigate = useNavigate();
  const handleViewMore = (id: string) => {
    navigate("/recipe/" + id);
  };
  return (
    <div
      className="w-[14rem] h-auto bg-zinc-900 
      transition ease-in-out delay-150
      hover:translate-x-6 
      hover:scale-100
      duration-300"
    >
      <img
        src={image}
        alt={"A picture of " + title}
        className="w-full h-auto object-cover"
      />
      <div className="p-2">
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
        <p className="text-white font-light text-sm">{description}</p>

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

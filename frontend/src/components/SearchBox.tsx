import React, { FormEvent } from "react";
import { Form } from "./Form";
import { Input } from "./Input";

export const SearchBox = ({
  title,
  onSearch,
  setQuery,
  query,
}: {
  title: string;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  setQuery: (e: React.SetStateAction<string>) => void;
  query: string;
}) => {
  return (
    <>
      <h2 className="font-extrabold text-xl ">{title}</h2>
      <Form onSubmit={onSearch}>
        <Input
          placeholder="Search for a recipe"
          type="text"
          value={query}
          handleChange={(e: FormEvent<HTMLInputElement>) =>
            setQuery(e.currentTarget.value)
          }
          className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm 
        hover:bg-zinc-800 cursor-pointer focus:outline-none my-3
        `}
        />
      </Form>
    </>
  );
};

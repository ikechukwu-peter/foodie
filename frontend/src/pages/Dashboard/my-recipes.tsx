import React, { useState, FormEvent, Suspense, useContext } from "react";
import useSWR from "swr";
import cogoToast from "cogo-toast";

import { RecipeCard, SearchBox } from "../../components";
import { instance } from "../../config";
import { AUTH_TYPE, RECIPERES } from "../../@types";
import { AuthenticationContext } from "../../context";

export const MyRecipes = () => {
  const { user, id } = useContext(AuthenticationContext) as AUTH_TYPE;

  //useswr fetcher
  //   const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  //   const { data, error } = useSWR(`/recipe/user/${id}`, fetcher, {
  //     suspense: true,
  //   });

  //   console.log(data);

  //   if (error) {
  //     console.log(error);
  //     return cogoToast.error(error);
  //   }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [query, setQuery] = useState<string>("");

  return (
    <Suspense fallback={<div>LOADING</div>}>
      <div className="text-white w-full h-full">
        <SearchBox
          title="My Recipes"
          onSearch={handleSearch}
          setQuery={setQuery}
          query={query}
        />
        <div className="flex flex-wrap gap-3 flex-col md:flex-row w-ful">
          {/* {data.map((recipe: RECIPERES, index: number) => (
            <RecipeCard key={index + recipe._id} {...recipe} user={user} />
          ))} */}
        </div>
      </div>
    </Suspense>
  );
};

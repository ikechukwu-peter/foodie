import React, { useState, FormEvent, Suspense } from "react";
import useSWR from "swr";
import cogoToast from "cogo-toast";

import { RecipeCard, SearchBox } from "../../components";
import { instance } from "../../config";
import { RECIPERES } from "../../@types";

export const Home = () => {
  //useswr fetcher
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("/recipe", fetcher, { suspense: true });

  if (error) {
    console.log(error);
    cogoToast.error(error);
    return null;
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [query, setQuery] = useState<string>("");

  return (
    <Suspense fallback={<div>LOADING</div>}>
      <div className="text-white w-full h-full">
        <SearchBox
          title="Recipe"
          onSearch={handleSearch}
          setQuery={setQuery}
          query={query}
        />
        <div className="flex flex-wrap gap-3 flex-col items-center justify-center md:justify-start md:items-start md:flex-row w-full">
          {data.map((recipe: RECIPERES, index: number) => (
            <RecipeCard
              key={index + recipe._id}
              {...recipe}
              user={recipe?.user?.email as string}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

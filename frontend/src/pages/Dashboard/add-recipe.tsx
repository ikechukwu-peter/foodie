import React, { DragEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, ImageUploader, Input, TextArea } from "../../components";
import { validateImageType } from "../../utils";
type STATE = {
  title: string;
  note: string;
  description: string;
  ingredients: string;
};
export const AddRecipe = () => {
  const [state, setState] = useState<STATE | null>({
    title: "",
    note: "",
    description: "",
    ingredients: "",
  });
  const [image, setImage] = useState<File | null>(null);

  //prepare element to be accept dropping contents
  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let imageFile = event.dataTransfer.files[0];

    if (!validateImageType(imageFile)) {
      alert("File type is wrong" + imageFile.type);
      return;
    }

    setImage(imageFile);
  };

  const handleFile = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    const imageFile = event.currentTarget.files[0];
    if (!validateImageType(imageFile)) {
      alert("File type is wrong" + imageFile.type);
      return;
    }

    setImage(imageFile);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);

    if (!image) {
      alert("Please an image");
      return;
    }

    if (
      !state?.title ||
      !state?.description ||
      !state?.ingredients ||
      !state?.note
    ) {
      alert("Please fill the missing field");
      return;
    }

    console.log("FORM SUBMITTED", state);
  };
  const onChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    console.log(name, value);
    setState({ ...state, [name]: value });
  };

  return (
    <div className="text-white">
      <h2 className="font-extrabold text-xl">Add a recipe</h2>

      <Form
        onSubmit={onSubmit}
        className={`mt-3 flex flex-col gap-3 md:flex-row`}
      >
        <div className="w-full">
          <Input
            name="title"
            placeholder="Name of the recipe"
            type="text"
            handleChange={onChange}
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />

          <TextArea
            name="ingredients"
            placeholder="Ingredients"
            onChange={onChange}
            rows={4}
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none mt-2`}
          />

          <TextArea
            name="description"
            placeholder="Recipe description and how to make it"
            onChange={onChange}
            rows={6}
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <ImageUploader
            handleDragOver={handleOnDragOver}
            handleOnDrop={handleOnDrop}
            handleFile={handleFile}
            name={image?.name as string}
            className={`bg-zinc-900 py-1 px-4 w-full  hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />
          <TextArea
            name="note"
            placeholder="Notes"
            onChange={onChange}
            rows={4}
            className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
          />
          <Button
            title="Publish Recipe"
            className={`bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full `}
            type="submit"
          />
        </div>
      </Form>
    </div>
  );
};

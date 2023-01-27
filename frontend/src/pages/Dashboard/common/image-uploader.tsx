import React, { DragEvent, FormEvent } from "react";
import { Input } from "../../../components";

export const ImageUploader = ({
  handleDragOver,
  handleOnDrop,
  handleFile,
  className,
  name,
}: {
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleOnDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleFile: (event: FormEvent<HTMLInputElement>) => void;
  className: string;
  name: string;
}) => {
  return (
    <div className={className}>
      <div
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        className="flex flex-col items-center justify-between p-4"
      >
        <p className="font-light text-lg">Add an image</p>
        <p className="font-light text-lg">Drag and drop image here....</p>
        <p>or</p>
        <label
          className="font-light text-lg text-orange-500 hover:cursor-pointer"
          htmlFor="file"
        >
          Choose file
        </label>
        <Input
          id="file"
          placeholder="File"
          type="file"
          accept="image/*"
          className="hidden"
          handleChange={handleFile}
        />
        {name && (
          <p className="text-white p-2 font-light underline underline-offset-4">
            {name} was added.
          </p>
        )}
      </div>
    </div>
  );
};

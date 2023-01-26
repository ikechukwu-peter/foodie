import { UploadedFile } from "express-fileupload";
export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/JPEG",
  "image/JPG",
  "image/png",
  "image/PNG",
];

export const validateImageType = (value: UploadedFile) => {
  if (value) {
    return SUPPORTED_FORMATS.includes(value.mimetype);
  }
};

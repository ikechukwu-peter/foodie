export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/JPEG",
  "image/JPG",
  "image/GIF",
  "image/gif",
  "image/png",
  "image/PNG",
];

export const validateImageType = (value: File) => {
  if (value) {
    return SUPPORTED_FORMATS.includes(value.type);
  }
};

export function validateImageSize(file: File) {
  //max image is 100kb
  if (file) {
    let size = file.size;
    return size <= 1024 * 100;
  }
}

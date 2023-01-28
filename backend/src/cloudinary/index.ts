import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import toStream from "buffer-to-stream";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

export const upload = async (
  file: Buffer,
  folder: string
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  //resize image using sharp
  const bufferOfFile = await sharp(file)
    .resize(1870)
    .webp({ quality: 90 })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      (error: UploadApiErrorResponse, result: UploadApiResponse) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    toStream(bufferOfFile).pipe(upload), { resource_type: "auto", folder };
  });
};

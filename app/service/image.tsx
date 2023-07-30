import imageCompression from "browser-image-compression";

const defaultOptions = { maxSizeMB: 1 };

export const compressImage = (imageFile: any, options = defaultOptions) => {
  return imageCompression(imageFile, options);
};

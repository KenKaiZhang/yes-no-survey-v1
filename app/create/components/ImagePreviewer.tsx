import { useEffect, useState } from "react";
import styles from "../styles/ImagePreviewer.module.css";

interface ImagePreviewerProps {
  imageFile: any;
}

const ImagePreviewer = (props: ImagePreviewerProps) => {
  const { imageFile } = props;
  const [imageUrl, setImageUrl] = useState<any>(undefined);

  useEffect(() => {
    setImageUrl(imageFile);
  }, [imageFile]);

  return imageFile ? <img src={imageUrl} alt="" /> : null;
};

export default ImagePreviewer;

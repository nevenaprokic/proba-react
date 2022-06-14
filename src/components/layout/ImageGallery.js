import ImageGallery from "react-image-gallery";
import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ImagesGallery({ photos }) {
  const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    let shouldCancel = false;

    setImages(
      photos.map((blob) => ({
        original: `${URL.createObjectURL(
          b64toBlob(blob.image.split(",")[1], "image/png")
        )}`,
        thumbnail: `${URL.createObjectURL(
          b64toBlob(blob.image.split(",")[1], "image/png")
        )}`,
      }))
    );
  }, []);

  return (!!images ? <ImageGallery items={images} /> : null);
}

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);

  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

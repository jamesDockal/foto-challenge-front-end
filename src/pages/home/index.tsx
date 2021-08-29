import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import ImageCard from "../../components/productCard";
import toast, { Toaster } from "react-hot-toast";
import NoImage from "../../assets/no_image.png";

import { api } from "../../service/api";
import { useProduct } from "../../context/Products";

import "./styles.css";

type Image = {
  isNew: boolean;
  image: any;
  id: string;
};

export default function Home() {
  const [allImages, setAllImages] = useState<Image[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  const { setTotalProducts, totalProducts } = useProduct();

  useEffect(() => {
    getImages([]);
  }, []);

  async function getImages(newImagesId: string[]) {
    const { data } = await api.get("/images");
    const formattedImages = data.Allimages.map((image: Image) => {
      if (newImagesId.includes(image.id)) {
        image.isNew = true;
      } else {
        image.isNew = false;
      }
      return image;
    });
    setTotalProducts(formattedImages.length);
    setAllImages(formattedImages);
  }

  function openFolder() {
    imageRef.current.click();
  }

  async function saveImage(e: any) {
    try {
      const files = e.target.files;

      if (files.length > 6) {
        toast.error("You can not save more than 6 pictures at once");
        return;
      }

      let newImagesId = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const form = new FormData();
        form.append("file", file);
        const { data } = await api.post("/images", form);

        newImagesId.push(data.createdImage.id);
      }

      getImages(newImagesId);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="home-page">
      <Header />
      <strong className="challenge">FOTO CHALLENGE</strong>
      <div className="products-card">
        {allImages.length && totalProducts >= 1 ? (
          <>
            {allImages.map((image) => (
              <ImageCard isNew={image.isNew} image={image} key={image.id} />
            ))}
            <div className="add-product" onClick={() => openFolder()}>
              <span className="plus">+</span>
            </div>
          </>
        ) : (
          <>
            <div className="empty-card" onClick={() => openFolder()}>
              <img className="no-image" src={NoImage} alt="NoImage" />
            </div>

            <div onClick={() => openFolder()} className="add-product">
              <span className="plus">+</span>
            </div>
          </>
        )}
      </div>
      <input
        type="file"
        multiple
        id="file"
        key="file"
        ref={imageRef}
        style={{ display: "none" }}
        onChange={(e) => saveImage(e)}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

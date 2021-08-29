import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import ImageCard from "../../components/productCard";
import { api } from "../../service/api";
import "./styles.css";

import toast, { Toaster } from "react-hot-toast";
import NoImage from "../../assets/no_image.png";

type images = {
  image: any;
  id: string;
};

export default function Home() {
  const [allImages, setAllImages] = useState<images[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    const { data } = await api.get("/images");
    setAllImages(data.Allimages);
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

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const form = new FormData();
        form.append("file", file);
        await api.post("/images", form);
      }

      getImages();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="home-page">
      <Header />
      <strong className="challenge">FOTO CHALLENGE</strong>
      <div className="products-card">
        {allImages.length ? (
          <>
            {allImages.map((image) => (
              <ImageCard image={image} key={image.id} />
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

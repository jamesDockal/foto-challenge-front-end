import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/Products";
import { api } from "../../service/api";
import "./styles.css";

type Image = {
  id: string;
  image: any;
};

type ImageCardProps = {
  image: Image;
  isNew?: boolean;
};

export default function ProductCard({ image, isNew }: ImageCardProps) {
  const [photo, setPhoto] = useState<any>();
  const { setTotalProducts, totalProducts } = useProduct();

  useEffect(() => {
    async function getImage() {
      const { data } = await api.get(`/images/${image.id}`);
      setPhoto(data);
    }
    getImage();
  }, []);

  async function deleteProduct() {
    const { data } = await api.delete(`/images/${image.id}`);
    setTotalProducts(totalProducts - 1);
    setPhoto(null);
  }

  return (
    <div
      style={{ display: photo ? "block" : "none" }}
      className={`productcard-container ${isNew && "is-new"} `}
    >
      <img
        className="card-image"
        src={`http://localhost:8000/images/${image.id}`}
        alt={image.id}
      />
      <div className="remove-product" onClick={() => deleteProduct()}>
        <span className="x">x</span>
      </div>
    </div>
  );
}

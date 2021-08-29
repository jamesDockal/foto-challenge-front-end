import { createContext, ReactNode, useContext, useState } from "react";

type ProductProviderProps = {
  children: ReactNode;
};

type ProductContextValue = {
  totalProducts: number;
  setTotalProducts: (arg: number) => void;
};

export const ProductContext = createContext({} as ProductContextValue);

export function ProductProvider({ children }: ProductProviderProps) {
  const [totalProducts, setTotalProducts] = useState(0);
  return (
    <ProductContext.Provider value={{ totalProducts, setTotalProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  return useContext(ProductContext);
};

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    console.log("notlooping");

    setTotalProducts(totalProducts);
  }, [totalProducts]);
  return (
    <ProductContext.Provider value={{ totalProducts, setTotalProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  return useContext(ProductContext);
};

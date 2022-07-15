import { api } from "../api/api";
import { useState, useEffect } from "react";
import { Product } from "../types/product";

const MainContainer = () => {
  const [Products, setProducts] = useState<Product[]>([]);

  const handleResponse = async () => {
    const { response, error } = await api.getProducts();
    // setIsLoading(false);
    if (error) {
      //setError(error);
      //setvisibleAlert(true);
      // setIsLoading(false);
    } else {
      //setvisibleAlert(false);
      setProducts((prev) => [response, ...prev]);
    }
  };

  useEffect(() => {
    handleResponse();
  }, []);

  return <div className="maincontainer">Hola mundo</div>;
};

export { MainContainer };

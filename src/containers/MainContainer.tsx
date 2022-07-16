import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { Header } from "../components/Header";
import { Boton } from "../components/Button";
import { Tabla } from "../components/Table";
import { DotSpinner } from "@uiball/loaders";
import { useProducts } from "../hooks/useProducts";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import orderBy from "lodash/orderBy";
const numPage = 5;

const MainContainer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [ActiveRightButton, setActiveRightButton] = useState(true);
  const [ActiveLeftButton, setActiveLeftButton] = useState(true);
  const [Order, setOrder] = useState("asc");
  const { getAllProducts, Products, setProducts, IsLoading, setIsLoading } =
    useProducts();

  const filterProducts = (): Product[] => {
    return Products.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (currentPage <= Products.length - numPage * 2) {
      setCurrentPage(currentPage + numPage);
    }
  };

  const prevPage = () => {
    if (currentPage >= 5) {
      setCurrentPage(currentPage - numPage);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (currentPage < numPage) {
      setActiveLeftButton(false);
    } else {
      setActiveLeftButton(true);
    }

    if (currentPage >= 15) {
      setActiveRightButton(false);
    } else {
      setActiveRightButton(true);
    }
  }, [currentPage]);

  const HandleSort = (columnName: string) => {
    if (Order == "asc") {
      let newProductOrder = orderBy(Products, [columnName], [Order]);
      setOrder("desc");
      setProducts(newProductOrder);
    } else if (Order == "desc") {
      let newProductOrder = orderBy(Products, [columnName], [Order]);
      setOrder("asc");
      setProducts(newProductOrder);
    }
  };

  return (
    <div className="mainContainer">
      {IsLoading ? (
        <div className="container">
          <Header />
          <Box className="container-button">
            <Boton
              icon={<ArrowBackIcon />}
              text="Prev"
              onClick={prevPage}
              active={ActiveLeftButton}
            />
            <Boton
              icon={<ArrowForwardIcon />}
              text="Next"
              onClick={nextPage}
              active={ActiveRightButton}
            />
          </Box>
          <Tabla products={filterProducts()} onClick={HandleSort} />
        </div>
      ) : (
        <DotSpinner size={80} speed={0.9} color="#1e88e5" />
      )}
    </div>
  );
};

export { MainContainer };

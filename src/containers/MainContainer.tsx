import { api } from "../api/api";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { DotSpinner } from "@uiball/loaders";

const MainContainer = () => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleResponse = async () => {
    const { response, error } = await api.getProducts();
    if (error) {
      console.log(error);
    } else {
      setIsLoading(true);
      setProducts(response);
    }
  };

  const filterProducts = (): Product[] => {
    return Products.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (currentPage <= Products.length - 10) {
      setCurrentPage(currentPage + 5);
    }
  };

  const prevPage = () => {
    if (currentPage >= 5) {
      setCurrentPage(currentPage - 5);
    }
  };

  useEffect(() => {
    handleResponse();
  }, []);

  return (
    <div className="mainContainer">
      {IsLoading ? (
        <div className="container">
          <Box
            className="container-button"
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={prevPage}
            >
              Prev
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowForwardIcon />}
              onClick={nextPage}
            >
              Next
            </Button>
          </Box>
          <TableContainer sx={{}}>
            <Table sx={{ minWidth: 0 }} aria-label="simple table">
              <TableHead sx={{ width: "100%" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{ width: "50px", backgroundColor: "#2196f3" }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ width: "400px", backgroundColor: "#2196f3" }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ width: "150px", backgroundColor: "#2196f3" }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ width: "150px", backgroundColor: "#2196f3" }}
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="Table-Body">
                {filterProducts().map((product, index) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" align="center">
                      {product.id}
                    </TableCell>
                    <TableCell align="center">{product.title}</TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <DotSpinner size={80} speed={0.9} color="#1e88e5" />
      )}
    </div>
  );
};

export { MainContainer };

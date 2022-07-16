import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import { Product } from "../types/product";

const Tabla = ({ products, onClick }: IProps) => {
  return (
    <TableContainer sx={{ height: "70vh" }}>
      <Table sx={{ minWidth: 0 }} aria-label="simple table">
        <TableHead sx={{ width: "100%" }}>
          <TableRow>
            <TableCell
              align="center"
              style={{ width: "50px", backgroundColor: "#2196f3" }}
              onClick={() => onClick("id")}
            >
              <span className="TextTableHead">Id</span>
            </TableCell>
            <TableCell
              align="center"
              style={{ width: "400px", backgroundColor: "#2196f3" }}
              onClick={() => onClick("tittle")}
            >
              <span className="TextTableHead">Title</span>
            </TableCell>
            <TableCell
              align="center"
              style={{ width: "150px", backgroundColor: "#2196f3" }}
              onClick={() => onClick("category")}
            >
              <span className="TextTableHead">Category</span>
            </TableCell>
            <TableCell
              align="center"
              style={{ width: "150px", backgroundColor: "#2196f3" }}
              onClick={() => onClick("price")}
            >
              <span className="TextTableHead">Price</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="Table-Body">
          {products.map((product, index) => (
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
  );
};

type IProps = {
  onClick(columnName: string): void;
  products: Product[];
};

export { Tabla };

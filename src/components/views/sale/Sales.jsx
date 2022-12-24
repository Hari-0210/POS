import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { URLS } from "../../utilities/URLS";
import APIKit from "../../utilities/APIKIT";
import ErrorBoundaries from "../ErrorBoundaries";

function Sales(props) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  useEffect(() => {
    getProduct();
  }, []);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getProduct = async (data = "") => {
    setIsLoading(true);
    await APIKit.post(URLS.getProduct, { searchText: data }).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };
  const initialValues = {
    productCode: "",
    productName: "",
    productQty: "",
    productCost: "",
  };
  let editableKeyToFocus = useRef(null);
  const [salesProduct, setSalesProduct] = useState([{ ...initialValues }]);
  const matchProduct = (index) => {
    let item = [...salesProduct];
    console.log(item[index].productCode);
    product.map((e) => {
      if (e.productCode === item[index].productCode) {
        item[index].productName = e.productName;
        item[index].productCost = e.productCost;
      }
    });
    setSalesProduct([...item]);
  };
  const addRemProduct = (data, i) => {
    if (data === "add") {
      let item = [...salesProduct];
      item.push(initialValues);
      setSalesProduct([...item]);
    } else {
      let item = [...salesProduct];
      item.splice(i, 1);
      setSalesProduct([...item]);
    }
  };
  return (
    <Grid spacing={3} m={3}>
      <Grid item sm={11} md={11}>
        <Typography
          color='black'
          gutterBottom
          variant='h6'
          sx={{
            p: "2px 4px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}>
          Sales
        </Typography>

        <Card sx={{ borderRadius: 3, mt: 2, mr: 2, ml: 2, mb: 4 }}>
          <Box
            sx={{
              p: 4,
            }}>
            <Grid container spacing={4}>
              <Grid item md={4} sm={12}>
                <TextField
                  id='outlined-basic'
                  label='Enter Mobile Number'
                  name='mobileNo'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              <Grid item md={4} sm={12}>
                <TextField
                  id='outlined-basic'
                  label='Enter Name'
                  name='name'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              <Grid item md={4} sm={12}>
                <TextField
                  id='outlined-basic'
                  label='City'
                  name='city'
                  fullWidth
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </Box>
        </Card>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>SNo</StyledTableCell>
                <StyledTableCell align='center'>Code</StyledTableCell>
                <StyledTableCell align='center'>Product Name</StyledTableCell>
                <StyledTableCell align='center'>Quantity</StyledTableCell>
                <StyledTableCell align='center'>Rate</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesProduct.map((data, i) => {
                return (
                  <StyledTableRow
                    key={i}
                    onContextMenu={() => addRemProduct("rem", i)}>
                    <StyledTableCell component='th' scope='row'>
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <TextField
                        id='outlined-basic'
                        label='Product Code'
                        name={`productCode${i}`}
                        key={`productCode${i}`}
                        variant='outlined'
                        onChange={(e) => {
                          editableKeyToFocus.current = `productCode${i}`;
                          let item = [...salesProduct];
                          item[i].productCode = e.target.value;
                          setSalesProduct([...item]);
                        }}
                        autoFocus={
                          `productCode${i}` === editableKeyToFocus.current
                        }
                        value={data.productCode}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === "Tab") {
                            matchProduct(i);
                          }
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {data.productName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <TextField
                        id='outlined-basic'
                        label='Product Quantity'
                        name={`productQty${i}`}
                        key={`productQty${i}`}
                        variant='outlined'
                        onChange={(e) => {
                          editableKeyToFocus.current = `productQty${i}`;
                          let item = [...salesProduct];
                          item[i].productQty = e.target.value;
                          setSalesProduct([...item]);
                        }}
                        autoFocus={
                          `productQty${i}` === editableKeyToFocus.current
                        }
                        value={data.productQty}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === "Tab") {
                            addRemProduct("add", i);
                          }
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {data.productQty != ""
                        ? data.productQty * data.productCost
                        : data.productCost}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Sales;

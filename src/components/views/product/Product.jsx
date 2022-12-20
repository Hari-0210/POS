import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommonTable from "../common/CommonTable";
import { ETaction, ETTypes } from "../common/Types";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../utilities/URLS";
import APIKit from "../../utilities/APIKIT";

function Product(props) {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    getProduct();
  }, []);
  const [product, setProduct] = useState([]);
  const getProduct = async (data = "") => {
    await APIKit.post(URLS.getProduct, { searchText: data }).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.data);
      }
    });
  };
  const productColumn = [
    {
      title: "Product",
      field: "productName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Code",
      field: "productCode",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Product Category",
      field: "productCategoryName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Brand",
      field: "brandName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Price",
      field: "productCost",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Created On",
      field: "createdDate",
      align: "center",
      type: ETTypes.date,
    },
    {
      title: "Action",
      field: "action",
      align: "center",
      list: [ETaction.onView, ETaction.onDelete, ETaction.onEdit],
    },
  ];

  const createProduct = () => {
    navigate("/app/product/create_product/", { replace: true });
  };
  return (
    <Grid spacing={3} m={3}>
      <Grid item sm={11} md={11}>
        <Box
          sx={{
            p: "20px",
            display: matches && "flex",
            justifyContent: "space-between",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              width: matches ? 300 : 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Stack spacing={2} direction={matches ? "row" : "column"}>
            <Button sx={{ height: 50 }} variant="contained">
              Export Products
            </Button>
            <Button sx={{ height: 50 }} variant="contained">
              Import Products
            </Button>
            <Button
              sx={{ height: 50 }}
              onClick={createProduct}
              variant="contained"
            >
              Create Products
            </Button>
          </Stack>
        </Box>
        <CommonTable columns={productColumn} data={product} />
      </Grid>
    </Grid>
  );
}

export default Product;

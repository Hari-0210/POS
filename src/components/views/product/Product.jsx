import { Box, Grid } from "@mui/material";
import React from "react";
import CommonTable from "../common/CommonTable";
import { ETaction, ETTypes } from "../common/Types";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Product(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const productColumn = [
    {
      title: "Product",
      field: "product",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Code",
      field: "code",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Brand",
      field: "brand",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Price",
      field: "price",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Product Unit",
      field: "productUnit",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "In Stock",
      field: "inStock",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Created On",
      field: "createdTime",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Action",
      field: "action",
      align: "center",
      list: [ETaction.onView, ETaction.onDelete, ETaction.onEdit],
    },
  ];
  const productData = [
    {
      product: 1,
      code: "12",
    },
  ];
  return (
    <Grid spacing={3} m={3}>
      <Grid item sm={11} md={11}>
        <Box
        sx={{
          p: "20px",
          display: matches && "flex",
          justifyContent: "space-between",
        }}>
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
        <Stack spacing={2} direction={matches? "row" : "column"}>
        <Button sx={{height: 50}} variant="contained">Export Products</Button>
        <Button sx={{height: 50}} variant="contained">Import Products</Button>
        <Button sx={{height: 50}} variant="contained">Create Products</Button>
        </Stack>
        </Box>
        <CommonTable columns={productColumn} data={productData} />
      </Grid>
    </Grid>
  );
}

export default Product;

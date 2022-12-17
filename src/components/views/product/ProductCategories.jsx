import { Box, Grid } from "@mui/material";
import React from "react";
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

function Product(props) {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  const productCategoryColumn = [
    {
      title: "Product Category",
      field: "productCategory",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Product Count",
      field: "productCount",
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
  const productCategoryData = [
    {
      productCategory: 1,
      productCount: "12",
    },
  ];
  const createProductCategory = () => {
    navigate("/app/productCategories/create_productcategory/", {
      replace: true,
    });
  };
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
            component='form'
            sx={{
              p: "2px 4px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              width: matches ? 300 : 200,
            }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search'
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Stack spacing={2} direction={matches ? "row" : "column"}>
            <Button
              sx={{ height: 50 }}
              onClick={createProductCategory}
              variant='contained'>
              Create Product Category
            </Button>
          </Stack>
        </Box>
        <CommonTable
          columns={productCategoryColumn}
          data={productCategoryData}
        />
      </Grid>
    </Grid>
  );
}

export default Product;

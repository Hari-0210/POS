import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import CommonTable from "../common/CommonTable";
import { ETaction, ETTypes } from "../common/Types";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { URLS } from "../../utilities/URLS";
import APIKit from "../../utilities/APIKIT";
import { useSnackbar } from "notistack";
import { useConfirm } from 'material-ui-confirm';

function Product(props) {
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [payload, setPayload] = useState({
    productCategoryName: "",
  });
  const matches = useMediaQuery("(min-width:600px)");
  const [productCategoryData, setProductCategoryData] = useState([]);
  const productCategoryColumn = [
    {
      title: "Product Category ID",
      field: "productCategoryID",
      align: "center",
      type: ETTypes.numeric,
    },
    {
      title: "Product Category",
      field: "productCategoryName",
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

  useEffect(() => {
    getProductCategory();
  }, []);
  const [isEdit, setIsEdit] = useState(false);

  const actions = {
    onView: (index, row) => {},

    onEdit: (index, row) => {
      setIsEdit(true);
      setPayload({
        productCategoryName: row.productCategoryName,
        productCategoryID: row.productCategoryID,
      });
    },
    onDelete: (index, row) => {
      console.log('delete:', index, row);
      remove(row.productCategoryID, index);
    }
  };
  const remove = (data, i) => {
    confirm({ description: 'you want to delete the record ?' })
      .then(() => {
        deleteProductCategory(data)
      })
      .catch(() => console.log('Deletion cancelled.'));
  };
  var variant = "";
  const anchorOrigin = { horizontal: "right", vertical: "bottom" };
  const createProductCategory = async () => {
    await APIKit.post(URLS.addProductCategory, payload).then((res) => {
      if (res.data.status === 200) {
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        setPayload({ productCategoryName: "" });
        getProductCategory();
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };
  const updateProductCategory = async () => {
    await APIKit.put(URLS.updateProductCategory, payload).then((res) => {
      if (res.data.status === 200) {
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        setPayload({ productCategoryName: "" });
        setIsEdit(false);
        getProductCategory();
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };

  const deleteProductCategory = async (productCategoryID) => {
    await APIKit.get(URLS.deleteProductCategory + '/' +  productCategoryID).then((res) => {
      if (res.data.status === 200) {
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        getProductCategory();
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };

  const getProductCategory = async () => {
    await APIKit.get(URLS.getProductCategory, payload).then((res) => {
      if (res.data.status === 200) {
        setProductCategoryData(res.data.data);
      }
    });
  };
  return (
    <Grid spacing={3} m={3}>
      <Grid item sm={11} md={11}>
        <Box
          sx={{
            p: "0px 0px 20px",
            display: matches && "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            autoComplete="off"
            sx={{ mt: 2, width: matches ? 300 : 200 }}
            id="outlined-basic"
            label="Product Category"
            name="productCategoryName"
            value={payload.productCategoryName}
            variant="outlined"
            onChange={(e) => {
              setPayload({
                ...payload,
                productCategoryName: e.target.value.trim(),
              });
            }}
          />

          <Stack spacing={2} direction={matches ? "row" : "column"}>
            {isEdit ? (
              <>
                <Button
                  sx={{ height: 50, mt: 2 }}
                  onClick={updateProductCategory}
                  variant="contained"
                  disabled={!payload.productCategoryName}
                >
                  Update Product Category
                </Button>{" "}
                <Button
                  sx={{ height: 50, mt: 2 }}
                  onClick={() => {
                    setIsEdit(false);
                    setPayload({ productCategoryName: "" });
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>{" "}
              </>
            ) : (
              <Button
                sx={{ height: 50, mt: 2 }}
                onClick={createProductCategory}
                variant="contained"
                disabled={!payload.productCategoryName}
              >
                Add Product Category
              </Button>
            )}
          </Stack>
        </Box>
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
        <CommonTable
          columns={productCategoryColumn}
          data={productCategoryData}
          action={actions}
        />
      </Grid>
    </Grid>
  );
}

export default Product;

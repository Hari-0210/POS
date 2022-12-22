import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { MESSAGE } from "../../../utilities/constant";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import APIKit from "../../../utilities/APIKIT";
import { URLS } from "../../../utilities/URLS";

export default function CreateProduct() {
  const navigate = useNavigate();
  let regEx = {
    numbersOnly: /^[0-9]*$/,
  };
  const [brandData, setBrandData] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);

  const getBrand = async (data = "") => {
    await APIKit.post(URLS.getBrand, { searchText: data }).then((res) => {
      if (res.data.status === 200) {
        setBrandData(res.data.data);
      }
    });
  };
  const getProductCategory = async (data = "") => {
    await APIKit.post(URLS.getProductCategory, { searchText: data }).then(
      (res) => {
        if (res.data.status === 200) {
          setProductCategoryData(res.data.data);
        }
      }
    );
  };
  useEffect(() => {
    getBrand();
    getProductCategory();
  }, []);
  const [payload, setPayload] = useState({
    name: "",
    code: "",
    productCategory: "",
    brand: "",
    quantity: "",
    productCost: "",
  });

  const back = () => {
    navigate("/app/product/", { replace: true });
  };
  return (
    <div>
      <Box
        sx={{
          p: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography
          color='black'
          gutterBottom
          variant='h6'
          sx={{
            p: "2px 4px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}>
          Create Product
        </Typography>

        <Button
          sx={{
            height: 50,
          }}
          onClick={back}
          variant='contained'>
          Back
        </Button>
      </Box>
      <Card sx={{ borderRadius: 3, mt: 2, mr: 2, ml: 2 }}>
        <Box
          sx={{
            p: 4,
          }}>
          <Formik
            initialValues={{ ...payload }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(MESSAGE.name),
              code: Yup.string().required(MESSAGE.code),
              productCategory: Yup.string().required(MESSAGE.productCategory),
              brand: Yup.string().required(MESSAGE.brand),
              quantity: Yup.number().required(MESSAGE.quantity),
              productCost: Yup.number().required(MESSAGE.cost),
            })}
            onSubmit={(values) => {
              // same shape as initial values
              console.log();
            }}>
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item md={4} sm={12}>
                    <TextField
                      error={Boolean(
                        touched.name && errors.name && <div>{errors.name}</div>
                      )}
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setPayload({
                          ...payload,
                          name: e.target.value.trim(),
                        });
                      }}
                      id='outlined-basic'
                      label='Enter Name'
                      name='name'
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item md={4} sm={12}>
                    <TextField
                      error={Boolean(
                        touched.code && errors.code && <div>{errors.code}</div>
                      )}
                      helperText={touched.code && errors.code}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setPayload({
                          ...payload,
                          code: e.target.value.trim(),
                        });
                      }}
                      id='outlined-basic'
                      label='Code'
                      name='code'
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item md={4} sm={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={productCategoryData}
                      getOptionLabel={(option) => option.productCategoryName}
                      fullWidth
                      onChange={(e, value) => {
                        setPayload({
                          ...payload,
                          productCategory: value.productCategoryID,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label='Product Category' />
                      )}
                      name='productCategory'
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item md={4} sm={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={brandData}
                      getOptionLabel={(option) => option.brandName}
                      fullWidth
                      onChange={(e, value) => {
                        console.log(value);
                        setPayload({
                          ...payload,
                          brand: value.brandID,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label='Brand' />
                      )}
                      name='brand'
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item md={4} sm={12}>
                    <TextField
                      id='outlined-basic'
                      label='Quantity'
                      name='quantity'
                      value={payload.quantity}
                      fullWidth
                      variant='outlined'
                      error={Boolean(
                        touched.quantity && errors.quantity && (
                          <div>{errors.quantity}</div>
                        )
                      )}
                      helperText={touched.quantity && errors.quantity}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        if (
                          e.target.value === "" ||
                          regEx.numbersOnly.test(e.target.value)
                        ) {
                          handleChange(e);
                          setPayload({
                            ...payload,
                            quantity: e.target.value.trim(),
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item mdOffset={4} md={4} sm={12}>
                    <TextField
                      error={Boolean(
                        touched.productCost && errors.productCost && (
                          <div>{errors.productCost}</div>
                        )
                      )}
                      helperText={touched.productCost && errors.productCost}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        if (
                          e.target.value === "" ||
                          regEx.numbersOnly.test(e.target.value)
                        ) {
                          handleChange(e);
                          setPayload({
                            ...payload,
                            productCost: String(e.target.value.trim()),
                          });
                        }
                      }}
                      value={payload.productCost}
                      id='outlined-basic'
                      label='Enter Product Cost'
                      name='productCost'
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>
                  <Button
                    sx={{
                      marginLeft: "auto",
                      mt: 2,
                      width: 60,
                      height: 40,
                      borderRadius: 3,
                    }}
                    type='submit'
                    variant='contained'>
                    Save
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Card>
    </div>
  );
}

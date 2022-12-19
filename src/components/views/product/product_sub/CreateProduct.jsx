import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();

  const productCategory = [
    { label: "Fruits" },
    { label: "Shoes" },
    { label: "Jackets" },
  ];
  const productBrand = [
    { label: "Fruits" },
    { label: "Shoes" },
    { label: "Jackets" },
  ];
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
          <Grid container spacing={4}>
            <Grid item md={4} sm={12}>
              <TextField
                id='outlined-basic'
                label='Enter Name'
                name='userName'
                fullWidth
                variant='outlined'
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <TextField
                id='outlined-basic'
                label='Code'
                name='userName'
                fullWidth
                variant='outlined'
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <TextField
                id='outlined-basic'
                label='User Name'
                name='userName'
                fullWidth
                variant='outlined'
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={productCategory}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label='Product Category' />
                )}
                variant='outlined'
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={productBrand}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label='Brand' />
                )}
                variant='outlined'
              />
            </Grid>

            <Grid item mdOffset={4} md={4} sm={12}>
              <TextField
                id='outlined-basic'
                label='Enter Product Cost'
                name='userName'
                fullWidth
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

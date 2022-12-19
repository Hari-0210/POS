import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import CommonTable from "../common/CommonTable";
import { ETTypes } from "../common/Types";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Password } from "@mui/icons-material";
import APIKit from "../../utilities/APIKIT";
import { URLS } from "../../utilities/URLS";

function AddUser(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const [payload, setPayload] = useState({
    userName: "",
    password: "",
  });

  const productColumn = [
    {
      title: "User",
      field: "user",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Password",
      field: "password",
      align: "center",
      type: ETTypes.string,
    },
  ];
  const productData = [
    {
      product: 1,
      code: "12",
    },
  ];
  const adduser = async () => {
    await APIKit.post(URLS.addUser, payload).then((res) => {
      console.log(res);
      if (res.data.message === "Successfully Login") {
      }
    });
  };
  return (
    <div>
      <Grid spacing={3} m={3}>
        <Grid item sm={11} md={11}>
          <Box
            sx={{
              p: "20px",
              display: matches && "flex",
              justifyContent: "left",
            }}
            direction={matches ? "row" : "column"}>
            <TextField
              sx={{ mt: 2, width: matches ? 300 : 200 }}
              id='outlined-basic'
              label='User Name'
              name='userName'
              value={payload.userName}
              variant='outlined'
              onChange={(e) => {
                setPayload({
                  ...payload,
                  userName: e.target.value.trim(),
                });
              }}
            />

            <TextField
              sx={{ mt: 2, ml: matches ? 2 : 0, width: matches ? 300 : 200 }}
              id='outlined-password-input'
              label='Password'
              type='password'
              name='password'
              value={payload.password}
              autoComplete='current-password'
              onChange={(e) => {
                setPayload({
                  ...payload,
                  password: e.target.value.trim(),
                });
              }}
            />
            <Button
              sx={{
                height: 50,
                width: matches ? 250 : 200,
                mt: 2,
                ml: matches ? 10 : 0,
              }}
              onClick={adduser}
              type='submit'
              disabled={!(payload.userName && payload.password)}
              variant='contained'>
              Add User
            </Button>
          </Box>
          <CommonTable columns={productColumn} data={productData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddUser;

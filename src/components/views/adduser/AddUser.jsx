import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import CommonTable from "../common/CommonTable";
import { ETTypes } from "../common/Types";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import APIKit from "../../utilities/APIKIT";
import { URLS } from "../../utilities/URLS";
import { useSnackbar } from "notistack";

function AddUser(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const [payload, setPayload] = useState({
    userName: "",
    password: "",
  });
  useEffect(() => {
    getUserData()
  }, []);
  const userColumn = [
    {
      title: "User ID",
      field: "userID",
      align: "center",
      type: ETTypes.numeric,
    },
    {
      title: "User",
      field: "userName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Role ID",
      field: "roleID",
      align: "center",
      type: ETTypes.numeric,
    },
  ];

  const [userData, setUserData] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  var variant = "";
  const anchorOrigin = { horizontal: "right", vertical: "bottom" };
  const getUserData = async () => {
    await APIKit.get(URLS.getUser, payload).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        setUserData(res.data.data)
      } 
    });
  }
  const adduser = async () => {
    await APIKit.post(URLS.addUser, payload).then((res) => {
      if (res.data.message === "Successfully added") {
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        setPayload({userName: "", password: ""})
        getUserData()
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };
  return (
    <div>
      <Grid  m={3}>
        <Grid item sm={11} md={11}>
          <Box
            sx={{
              p: "20px",
              display: matches && "flex",
              justifyContent: "left",
            }}
            direction={matches ? "row" : "column"}>
            <TextField
              autoComplete='off'
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
              autoComplete='off'
              sx={{ mt: 2, ml: matches ? 2 : 0, width: matches ? 300 : 200 }}
              id='outlined-password-input'
              label='Password'
              type='password'
              name='password'
              value={payload.password}
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
          
          <CommonTable columns={userColumn} data={userData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddUser;

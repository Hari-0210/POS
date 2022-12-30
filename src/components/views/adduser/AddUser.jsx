import React, { useState, useEffect } from "react";
import Select from "react-select";

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
    storeID: "",
  });
  useEffect(() => {
    getUserData();
    getStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [storeData, setStoreData] = useState([]);
  const getStore = async (data = "") => {
    await APIKit.post(URLS.getStore, { searchText: data }).then((res) => {
      if (res.data.status === 200) {
        setStoreData(res.data.data);
      } else {
      }
    });
  };
  const [userData, setUserData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  var variant = "";
  const anchorOrigin = { horizontal: "right", vertical: "bottom" };
  const getUserData = async () => {
    await APIKit.get(URLS.getUser, payload).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        setUserData(res.data.data);
      }
    });
  };
  const adduser = async () => {
    await APIKit.post(URLS.addUser, payload).then((res) => {
      if (res.data.message === "Successfully added") {
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        setPayload({ userName: "", password: "" });
        getUserData();
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };
  return (
    <div>
      <Grid m={3}>
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
            <Grid
              item
              md={12}
              sm={12}
              sx={{ mt: 2, ml: matches ? 2 : 0, width: matches ? 300 : 200 }}>
              <Select
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                placeholder={"Search Store"}
                value={payload.storeID}
                onChange={(e) => {
                  console.log(e);
                  setPayload({
                    ...payload,
                    storeID: e.value,
                  });
                }}
                options={storeData?.map((e) => {
                  return {
                    value: e.storeID,
                    label: e.storeName,
                  };
                })}
              />
            </Grid>
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

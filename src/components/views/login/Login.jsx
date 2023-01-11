import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import { Formik } from "formik";
import { MESSAGE } from "../../utilities/constant";

import APIKit from "../../utilities/APIKIT";
import { URLS } from "../../utilities/URLS";

function Login(props) {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  const [payload, setPayload] = useState({
    userName: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  var variant = "";
  const anchorOrigin = { horizontal: "right", vertical: "bottom" };
  const loginApi = async () => {
    await APIKit.post(URLS.login, payload).then((res) => {
      if (res.data.message === "Successfully Login") {
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        sessionStorage.setItem("userData", JSON.stringify(res.data.data));
        navigate("/app/dashboard/", { replace: true });
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 6,
        }}>
        <Formik
          initialValues={{ ...payload }}
          validationSchema={Yup.object().shape({
            userName: Yup.string().required(MESSAGE.name),
            password: Yup.string()
              .max(30)
              .required(MESSAGE.password),
          })}
          onSubmit={(values) => {
            // same shape as initial values
            loginApi();
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
              <Card sx={{ maxWidth: 500, borderRadius: 5 }}>
                <Box
                  sx={{
                    p: 8,
                  }}>
                  <CardContent>
                    <Typography
                      variant='h5'
                      sx={{
                        //   fontSize: 18,
                        display: "flex",
                        justifyContent: "center",
                        //   color: "black",
                      }}
                      color='black'
                      gutterBottom>
                      Sign In
                    </Typography>
                  </CardContent>
                  <TextField
                    error={Boolean(
                      touched.userName && errors.userName && (
                        <div>{errors.userName}</div>
                      )
                    )}
                    helperText={touched.userName && errors.userName}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setPayload({
                        ...payload,
                        userName: e.target.value.trim(),
                      });
                    }}
                    sx={{ mt: 2, width: matches ? 400 : "auto" }}
                    id='outlined-basic'
                    label='User Name1'
                    name='userName'
                    variant='outlined'
                  />

                  <TextField
                    error={Boolean(
                      touched.password && errors.password && (
                        <div>{errors.password}</div>
                      )
                    )}
                    helperText={touched.password && errors.password}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setPayload({
                        ...payload,
                        password: e.target.value.trim(),
                      });
                    }}
                    sx={{ mt: 5, width: matches ? 400 : "auto" }}
                    id='outlined-password-input'
                    label='Password'
                    type='password'
                    name='password'
                    autoComplete='current-password'
                  />
                  <Button
                    sx={{
                      mt: 5,
                      width: matches ? 400 : 150,
                      height: 40,
                      borderRadius: 3,
                    }}
                    type='submit'
                    variant='contained'>
                    Login
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from "yup";
import { Formik } from "formik";
import { MESSAGE } from "../utilities/constant";

import "./login.css";

function Login(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          mt: 10,
        }}>
        <Formik
          initialValues={{ ...payload }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email(MESSAGE.email)
              .required(MESSAGE.emailRequired),
            password: Yup.string().max(255).required(MESSAGE.password),
          })}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
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
                      touched.email && errors.email && <div>{errors.email}</div>
                    )}
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setPayload({
                        ...payload,
                        email: e.target.value.trim(),
                      });
                    }}
                    sx={{ mt: 2, width: matches ? 400 : "auto" }}
                    id='outlined-basic'
                    label='Email'
                    name='email'
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

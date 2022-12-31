import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

function Pos(props) {
  const rows = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div>
      <Grid container spacing={3} p={1}>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                autoComplete='off'
                id='outlined-basic'
                label='Mobile Number'
                name='mobileNO'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoComplete='off'
                id='outlined-basic'
                label='Enter Customer Name'
                name='name'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoComplete='off'
                id='outlined-basic'
                label='Enter Customer Name'
                name='name'
                variant='outlined'
              />
            </Grid>
            <Grid item sx={12}>
              <Card sx={{ minWidth: 400 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minHeight: 150 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell> Product</TableCell>
                        <TableCell align='right'>Quantity</TableCell>
                        <TableCell align='right'>Price</TableCell>
                        <TableCell align='right'>Sub Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length ? (
                        rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}>
                            <TableCell component='th' scope='row'>
                              {row.name}
                            </TableCell>
                            <TableCell align='right'>{row.calories}</TableCell>
                            <TableCell align='right'>{row.fat}</TableCell>
                            <TableCell align='right'>{row.carbs}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow hover role='checkbox' key={1}>
                          <TableCell colSpan={4} align='center' key={2}>
                            {"No Data Found"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor='outlined-adornment-amount'>
                    Discount
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-amount'
                    endAdornment={
                      <InputAdornment position='end'>$</InputAdornment>
                    }
                    label='Discount'
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel htmlFor='outlined-adornment-amount'>
                    Packing Cost
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-amount'
                    endAdornment={
                      <InputAdornment position='end'>$</InputAdornment>
                    }
                    label='Packing Cost'
                  />
                </FormControl>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </div>
  );
}

export default Pos;

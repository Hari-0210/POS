import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Loader from "../common/CommonLoader";
import { URLS } from "../../utilities/URLS";
import APIKit from "../../utilities/APIKIT";
import { useSnackbar } from "notistack";
import Select from "react-select";
import { EEditable, ETaction, ETTypes } from "../common/Types";
import CommonTable from "../common/CommonTable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Checkbox from "@mui/material/Checkbox";

function SalesTableFormat(props) {
  const matches = useMediaQuery("(max-width:320px)");
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [selectedOption, setSelectedOption] = useState(null);
  const initialValues = {
    productCode: "",
    productName: "",
    productQty: "",
    packingCost: "",
    isDiscount: true,
  };
  const [salesData, setSalesData] = useState([]);
  const actions = {
    onView: (index, row) => {},

    onEdit: (index, row) => {},
    onDelete: (index, row) => {},
  };
  const salesColumn = [
    {
      title: "SNo",
      align: "center",
      type: ETTypes.SNo,
    },
    {
      title: "Product Code",
      field: "productCode",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Product Name",
      field: "productName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Quantity ",
      field: "productQty",
      align: "center",
      type: ETTypes.string,
      editable: EEditable.onEdit,
    },
    {
      title: "Rate",
      field: "productCost",
      align: "center",
      type: ETTypes.string,
    },

    {
      title: "Action",
      field: "action",
      align: "center",
      list: [ETaction.onEdit, ETaction.onDelete],
    },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 45,
      minHeight: 55,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused
        ? "hsla(#0000ff, 64%, 42%, 0.5)"
        : isSelected
        ? "hsla(#0000ff, 64%, 42%, 1)"
        : undefined,
      zIndex: 1,
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  useEffect(() => {
    getCustomer();
    getProduct();
  }, []);
  const [product, setProduct] = useState([]);
  const getProduct = async (data = "") => {
    setIsLoading(true);
    await APIKit.post(URLS.getProduct, { searchText: data }).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };
  const [isDis, setIsDis] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  var variant = "";
  const anchorOrigin = { horizontal: "right", vertical: "bottom" };
  let editableKeyToFocus = useRef(null);

  const [customerDetails, setCustomerDetails] = useState({
    customerID: "",
    name: "",
    mobileNo: "",
    city: "",
  });
  function matchProduct(data) {
    let item = [...salesData];
    var valueArr = salesData.map(function (item) {
      return item.productCode;
    });
    var isDuplicate = valueArr.some(e => e === data.value);
    if (isDuplicate) {
      variant = "error";
      enqueueSnackbar("This Product Already Added", { variant, anchorOrigin });
      return;
    }
    item.push(initialValues);
    product.map((e) => {
      if (e.productCode === data.value) {
        item[item.length - 1].productQty = 1;
        item[item.length - 1].productCode = e.productCode;
        item[item.length - 1].productName = e.productName;
        item[item.length - 1].productCost = e.productCost;
        setSalesData([...item]);
      }
    });
    editableKeyToFocus.current = `productQty${salesData.length}`;
  }
  const [details, setDetails] = useState({
    discount: "",
    packingCharge: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const checkCust = async (e) => {
    let item = { ...customerDetails };
    setCustomerList([...customerList])
    for (var i = 0; i < customerList.length; i++) {
      if (customerList[i].mobileNo === customerDetails.mobileNo) {
        item.customerID = customerList[i].customerID;
        item.name = customerList[i].name;
        item.city = customerList[i].city;
        setIsDis(true);
        setCustomerDetails({
          ...item,
        });
        break;
      } else {
        setIsDis(false);
        item.customerID = "";
        item.name = "";
        item.city = "";
        setCustomerDetails({
          ...item,
        });
      }
    }
    // setCustomerDetails({...customerDetails})
    if (item.name === "") {
      variant = "error";
      enqueueSnackbar("Customer details not present", {
        variant,
        anchorOrigin,
      });
      return;
    }
  };
  const createCustomer = async () => {
    const pay = { ...customerDetails };
    delete pay.customerID;
    if (pay.name === "" || pay.city === "") {
      variant = "error";
      enqueueSnackbar("Name and City is Mandatory", { variant, anchorOrigin });
      return;
    }
    await APIKit.post(URLS.addCustomer, pay).then((res) => {
      if (res.data.status === 200) {
        setIsDis(true);
        getCustomer();
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        let item = { ...customerDetails };
        for (var i = 0; i < customerList.length; i++) {
          if (customerList[i].mobileNo === customerDetails.mobileNo) {
            item.customerID = customerList[i].customerID;
            item.name = customerList[i].name;
            item.city = customerList[i].city;
            setCustomerDetails({
              ...item,
            });
            break;
          }
        }
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };

  const getCustomer = async (data = "") => {
    setIsLoading(true);
    await APIKit.get(URLS.getCustomer).then((res) => {
      if (res.data.status === 200) {
        setCustomerList([...res.data.data]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <Grid spacing={3} m={!matches && 3}>
      <Loader isLoading={isLoading} />
      <Grid item sm={12} md={12}>
        <Typography
          color='black'
          gutterBottom
          variant='h6'
          sx={{
            marginBottom: "10px",
            marginLeft: "20px",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            width: 200,
          }}>
          Estimate
        </Typography>

        <Card sx={{ borderRadius: 3, mt: 2, mr: 2, ml: 2, mb: 4 }}>
          <Box
            sx={{
              p: 4,
            }}>
            <Grid container spacing={4}>
              <Grid item md={4} sm={12}>
                <TextField
                  id='outlined-basic'
                  label='Enter Customer Mobile Number'
                  name='mobileNo'
                  onChange={(e) => {
                    editableKeyToFocus.current = `mobileNo`;
                    setCustomerDetails({
                      ...customerDetails,
                      mobileNo: e.target.value.trim(),
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      checkCust();
                    }
                  }}
                  value={customerDetails.mobileNo}
                  fullWidth
                  variant='outlined'
                />
              </Grid>
              <Grid item md={4} sm={12}>
                <TextField
                  id='outlined-basic'
                  label='Enter Customer Name'
                  disabled={isDis}
                  name='name'
                  onChange={(e) => {
                    setCustomerDetails({
                      ...customerDetails,
                      name: e.target.value,
                    });
                  }}
                  fullWidth
                  value={customerDetails.name}
                  variant='outlined'
                />
              </Grid>
              <Grid item md={4} sm={12}>
                <TextField
                  id='outlined-basic'
                  label='Customer City'
                  name='city'
                  disabled={isDis}
                  onChange={(e) => {
                    setCustomerDetails({
                      ...customerDetails,
                      city: e.target.value,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createCustomer();
                    }
                  }}
                  fullWidth
                  value={customerDetails.city}
                  variant='outlined'
                />
              </Grid>

              <Grid item md={12} sm={12} sx={{ overflow: "auto" }}>
                <TableContainer component={Paper} sx={{ mt: 3 }} id='printme'>
                  <Table sx={{ minWidth: 300 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell padding='checkbox'></StyledTableCell>
                        <StyledTableCell align='center'>SNo</StyledTableCell>
                        <StyledTableCell align='center'>
                          Product Name (Code)
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          Quantity
                        </StyledTableCell>
                        <StyledTableCell align='center'>Rate Per Unit</StyledTableCell>
                        <StyledTableCell align='center'>Rate</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {salesData.map((data, i) => {
                        return (
                          <StyledTableRow>
                            <StyledTableCell padding='checkbox'>
                              <Checkbox
                                color='primary'
                                checked={data.isDiscount}
                                onChange={() => {
                                  let item = [...salesData];
                                  item[i].isDiscount = !item[i].isDiscount;
                                  setSalesData([...item]);
                                }}
                                inputProps={{
                                  "aria-label": "select all desserts",
                                }}
                              />
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {i + 1}
                            </StyledTableCell>

                            <StyledTableCell align='center'>
                              {data.productName} ({data.productCode})
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {/* <Fab
                              size="small"
                              color="secondary"
                              aria-label="add"
                            >
                              <RemoveIcon />
                            </Fab>
                          
                          <TextField
                           style = {{width: 50}} 
                           id="input-with-sx" variant="standard" />
                            <Fab
                              size="small"
                              color="secondary"
                              aria-label="add"
                            >
                              <AddIcon />
                            </Fab> */}
                              <FormGroup
                                sx={{ whiteSpace: "nowrap", display: "unset" }}>
                                <Button
                                  disabled={data.productQty <= 1}
                                  variant='text'
                                  sx={{ mt: 1 }}
                                  onClick={() => {
                                    editableKeyToFocus.current = `productQty${i}`;
                                    let item = [...salesData];
                                    item[i].productQty =
                                      Number(item[i].productQty) - 1;
                                    setSalesData([...item]);
                                  }}>
                                  <RemoveIcon />
                                </Button>
                                <TextField
                                  variant='outlined'
                                  style={{ width: 70 }}
                                  name={`productQty${i}`}
                                  value={data.productQty}
                                  onChange={(e) => {
                                    editableKeyToFocus.current = `productQty${i}`;
                                    let item = [...salesData];
                                    item[i].productQty = Number(e.target.value);
                                    setSalesData([...item]);
                                  }}
                                  autoFocus={
                                    `productQty${i}` ===
                                    editableKeyToFocus.current
                                  }
                                />
                                <Button
                                  variant='text'
                                  onClick={() => {
                                    editableKeyToFocus.current = `productQty${i}`;
                                    let item = [...salesData];
                                    item[i].productQty =
                                      Number(item[i].productQty) + 1;
                                    setSalesData([...item]);
                                  }}>
                                  <AddIcon />
                                </Button>
                              </FormGroup>
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                            <TextField
                                  variant='outlined'
                                  style={{ width: 70 }}
                                  name={`productCost${i}`}
                                  value={data.productCost}
                                  onChange={(e) => {
                                    editableKeyToFocus.current = `productCost${i}`;
                                    let item = [...salesData];
                                    item[i].productCost = Number(e.target.value);
                                    setSalesData([...item]);
                                  }}
                                  autoFocus={
                                    `productCost${i}` ===
                                    editableKeyToFocus.current
                                  }
                                />
                             
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                            {data.productQty !== ""
                                  ? data.productQty * data.productCost
                                  : data.productCost}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item md={4} sm={12}>
                <Select
                  styles={customStyles}
                  menuPortalTarget={document.body}
                  menuPosition={"fixed"}
                  placeholder={"Search Material"}
                  onChange={(e) => {
                    matchProduct(e);
                  }}
                  options={product?.map((e) => {
                    return {
                      value: e.productCode,
                      label: e.productName + " (" + e.productCode + ")",
                    };
                  })}
                />
              </Grid>

              <Grid
                item
                md={4}
                sm={12}
                sx={{ overflow: "auto", marginLeft: "auto" }}>
                <TableContainer component={Paper} sx={{ mt: 2 }} id='printme'>
                  <Table aria-label='customized table'>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={4} align='right'>
                          Subtotal
                        </TableCell>
                        <TableCell align='center'>
                          {salesData.reduce(
                            (a, b) =>
                              Number(b.productCost) * Number(b.productQty) + a,
                            0
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} align='right'>
                          Discount
                        </TableCell>
                        <TableCell align='center'>
                          <FormControl variant='standard'>
                            <InputLabel htmlFor='standard-adornment-amount'>
                              Percentage
                            </InputLabel>
                            <Input
                              id='standard-adornment-amount'
                              startAdornment={
                                <InputAdornment position='start'>
                                  %
                                </InputAdornment>
                              }
                              name={`discount`}
                              autoFocus={
                                `discount` === editableKeyToFocus.current
                              }
                              onChange={(e) => {
                                editableKeyToFocus.current = `discount`;
                                setDetails({
                                  ...details,
                                  discount: e.target.value,
                                });
                              }}
                              value={details.discount}
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} align='right'>
                          Packing Charge
                        </TableCell>
                        <TableCell align='center'>
                          <FormControl variant='standard'>
                            <InputLabel htmlFor='standard-adornment-amount'>
                              Amount
                            </InputLabel>
                            <Input
                              id='standard-adornment-amount'
                              name={`packingCharge`}
                              autoFocus={
                                `packingCharge` === editableKeyToFocus.current
                              }
                              onChange={(e) => {
                                editableKeyToFocus.current = `packingCharge`;
                                setDetails({
                                  ...details,
                                  packingCharge: e.target.value,
                                });
                              }}
                              value={details.packingCharge}
                              startAdornment={
                                <InputAdornment position='start'>
                                  Rs
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} align='right'>
                          Total
                        </TableCell>
                        <TableCell align='center'>
                          {salesData.reduce(
                            (a, b) =>
                              Number(b.productCost) * Number(b.productQty) + a,
                            0
                          ) -
                            salesData
                              .filter((e) => e.isDiscount)
                              .reduce(
                                (a, b) =>
                                  Number(b.productCost) * Number(b.productQty) +
                                  a,
                                0
                              ) *
                              (Number(details.discount) / 100) +
                            Number(details.packingCharge)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SalesTableFormat;

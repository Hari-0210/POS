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
import ButtonGroup from "@mui/material/ButtonGroup";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { MESSAGE } from "../../utilities/constant";
import DeleteIcon from "@mui/icons-material/Delete";

function SalesNew() {
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
  const saveSales = async () => {
    const pay = {
      customerID: customerDetails.customerID,
      totalNoofProducts: Number(salesData.length),
      subTotal: String(
        salesData.reduce(
          (a, b) => Number(b.productCost) * Number(b.productQty) + a,
          0
        )
      ),
      discount: Number(details.discount),
      packingCost: Number(details.packingCharge),
      total: String(
        salesData.reduce(
          (a, b) => Number(b.productCost) * Number(b.productQty) + a,
          0
        ) -
          salesData
            .filter((e) => e.isDiscount)
            .reduce(
              (a, b) => Number(b.productCost) * Number(b.productQty) + a,
              0
            ) *
            (Number(details.discount) / 100) +
          Number(details.packingCharge)
      ),
      products: salesData.map((e) => {
        return {
          productID: Number(e.productID),
          productQty: Number(e.productQty),
        };
      }),
    };
    if (pay.customerID === "") {
      variant = "error";
      enqueueSnackbar(MESSAGE.custDetails, { variant, anchorOrigin });
      return;
    }
    if (!salesData.length) {
      variant = "error";
      enqueueSnackbar(MESSAGE.noProducts, { variant, anchorOrigin });
      return;
    }
    await APIKit.post(URLS.addSales, pay).then((res) => {
      if (res.data.status === 200) {
        setSalesData([]);
        setDetails({
          discount: "",
          packingCharge: "",
        });
        setCustomerDetails({
          customerID: "",
          name: "",
          mobileNo: "",
          city: "",
        });
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
      }
    });
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const initialValues = {
    productCode: "",
    productName: "",
    productQty: "",
    productCost: "",
    productID: "",
    isDiscount: true,
  };
  const [salesData, setSalesData] = useState([{ ...initialValues }]);
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
  function matchProduct(index) {
    let item = [...salesData];
    var valueArr = salesData.map(function (item) {
      return item.productCode;
    });
    var isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) !== idx;
    });
    if (isDuplicate) {
      editableKeyToFocus.current = `productQty${valueArr.indexOf(
        salesData[index].productCode
      )}`;
      salesData[index] = initialValues;
      setSalesData([...salesData]);
      variant = "error";
      enqueueSnackbar("This Product Already Added", { variant, anchorOrigin });
      return;
    }
    for (var i = 0; i < product.length; i++) {
      if (product[i].productCode === item[index].productCode) {
        item[index].productName = product[i].productName;
        item[index].productCost = product[i].productCost;
        item[index].productID = product[i].productID;
        item[index].isDis = true;
        setSalesData([...item]);
        editableKeyToFocus.current = `productQty${index}`;
        break;
      } else {
        item[index].productName = "";
        item[index].productCost = "";
        item[index].productID = "";
        item[index].isDis = false;
        setSalesData([...item]);
      }
    }
    if (item[index].productCode === "") {
      editableKeyToFocus.current = `productCode${index}`;
      setSalesData([...salesData]);
      variant = "error";
      enqueueSnackbar("Enter Product Code", { variant, anchorOrigin });
      return;
    }
    if (item[index].productName === "") {
      variant = "error";
      enqueueSnackbar("Invalid Product Code", { variant, anchorOrigin });
      return;
    }
  }
  const [details, setDetails] = useState({
    discount: "",
    packingCharge: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const checkCust = async (e) => {
    let item = { ...customerDetails };
    setCustomerList([...customerList]);
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
  useEffect(() => {
    let item = { ...customerDetails };
    for (var i = 0; i < customerList.length; i++) {
      if (customerList[i].mobileNo === customerDetails.mobileNo) {
        item.customerID = customerList[i].customerID;
        item.name = customerList[i].name;
        item.city = customerList[i].city;
        setCustomerDetails({
          ...item,
        });
      }
    }
  }, [customerList]);
  const createCustomer = async () => {
    const pay = { ...customerDetails };
    delete pay.customerID;
    if (pay.name === "" || pay.city === "" || pay.mobileNo === "") {
      variant = "error";
      enqueueSnackbar("Mobile, Name and City is Mandatory", {
        variant,
        anchorOrigin,
      });
      return;
    }
    await APIKit.post(URLS.addCustomer, pay).then((res) => {
      if (res.data.status === 200) {
        setIsDis(true);
        getCustomer();
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
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

  let regEx = {
    numbersOnly: /^[0-9]*$/,
  };
  const addRemProduct = async (data, i) => {
    if (data === "add") {
      if (salesData[i].productQty === 0 || salesData[i].productQty === "") {
        editableKeyToFocus.current = `productQty${i}`;
        setSalesData([...salesData]);
        variant = "error";
        enqueueSnackbar("Please give atleast 1 Qty", { variant, anchorOrigin });
        return;
      }
      if (salesData[i].productCost === 0 || salesData[i].productCost === "") {
        editableKeyToFocus.current = `productCost${i}`;
        setSalesData([...salesData]);
        variant = "error";
        enqueueSnackbar("Give Valid Amount", { variant, anchorOrigin });
        return;
      }
      if (salesData.length === i + 1) {
        let item = [...salesData];
        item.push(initialValues);
        setSalesData([...item]);
        editableKeyToFocus.current = `productCode${i + 1}`;
      } else {
        setSalesData([...salesData]);
        editableKeyToFocus.current = `productCode${i + 1}`;
      }
    } else {
      if (salesData.length > 1) {
        let item = [...salesData];
        item.splice(i, 1);
        setSalesData([...item]);
      }
    }
  };

  return (
    <>
      <Grid spacing={3}>
        <Grid item sm={12} md={12}>
          <Card sx={{ borderRadius: 3, mt: 2, mr: 2, ml: 2, mb: 4 }}>
            <Box
              sx={{
                p: 4,
              }}
            >
              <Grid container spacing={4}>
                <Grid item md={4} sm={12}>
                  <TextField
                    id="outlined-basic"
                    label="Enter Customer Mobile Number"
                    name="mobileNo"
                    onChange={(e) => {
                      if (
                        e.target.value === "" ||
                        regEx.numbersOnly.test(e.target.value)
                      ) {
                        editableKeyToFocus.current = `mobileNo`;
                        setCustomerDetails({
                          ...customerDetails,
                          mobileNo: e.target.value.trim(),
                        });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkCust();
                      }
                    }}
                    value={customerDetails.mobileNo}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={12}>
                  <TextField
                    id="outlined-basic"
                    label="Enter Customer Name"
                    disabled={isDis}
                    name="name"
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        name: e.target.value,
                      });
                    }}
                    fullWidth
                    value={customerDetails.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} sm={12}>
                  <TextField
                    id="outlined-basic"
                    label="Customer City"
                    name="city"
                    disabled={isDis}
                    onChange={(e) => {
                      setCustomerDetails({
                        ...customerDetails,
                        city: e.target.value,
                      });
                    }}
                    onBlur={createCustomer}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        createCustomer();
                      }
                    }}
                    fullWidth
                    value={customerDetails.city}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={12} sm={12} sx={{ overflow: "auto" }}>
                  <TableContainer component={Paper} sx={{ mt: 3 }} id="printme">
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell padding="checkbox"></StyledTableCell>
                          <StyledTableCell align="center">SNo</StyledTableCell>
                          <StyledTableCell align="center">
                            Product Code
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Product Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Quantity
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Rate Per Unit
                          </StyledTableCell>
                          <StyledTableCell align="center">Rate</StyledTableCell>
                          <StyledTableCell align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salesData.map((data, i) => {
                          return (
                            <StyledTableRow
                              key={i}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                addRemProduct("rem", i);
                              }}
                            >
                              <StyledTableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
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
                              <StyledTableCell align="center">
                                {i + 1}
                              </StyledTableCell>

                              <StyledTableCell align="center">
                                <TextField
                                  id="outlined-basic"
                                  label="Product Code"
                                  name={`productCode${i}`}
                                  variant="outlined"
                                  onBlur={() => {
                                    matchProduct(i)
                                  }}
                                  onChange={(e) => {
                                    editableKeyToFocus.current = `productCode${i}`;
                                    let item = [...salesData];
                                    item[i].productCode = e.target.value;
                                    setSalesData([...item]);
                                  }}
                                  autoFocus={
                                    `productCode${i}` ===
                                    editableKeyToFocus.current
                                  }
                                  value={data.productCode}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      console.log("match", e.key);
                                      matchProduct(i);
                                    }
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {data.productName}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <FormGroup
                                  sx={{
                                    whiteSpace: "nowrap",
                                    display: "unset",
                                  }}
                                >
                                  <Button
                                    disabled={data.productQty <= 1}
                                    variant="text"
                                    sx={{ mt: 1 }}
                                    onClick={() => {
                                      editableKeyToFocus.current = `productQty${i}`;
                                      let item = [...salesData];
                                      item[i].productQty =
                                        Number(item[i].productQty) - 1;
                                      setSalesData([...item]);
                                    }}
                                  >
                                    <RemoveIcon />
                                  </Button>
                                  <TextField
                                    variant="outlined"
                                    style={{ width: 70 }}
                                    name={`productQty${i}`}
                                    value={data.productQty}
                                    onBlur={() => {
                                      if (
                                        data.productQty === 0 ||
                                        data.productQty === ""
                                      ) {
                                        let item = [...salesData];
                                        data.productQty === 0 ||
                                        data.productQty === ""
                                          ? (item[i].productQty = Number(1))
                                          : (item[i].productQty = Number(
                                              data.productQty
                                            ));
                                        setSalesData([...item]);
                                      }
                                    }}
                                    onChange={(e) => {
                                      if (
                                        e.target.value === "" ||
                                        regEx.numbersOnly.test(e.target.value)
                                      ) {
                                        editableKeyToFocus.current = `productQty${i}`;
                                        let item = [...salesData];
                                        item[i].productQty = Number(
                                          e.target.value
                                        );
                                        setSalesData([...item]);
                                      }
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        console.log("add", e);
                                        addRemProduct("add", i);
                                      }
                                    }}
                                    autoFocus={
                                      `productQty${i}` ===
                                      editableKeyToFocus.current
                                    }
                                  />
                                  <Button
                                    variant="text"
                                    onClick={() => {
                                      editableKeyToFocus.current = `productQty${i}`;
                                      let item = [...salesData];
                                      item[i].productQty =
                                        Number(item[i].productQty) + 1;
                                      setSalesData([...item]);
                                    }}
                                  >
                                    <AddIcon />
                                  </Button>
                                </FormGroup>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <TextField
                                  variant="outlined"
                                  style={{ width: 70 }}
                                  name={`productCost${i}`}
                                  value={data.productCost}
                                  onBlur={() => {
                                    if (
                                      data.productCost === 0 ||
                                      data.productCost === ""
                                    ) {
                                      let item = [...salesData];
                                      data.productCost === 0 ||
                                      data.productCost === ""
                                        ? (item[i].productCost = Number(1))
                                        : (item[i].productCost = Number(
                                            data.productCost
                                          ));
                                      setSalesData([...item]);
                                    }
                                  }}
                                  onChange={(e) => {
                                    if (
                                      e.target.value === "" ||
                                      regEx.numbersOnly.test(e.target.value)
                                    ) {
                                      editableKeyToFocus.current = `productCost${i}`;
                                      let item = [...salesData];
                                      item[i].productCost = Number(
                                        e.target.value
                                      );
                                      setSalesData([...item]);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      console.log("add", e);
                                      addRemProduct("add", i);
                                    }
                                  }}
                                  autoFocus={
                                    `productCost${i}` ===
                                    editableKeyToFocus.current
                                  }
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {data.productQty !== ""
                                  ? data.productQty * data.productCost
                                  : data.productCost}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {salesData.length !== 1 && (
                                  <DeleteIcon
                                    onClick={() => {
                                      addRemProduct("rem", i);
                                    }}
                                  />
                                )}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid
                  item
                  md={4}
                  sm={12}
                  sx={{ overflow: "auto", marginLeft: "auto" }}
                >
                  <TableContainer component={Paper} sx={{ mt: 2 }} id="printme">
                    <Table aria-label="customized table">
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4} align="right">
                            Subtotal
                          </TableCell>
                          <TableCell align="center">
                            {salesData.reduce(
                              (a, b) =>
                                Number(b.productCost) * Number(b.productQty) +
                                a,
                              0
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} align="right">
                            Discount
                          </TableCell>
                          <TableCell align="center">
                            <FormControl variant="standard">
                              <InputLabel htmlFor="standard-adornment-amount">
                                Percentage
                              </InputLabel>
                              <Input
                                id="standard-adornment-amount"
                                startAdornment={
                                  <InputAdornment position="start">
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
                          <TableCell colSpan={4} align="right">
                            Packing Charge
                          </TableCell>
                          <TableCell align="center">
                            <FormControl variant="standard">
                              <InputLabel htmlFor="standard-adornment-amount">
                                Amount
                              </InputLabel>
                              <Input
                                id="standard-adornment-amount"
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
                                  <InputAdornment position="start">
                                    Rs
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} align="right">
                            Total
                          </TableCell>
                          <TableCell align="center">
                            {salesData.reduce(
                              (a, b) =>
                                Number(b.productCost) * Number(b.productQty) +
                                a,
                              0
                            ) -
                              salesData
                                .filter((e) => e.isDiscount)
                                .reduce(
                                  (a, b) =>
                                    Number(b.productCost) *
                                      Number(b.productQty) +
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      "& > *": {
                        m: 2,
                      },
                    }}
                  >
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Button onClick={saveSales}>Save</Button>
                      <Button>View</Button>
                      <Button>Print</Button>
                    </ButtonGroup>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default SalesNew;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import Select from "react-select";
import { URLS } from "../../utilities/URLS";
import APIKit from "../../utilities/APIKIT";
import { useSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./pos.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { MESSAGE } from "../../utilities/constant";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
function Pos(props) {
  const { enqueueSnackbar } = useSnackbar();
  var variant = "";
  const anchorOrigin = { horizontal: "right", vertical: "bottom" };
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
  const rows = [];
  const [product, setProduct] = useState([]);
  const [productCard, setProductCard] = useState([]);
  const getProduct = async (data = "") => {
    await APIKit.post(URLS.getProduct, { searchText: data }).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.data);
        setProductCard(res.data.data);
      } else {
      }
    });
  };
  const [customerList, setCustomerList] = useState([]);
  const getCustomer = async (data = "") => {
    await APIKit.get(URLS.getCustomer).then((res) => {
      if (res.data.status === 200) {
        setCustomerList([...res.data.data]);
      } else {
      }
    });
  };
  const getProductByCategory = async (data) => {
    await APIKit.get(URLS.getProductByCategory + "/" + data).then((res) => {
      if (res.data.status === 200) {
        setProductCard(res.data.data);
      } else {
      }
    });
  };
  const [productCategoryData, setProductCategoryData] = useState([]);
  const getProductCategory = async (data = "") => {
    await APIKit.post(URLS.getProductCategory, { searchText: data }).then(
      (res) => {
        if (res.data.status === 200) {
          setProductCategoryData(res.data.data);
        } else {
        }
      }
    );
  };
  useEffect(() => {
    getProduct();
    getProductCategory();
    getCustomer();
  }, []);
  const [details, setDetails] = useState({
    discount: "",
    packingCharge: "",
  });
  const initialValues = {
    productCode: "",
    productName: "",
    productQty: "",
    packingCost: "",
    productID: "",
    isDiscount: true,
  };
  const [salesData, setSalesData] = useState([]);
  function matchProduct(data) {
    console.log(data);
    let item = [...salesData];
    var valueArr = salesData.map(function (item) {
      return item.productID;
    });
    var isDuplicate = valueArr.some((e) => e === data.value);
    if (isDuplicate) {
      variant = "error";
      enqueueSnackbar("This Product Already Added", { variant, anchorOrigin });
      return;
    }
    item.push(initialValues);
    product.map((e) => {
      if (e.productID === data.value) {
        item[item.length - 1].productQty = 1;
        item[item.length - 1].productCode = e.productCode;
        item[item.length - 1].productName = e.productName;
        item[item.length - 1].productCost = e.productCost;
        item[item.length - 1].productID = e.productID;
        setSalesData([...item]);
      }
    });
  }
  function matchProductCard(data) {
    console.log(data);
    let item = [...salesData];
    var valueArr = salesData.map(function (item) {
      return item.productID;
    });
    var isDuplicate = valueArr.some((e) => e === data.productID);
    if (isDuplicate) {
      variant = "error";
      enqueueSnackbar("This Product Already Added", { variant, anchorOrigin });
      return;
    }
    item.push(initialValues);
    product.map((e) => {
      if (e.productID === data.productID) {
        item[item.length - 1].productQty = 1;
        item[item.length - 1].productCode = e.productCode;
        item[item.length - 1].productName = e.productName;
        item[item.length - 1].productCost = e.productCost;
        item[item.length - 1].productID = e.productID;
        setSalesData([...item]);
      }
    });
  }

  var userData = JSON.parse(sessionStorage.getItem("userData"));
  const matches = useMediaQuery("(min-width:600px)");
  const [customerDetails, setCustomerDetails] = useState({
    customerID: "",
    name: "",
    mobileNo: "",
    city: "",
  });
  const [isDis, setIsDis] = useState(false);
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
      enqueueSnackbar("Mobile, Name and City is Mandatory", { variant, anchorOrigin });
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
    console.log(pay);
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

  // for fullscreen
  var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
  return (
    <div id="pos">
      <Grid container spacing={3} p={1}>
        <Grid item sm={12} md={4}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={4}>
              <TextField
                autoComplete="off"
                id="outlined-basic"
                label="Mobile Number"
                name="mobileNO"
                variant="outlined"
                onChange={(e) => {
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
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <TextField
                autoComplete="off"
                id="outlined-basic"
                label="Enter Customer Name"
                name="name"
                variant="outlined"
                onChange={(e) => {
                  setCustomerDetails({
                    ...customerDetails,
                    name: e.target.value,
                  });
                }}
                value={customerDetails.name}
                disabled={isDis}
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <TextField
                autoComplete="off"
                id="outlined-basic"
                label="City"
                name="city"
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
                onBlur={createCustomer}
                value={customerDetails.city}
                variant="outlined"
                disabled={isDis}
              />
            </Grid>
            <Grid item sm={12} xs={12} sx={{ overflow: "hidden" }}>
              <Card sx={{ minHeight: 535 }}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer
                    sx={{ maxHeight: 320, ...(!matches && { maxWidth: 300 }) }}
                    component={Paper}
                  >
                    <Table stickyHeader aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="center"> Product</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Sub Total</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salesData.length ? (
                          salesData.map((row, i) => (
                            <TableRow
                              key={row.productID}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                <Checkbox
                                  color="primary"
                                  checked={row.isDiscount}
                                  onChange={() => {
                                    let item = [...salesData];
                                    item[i].isDiscount = !item[i].isDiscount;
                                    setSalesData([...item]);
                                  }}
                                  inputProps={{
                                    "aria-label": "select all desserts",
                                  }}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.productName}
                              </TableCell>
                              <TableCell align="center">
                                <FormGroup
                                  sx={{
                                    whiteSpace: "nowrap",
                                    display: "unset",
                                  }}
                                >
                                  <Button
                                    disabled={row.productQty <= 1}
                                    variant="text"
                                    sx={{ mt: 1, minWidth: "10px" }}
                                    onClick={() => {
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
                                    style={{ width: 50, height: "1px" }}
                                    name={`productQty${i}`}
                                    onBlur={() => {
                                      let item = [...salesData];
                                      row.productQty === 0
                                        ? (item[i].productQty = Number(1))
                                        : (item[i].productQty = Number(
                                            row.productQty
                                          ));
                                      setSalesData([...item]);
                                    }}
                                    value={row.productQty}
                                    onChange={(e) => {
                                      let item = [...salesData];
                                      item[i].productQty = Number(
                                        e.target.value
                                      );
                                      setSalesData([...item]);
                                    }}
                                    // autoFocus={
                                    //   `productQty${i}` ===
                                    //   editableKeyToFocus.current
                                    // }
                                  />
                                  <Button
                                    variant="text"
                                    sx={{ mt: 1, minWidth: "10px" }}
                                    onClick={() => {
                                      let item = [...salesData];
                                      item[i].productQty =
                                        Number(item[i].productQty) + 1;
                                      setSalesData([...item]);
                                    }}
                                  >
                                    <AddIcon />
                                  </Button>
                                </FormGroup>
                              </TableCell>
                              <TableCell align="center">
                                {row.productCost}
                              </TableCell>
                              <TableCell align="center">
                                {Number(row.productCost) *
                                  Number(row.productQty)}
                              </TableCell>
                              <TableCell align="center">
                                <DeleteIcon
                                  onClick={() => {
                                    let item = [...salesData];
                                    item.splice(i, 1);
                                    setSalesData([...item]);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow hover role="checkbox" key={1}>
                            <TableCell colSpan={6} align="center" key={2}>
                              {"No Data Found"}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Box sx={{ backgroundColor: "aliceblue", p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                      <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Discount
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          endAdornment={
                            <InputAdornment position="end">%</InputAdornment>
                          }
                          label="Discount"
                          value={details.discount}
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              discount: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                      <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Packing Cost
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          endAdornment={
                            <InputAdornment position="end">Rs</InputAdornment>
                          }
                          value={details.packingCharge}
                          label="Packing Cost"
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              packingCharge: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <Box>
                        <Typography>
                          Total Qty:{" "}
                          {salesData.reduce(
                            (a, b) => Number(b.productQty) + a,
                            0
                          )}
                        </Typography>
                        <Typography>
                          Sub Total:{" "}
                          {salesData.reduce(
                            (a, b) =>
                              Number(b.productCost) * Number(b.productQty) + a,
                            0
                          )}
                        </Typography>
                        <Typography>
                          Total:{" "}
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
                            Number(details.packingCharge)}{" "}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
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
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={8} sx={{ overflow: "hidden" }}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={11}>
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
                    value: e.productID,
                    label: e.productName + " (" + e.productCode + ")",
                  };
                })}
              />
            </Grid>
            <Grid item sm={12} md={1}>
            < FullscreenIcon fontSize="large" onClick={openFullscreen}/>
            </Grid>
            <Grid item sm={12} md={12}>
              <Card sx={{ minHeight: 535, backgroundColor: "aliceblue" }}>
                <Grid container spacing={2} p={1}>
                  <Grid item sm={12} md={12}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 4,
                        backgroundColor: "lavender",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item sm={6} md={1.5}>
                          <Chip
                            color="primary"
                            onClick={() => getProduct()}
                            label={"All Products"}
                          />
                        </Grid>
                        {productCategoryData.map((e, index) => {
                          return (
                            <Grid item sm={6} md={1.5}>
                              <Tooltip
                                title={
                                  userData.storeID === 0
                                    ? e.productCategoryName +
                                      "(" +
                                      e.storeName +
                                      ")"
                                    : e.productCategoryName
                                }
                              >
                                <Chip
                                  color={e.active ? "primary" : "secondary"}
                                  sx={{ whiteSpace: "nowrap" }}
                                  onClick={() => {
                                    let items = [...productCategoryData];
                                    for (let i = 0; i < items.length; i++) {
                                      items[i].active = false;
                                    }
                                    items[index].active = true;

                                    setProductCategoryData([...items]);
                                    getProductByCategory(e.productCategoryID);
                                  }}
                                  label={
                                    userData.storeID === 0
                                      ? e.productCategoryName +
                                        "(" +
                                        e.storeName +
                                        ")"
                                      : e.productCategoryName
                                  }
                                />
                              </Tooltip>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={12}>
                    <Grid container spacing={2} m={1}>
                      {productCard.map((e) => {
                        return (
                          <Grid item sm={12} md={3}>
                            <Card
                              onClick={() => {
                                matchProductCard(e);
                              }}
                              className="cardPorducts"
                              sx={{ border: 1, width: 200, cursor: "pointer" }}
                            >
                              <CardContent>
                                {userData.storeID === 0 ? (
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                  >
                                    {e.storeName}
                                  </Typography>
                                ) : (
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                  >
                                    {e.productCategoryName}
                                  </Typography>
                                )}

                                <Typography variant="h5" component="div">
                                  {e.productName}
                                </Typography>
                                <Typography
                                  sx={{ mb: 1.5 }}
                                  color="text.secondary"
                                >
                                  Cost: {e.productCost}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Pos;

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

function SalesTableFormat(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const initialValues = {
    productCode: "",
    productName: "",
    productQty: "",
    packingCost: "",
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
    console.log(data);
    let item = [...salesData];
    item.push(initialValues);
    product.map((e) => {
      if (e.productCode === data.value) {
        item[item.length - 1].productCost = e.productCost;
        item[item.length - 1].productCode = e.productCode;
        item[item.length - 1].productName = e.productName;
        item[item.length - 1].productCost = e.productCost;
        setSalesData([...item]);
      }
    });
  }
  const [isLoading, setIsLoading] = useState(false);
  const checkCust = async (e) => {
    let item = { ...customerDetails };
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
        variant = "success";
        setIsDis(true);
        getCustomer();
        checkCust();
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
        setCustomerList(res.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <Grid spacing={3} m={3}>
      <Loader isLoading={isLoading} />
      <Grid item sm={11} md={11}>
        <Typography
          color='black'
          gutterBottom
          variant='h6'
          sx={{
            p: "2px 4px",
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
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Box>
        <Grid container spacing={4}>
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
                  label: e.productName,
                };
              })}
            />
          </Grid>
          <Grid item md={12} sm={12}>
            <CommonTable
              columns={salesColumn}
              data={salesData}
              action={actions}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default SalesTableFormat;

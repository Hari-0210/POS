import React,{useState, useEffect} from "react";
import APIKit from "../../utilities/APIKIT";
import { URLS } from "../../utilities/URLS";
import CommonTable from "../common/CommonTable";
import { ETaction, ETTypes } from "../common/Types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function CustomerList(props) {
  const productColumn = [
    {
      title: "SNo",
      align: "center",
      type: ETTypes.SNo,
    },
    {
      title: "Customer Name",
      field: "name",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Customer Mobile Number",
      field: "mobileNo",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Customer City",
      field: "city",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Action",
      field: "action",
      align: "center",
      list: [ETaction.onCall, ETaction.onWP],
    },
  ];
  const [customer, setCustomer] = useState([]);
  const getCustomer = async () => {
    await APIKit.get(URLS.getCustomer).then((res) => {
      if (res.data.status === 200) {
        setCustomer(res.data.data);
      } else {
      }
    });
  };
  useEffect(() => {
    getCustomer();
  }, []);
  const actions = {
    onCall: (index, row) => {

    },

    
  };

  return (
    <div>
      <Grid spacing={3} m={3}>
        <Grid item sm={11} md={11}>
          <Box
            // sx={{
            //   p: "20px",
            //   display: "flex",
            //   justifyContent: "space-between",
            // }}
          >

<CommonTable columns={productColumn} data={customer}  />

          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomerList;

import React,{useState} from "react";
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
      title: "Product",
      field: "productName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Code",
      field: "productCode",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Product Category",
      field: "productCategoryName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Price",
      field: "productCost",
      align: "center",
      type: ETTypes.string,
    },

    {
      title: "Created On",
      field: "createdDate",
      align: "center",
      type: ETTypes.date,
    },
    {
      title: "Action",
      field: "action",
      align: "center",
      list: [ETaction.onView, ETaction.onDelete, ETaction.onEdit],
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

  return (
    <div>
      <Grid spacing={3} m={3}>
        <Grid item sm={11} md={11}>
          <Box
            sx={{
              p: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >

<CommonTable columns={productColumn}  />

          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomerList;

import React from "react";
import { Grid } from "@mui/material";
import CommonTable from "../common/CommonTable";
import { ETaction, ETTypes } from "../common/Types";
import { useState, useEffect } from "react";
import { useConfirm } from "material-ui-confirm";
import { URLS } from "../../utilities/URLS";
import APIKit from "../../utilities/APIKIT";
import { useSnackbar } from "notistack";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
function SalesList() {
  const [salesData, setSalesData] = useState([]);
  const [salesProductsData, setSalesProductsData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();

  var variant = "";
  const anchorOrigin = { horizontal: "right", vertical: "bottom" };
  const salesColumn = [
    {
      title: "SNo",
      align: "center",
      type: ETTypes.SNo,
    },
    {
      title: "Customer Name",
      field: "customerName",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Total No of Products",
      field: "totalNoofProducts",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Discount ",
      field: "discount",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Packing Cost",
      field: "packingCost",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Total",
      field: "total",
      align: "center",
      type: ETTypes.string,
    },
    {
      title: "Date ",
      field: "createdTime",
      align: "center",
      type: ETTypes.date,
    },

    {
      title: "Action",
      field: "action",
      align: "center",
      list: [ETaction.onView, ETaction.onDelete],
    },
  ];
  const salesProductsColumn = [
    {
        title: "SNo",
        align: "center",
        type: ETTypes.SNo,
      },
      {
        title: "Product Name",
        field: "productName",
        align: "center",
        type: ETTypes.string,
      },
      {
        title: "Product Quantity",
        field: "productQty",
        align: "center",
        type: ETTypes.string,
      },
  ]
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    getSales();
  }, []);
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const actions = {
    onView: (index, row) => {
        setOpenModal(true)
        setSalesProductsData(row.salesProducts)
    },

    onEdit: (index, row) => {},
    onDelete: (index, row) => {
      console.log("delete:", index, row);
      remove(row.salesMasterID, index);
    },
  };
  const remove = (data, i) => {
    confirm({ description: "you want to delete the record ?" })
      .then(() => {
        deleteSales(data);
      })
      .catch(() => console.log("Deletion cancelled."));
  };
  const getSales = async () => {
    await APIKit.get(URLS.getSales).then((res) => {
      if (res.data.status === 200) {
        res.data.data = res.data.data.map(e => {
            return {
                ...e,
                salesProducts: JSON.parse(e.salesProducts)
            }
        })
        console.log(res.data.data);
        setSalesData(res.data.data);
      } else {
      }
    });
  };

  const deleteSales = async (salesMasterID) => {
    await APIKit.get(URLS.deleteSales + "/" + salesMasterID).then((res) => {
      if (res.data.status === 200) {
        variant = "success";
        enqueueSnackbar(res.data.message, { variant, anchorOrigin });
        getSales();
      } else {
        variant = "error";
        enqueueSnackbar(res.data.message.slice(21), { variant, anchorOrigin });
      }
    });
  };

  return (
    <div>
      <Grid m={3}>
        <Grid item sm={11} md={11}>
          <CommonTable
            columns={salesColumn}
            data={salesData}
            action={actions}
          />
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <CommonTable
            columns={salesProductsColumn}
            data={salesProductsData}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default SalesList;

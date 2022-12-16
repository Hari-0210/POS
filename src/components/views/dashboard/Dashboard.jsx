import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import useMediaQuery from "@mui/material/useMediaQuery";

function Dashboard(props) {
  const matches = useMediaQuery("(max-width:600px)");

  return (
      <Grid
        container
        spacing={3}
        pl={!matches ? 5 : ""}
        mt={2}
        sx={{  justifyContent: matches ? "center" : "" }}
      >
        <Grid item sm={12} md={4}>
          <Card>
            <Box
              padding={4}
              sx={{ justifyContent: "space-between", display: "flex" }}
            >
              <Typography>
                <LocalGroceryStoreIcon />
              </Typography>
              <Typography>$ 62.8B</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item sm={12} md={4}>
          <Card>
            <Box
              padding={4}
              sx={{ justifyContent: "space-between", display: "flex" }}
            >
              <Typography>
                <LocalGroceryStoreIcon />
              </Typography>
              <Typography>$ 62.8B</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
  );
}

export default Dashboard;

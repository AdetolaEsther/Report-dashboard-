import React, { FC, useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import SuperscriptIcon from "@mui/icons-material/Superscript";
import HireList from "./HrHireList";
import Johnsons from "./Johnson";
import Dashboard from "./DashBoard";

enum NavDrawer {
  TOTAL_USER = "TOTAL USER",
  HR_HIRELIST = "HR HIRE LIST",
  JOHNSONS = "JOHNSONS",
}

const Navbar: FC = () => {
  const [activeTab, setActiveTab] = useState<NavDrawer>(NavDrawer.TOTAL_USER);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          height: "100vh",
          width: "200px",
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "16px",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "start", gap: 1, mb: 8 }}>
            <SuperscriptIcon color="primary" fontSize="large" />
          </Box>

          {Object.values(NavDrawer).map((tab, key) => (
            <Tab
              key={key}
              label={tab.replace("_", " ")}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4, width: "100%" }}>
        {activeTab === NavDrawer.TOTAL_USER && (
            <Dashboard/>
        )}
        {activeTab === NavDrawer.HR_HIRELIST && <HireList />}
        {activeTab === NavDrawer.JOHNSONS && <Johnsons />}
      </Box>
    </Box>
  );
};

const Tab: FC<{ onClick: () => void; label: string; active: boolean }> = ({
  onClick,
  label,
  active,
}) => (
  <Button
    onClick={onClick}
    sx={{
      color: active ? "primary.main" : "secondary.main",
      textTransform: "none",
      fontWeight: active ? "500" : "400",
      justifyContent: "flex-start",
      minWidth: "fit-content",
      padding: "8px 16px",
      position: "relative",
      width: "100%",
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        height: "100%",
        width: "3px",
        backgroundColor: active ? "primary.main" : "transparent",
      },
    }}
  >
    {label}
  </Button>
);

export default Navbar;

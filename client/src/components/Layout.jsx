import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../state/api";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} height="100%" width="100%">
      <Sidebar
        user={data?.user || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data?.user || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

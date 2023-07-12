import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Search,
  Menu as MenuIcon,
} from "@mui/icons-material";

import FlexBetween from "./FlexBetween";
import { setMode } from "./../state";
import ProfileImg from "../assets/profile.jpeg";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* right side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode == "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile-img"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
                src={ProfileImg}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>{" "}
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.object,
  isSidebarOpen: PropTypes.bool,
  setIsSidebarOpen: PropTypes.func,
};

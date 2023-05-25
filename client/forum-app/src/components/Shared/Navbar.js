import React, { cloneElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  useScrollTrigger,
} from "@mui/material";
import communityLogo from "../../assets/community.png";
import SearchIcon from "@mui/icons-material/Search";
import "../../App.css";

const Navbar = () => {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/home") {
      setValue("home");
    } else {
      setValue("replies");
    }
  }, [value]);

  const ElevationScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signOut = () => {
    localStorage.removeItem("_id");
    navigate("/");
    alert("User signed out!");
  };

  return (
    <ElevationScroll>
      <AppBar position="fixed">
        <Toolbar variant="densed">
          <IconButton size="small" edge="start" color="inherit">
            <img className="community-icon" src={communityLogo} alt="logo" />
          </IconButton>
          <TextField
            id="search"
            variant="outlined"
            label="Seach here"
            type="search"
            className="search-bar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="standard"
            style={{ flex: 1, padding: "15px" }}
          >
            <Tab value="home" label="Home" onClick={() => navigate("/home")} />
            <Tab
              value="replies"
              label="Replies"
              onClick={() => navigate("/:id/replies")}
            />
          </Tabs>

          <div className="logout-button">
            <Button sx={{ color: "white", fontWeight: 700 }} onClick={signOut}>
              Log-out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;

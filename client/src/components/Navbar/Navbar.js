import useStyles from "./styles";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton,
  ListItemIcon,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../constants/actionTypes";
import { useHistory, useLocation } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../../images/logo.svg";
import smallLogo from "../../images/small logo.svg";
import styles from "./Navbar.module.css";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const location = useLocation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const logout = () => {
    setUser(null);
    dispatch({ type: actionTypes.LOGOUT });
    history.push("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) decode(token);
    setUser(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Link to="/" onClick={() => sessionStorage.clear()}>
          <img
            src={logo}
            alt="Travel The World"
            width="300"
            className={styles.logo}
          />
          <img
            src={smallLogo}
            alt="Travel The World"
            width="40"
            className={styles.logo2}
          />
        </Link>

        {!user?.result ? (
          <Link to="/auth">
            <Button color="primary" variant="contained">
              Login
            </Button>
          </Link>
        ) : (
          <div className={classes.rightPanel}>
            <Button style={{ textTransform: "none" }}>
              <Avatar src={user?.result.imageUrl} className={classes.avatar}>
                {user?.result.name.charAt(0)}
              </Avatar>

              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                {user?.result.name}
              </Typography>
            </Button>
            <IconButton
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <ArrowDropDownCircleIcon
                style={{ fontSize: "2.5rem", color: "#747274" }}
              />
            </IconButton>
            {/* meni */}
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              style={{ zIndex: 999 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper elevation={16}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <Link to="/settings">
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon style={{ marginRight: "-1.5rem" }}>
                              <SettingsIcon />
                            </ListItemIcon>
                            Settings
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={logout}>
                          <ListItemIcon style={{ marginRight: "-1.5rem" }}>
                            <ExitToAppIcon />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import useStyles from "./styles";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Zoom,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import Alerts from "../../components/Alerts";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { signup, login, reset } from "../../actions/auth";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import * as actionTypes from "../../constants/actionTypes";
import Alert from "@material-ui/lab/Alert";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const Auth = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // const location = useLocation();
  let error = JSON.parse(sessionStorage.getItem("error"));
  const [msg, setMsg] = useState();
  let load = true;
  const [open, setOpen] = useState(false);
  const [recEmail, setRecEmail] = useState({
    email: "",
  });

  const userDataLogin = userData.email && userData.password;
  const userDataSignup =
    userData.firstName &&
    userData.lastName &&
    userData.email &&
    userData.password &&
    userData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(userData, history));
    } else {
      dispatch(login(userData, history));
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSwitch = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleLoginSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: actionTypes.AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let err = error?.error;
    setMsg(error);
    return () => {
      error = null;
      err = null;
    };
  }, []);

  const [openRepSuc, setOpenRepSuc] = useState(false);
  const handleClickReportSuccess = () => {
    setOpenRepSuc(true);
  };

  const handleCloseReportSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRepSuc(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    dispatch(reset({ ...recEmail }));
    handleClose();
    setRecEmail({ email: "" });
    handleClickReportSuccess();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Zoom in={load}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    label="First Name"
                    name="firstName"
                    half
                    type="text"
                    handleChange={handleChange}
                    autoFocus
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    half
                    handleChange={handleChange}
                    autoFocus
                  />
                </>
              )}
              <Input
                label="Email Address"
                name="email"
                type="email"
                autoFocus
                handleChange={handleChange}
              />
              {isSignUp ? (
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  handleChange={handleChange}
                  half
                  // handleShowPassword={handleShowPassword}
                />
              ) : (
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  handleChange={handleChange}
                  // handleShowPassword={handleShowPassword}
                />
              )}
              {isSignUp && (
                <>
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    half
                    handleChange={handleChange}
                    // handleShowPassword={handleShowPassword}
                  />
                </>
              )}
            </Grid>
            <FormControlLabel
              control={
                <Checkbox color="primary" onClick={handleShowPassword} />
              }
              label="Show Password"
            />

            {isSignUp ? (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  disabled={userDataSignup === ""}
                >
                  Sign Up
                </Button>
                {userDataSignup === "" && (
                  <Alerts
                    message="Fill in all the required fields (Name, Email, Password, Confirm Password)"
                    severity="error"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  />
                )}
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  disabled={userDataLogin === ""}
                >
                  Login
                </Button>
                {userDataLogin === "" && (
                  <Alerts
                    message="Fill in all the required fields (Email and Password)"
                    severity="error"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  />
                )}
              </>
            )}
            {error?.error ? (
              <Alerts
                message={error?.error}
                severity="error"
                style={{ marginTop: 10, marginBottom: 10 }}
              />
            ) : null}

            <GoogleLogin
              clientId="696421807959-44lcp7jetp0ctfhb0fmhk18kgbo5mo0p.apps.googleusercontent.com"
              render={(renderProps) => (
                <GoogleButton
                  style={{ width: "100%" }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                />
              )}
              onSuccess={googleLoginSuccess}
              onFailure={(error) => console.log(error)}
              cookiePolicy="single_host_origin"
            />
            <Grid container>
              <Grid item xs>
                {!isSignUp && (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      onClick={handleClickOpen}
                    >
                      Forgot password?
                    </Button>

                    <Snackbar
                      open={openRepSuc}
                      autoHideDuration={10000}
                      onClose={handleCloseReportSuccess}
                    >
                      <Alert
                        onClose={handleCloseReportSuccess}
                        severity="success"
                      >
                        Email has been sent to your email address, if the email
                        doesn't appear please check your spam box.
                      </Alert>
                    </Snackbar>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        Account Recovery
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Enter the email from the account which you forgot your
                          password, after sending go check your email
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          placeholder="name@example.com"
                          label="Email Address"
                          type="email"
                          fullWidth
                          value={recEmail.email}
                          onChange={(e) =>
                            setRecEmail({ recEmail, email: e.target.value })
                          }
                        />
                        {/* <Alerts
                            message="Please enter a valid email address"
                            severity="error"
                            style={{ marginTop: 10, marginBottom: 10 }}
                          /> */}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button
                          onClick={handleRecover}
                          color="primary"
                          disabled={recEmail.email === ""}
                        >
                          Recover
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
              </Grid>
              <Grid item onClick={handleSwitch}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                >
                  {isSignUp
                    ? "Already have an account? Login"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Zoom>
    </Container>
  );
};

export default Auth;

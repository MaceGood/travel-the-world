import {
  Avatar,
  Button,
  Dialog,
  DialogContentText,
  Paper,
  TextField,
  Typography,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Zoom,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Settings.module.css";
import { useDispatch } from "react-redux";
import {
  changeEmail,
  changeName,
  changePassword,
  changeImage,
} from "../../actions/settings";
import Alert from "@material-ui/lab/Alert";
import FileBase64 from "react-file-base64";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openpw, setOpenPw] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  let error = JSON.parse(sessionStorage.getItem("error"));
  let load = true;

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

  const handleChange = (e) =>
    setText({ ...text, [e.target.name]: e.target.value });

  const handleClose = () => {
    setOpen(false);
    setOpenPw(false);
    setOpenName(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenPw = () => {
    setOpenPw(true);
  };
  const handleOpenNm = () => {
    setOpenName(true);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    dispatch(changeEmail(user?.result?._id, { ...text }));

    setText({ email: "" });
    handleClose();
    handleClickReportSuccess();
  };

  const handleChangeName = async (e) => {
    e.preventDefault();
    dispatch(changeName(user?.result?._id, { ...text }));

    setText({ name: "" });
    handleClose();
    handleClickReportSuccess();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    dispatch(changePassword(user?.result?._id, { ...text }));

    setText({ password: "", confirmPassword: "" });
    handleClose();
    handleClickReportSuccess();

    setTimeout(() => {
      sessionStorage.clear();
    }, 5000);
  };

  const handleChangeImage = async (e) => {
    e.preventDefault();
    dispatch(changeImage(user?.result?._id, { ...text }));

    handleClickReportSuccess();
    setText({ image: "" });
    history.push("/settings");
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [history, user]);

  return (
    <Zoom in={load}>
      <div className={styles.settings}>
        <Typography variant="h4" color="inherit" noWrap>
          Settings
        </Typography>
        <Paper className={styles.settings_container} elevation={16}>
          <Avatar
            src={text.image || user?.result.imageUrl}
            title="Change your Profile Photo"
            style={{ width: 120, height: 120, cursor: "pointer" }}
          >
            {user?.result.name.charAt(0)}
          </Avatar>

          <div
            style={{
              display: "flex",
              textAlign: "center",
            }}
          >
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setText({ ...text, image: base64 })}
            />
            {text.image && (
              <button onClick={handleChangeImage}>Update Image</button>
            )}
          </div>

          <Typography
            variant="h4"
            color="inherit"
            style={{ cursor: "pointer" }}
            noWrap
            title="Change your Name"
            onClick={handleOpenNm}
          >
            {user?.result.name}
          </Typography>
          {/* popup za ime */}
          <Dialog
            open={openName}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Change your Name</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter your New Name</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                placeholder="John Wick"
                label="Your Name"
                type="text"
                fullWidth
                value={text.name}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleChangeName}
                color="primary"
                disabled={text.name === ""}
              >
                Change
              </Button>
            </DialogActions>
          </Dialog>

          <button className={styles.button} onClick={handleOpen}>
            Change Email
          </button>
          {/* popup za emajl  */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Change your Email</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your New Email Address
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="email"
                placeholder="name@example.com"
                label="Email Address"
                type="email"
                fullWidth
                value={text.email}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleChangeEmail}
                color="primary"
                disabled={
                  validateEmail(text.email) === false || text.email === ""
                }
              >
                Change
              </Button>
            </DialogActions>
          </Dialog>

          <button className={styles.button} onClick={handleOpenPw}>
            Change Password
          </button>
          {/* popup za password  */}
          <Dialog
            open={openpw}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Change your Password
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Enter your New Password</DialogContentText>

              <div
                style={{
                  dispal: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  style={{ margin: 10 }}
                  autoFocus
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={text.password}
                  onChange={handleChange}
                />
                <TextField
                  style={{ margin: 10 }}
                  autoFocus
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={text.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <FormControlLabel
                control={
                  <Checkbox color="primary" onClick={handleShowPassword} />
                }
                label="Show Password"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                color="primary"
                disabled={(text.password && text.confirmPassword) === ""}
              >
                Change
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>

        <Snackbar
          open={openRepSuc}
          autoHideDuration={10000}
          onClose={handleCloseReportSuccess}
        >
          <Alert
            onClose={handleCloseReportSuccess}
            severity={error?.error ? "error" : "success"}
          >
            {error?.error
              ? `${error?.error}, please try again`
              : "Your information have been updated successfully"}
          </Alert>
        </Snackbar>
      </div>
    </Zoom>
  );
};

export default Settings;

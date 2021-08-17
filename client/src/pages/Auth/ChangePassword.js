import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { changepw } from "../../actions/auth";
import Alerts from "../../components/Alerts";
import Input from "../../components/Input";

const ChangePassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { userId, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  let error = JSON.parse(sessionStorage.getItem("error"));
  const [msg, setMsg] = useState();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changepw(userId, token, { ...data }));
    setData({
      password: "",
      confirmPassword: "",
    });
    history.push("/auth");
  };

  useEffect(() => {
    let err = error?.error;
    setMsg(error);
    return () => {
      error = null;
      err = null;
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ padding: "20px" }}>
        <h2>Change your Password</h2>
        <div style={{ marginTop: 10 }}>
          <Input
            style={{ marginTop: "20px" }}
            label="Password"
            name="password"
            value={data.password}
            type={showPassword ? "text" : "password"}
            handleChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <Input
            label="Confirm Password"
            name="confirmPassword"
            value={data.confirmPassword}
            type={showPassword ? "text" : "password"}
            handleChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <FormControlLabel
            control={<Checkbox color="primary" onClick={handleShowPassword} />}
            label="Show Password"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={(data.password && data.confirmPassword) === ""}
          >
            Change
          </Button>
        </div>

        {(data.password || data.confirmPassword) === "" && (
          <Alerts
            message="Enter your new password"
            severity="error"
            style={{ marginTop: 10, marginBottom: 10 }}
          />
        )}
        {error?.error ? (
          <Alerts
            message={error?.error}
            severity="error"
            style={{ marginTop: 10, marginBottom: 10 }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ChangePassword;

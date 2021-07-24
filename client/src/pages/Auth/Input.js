import {
  TextField,
  Grid,
  // InputAdornment, IconButton
} from "@material-ui/core";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  label,
  name,
  type,
  handleChange,
  half,
  autoFocus,
  // handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        label={label}
        name={name}
        type={type}
        onChange={handleChange}
        autoFocus={autoFocus}
        // InputProps={
        //   name === "password" || name === "confirmPassword"
        //     ? {
        //         endAdornment: (
        //           <InputAdornment position="end">
        //             <IconButton onClick={handleShowPassword}>
        //               {type === "password" ? <VisibilityOff /> : <Visibility />}
        //             </IconButton>
        //           </InputAdornment>
        //         ),
        //       }
        //     : null
        // }
      />
    </Grid>
  );
};

export default Input;

import { TextField, Grid } from "@material-ui/core";

const Input = ({ label, name, type, handleChange, half, autoFocus, value }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        label={label}
        value={value}
        name={name}
        type={type}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </Grid>
  );
};

export default Input;

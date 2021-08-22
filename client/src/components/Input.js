import { TextField, Grid } from "@material-ui/core";

const Input = ({
  label,
  name,
  type,
  handleChange,
  half,
  autoFocus,
  value,
  style,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        required
        style={style}
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

import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  formInput: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  preview: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  previewImage: {
    borderRadius: "10px",
    width: "80%",
  },
}));

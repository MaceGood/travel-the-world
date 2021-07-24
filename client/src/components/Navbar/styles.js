import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toolbarTitle: {
    flexGrow: 1,
    color: "black",
  },
  rightPanel: {
    display: "flex",
    alignItems: "center",
  },
  // rightPanelB: {
  //   display: "flex",
  //   alignItems: "center",
  //   padding: theme.spacing(0.5),
  //   borderRadius: "20px",
  //   cursor: "default",

  //   "&:hover": {
  //     background: "#ced4da",
  //   },
  // },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

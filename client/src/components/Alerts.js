import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";

const Alerts = ({ message, severity, style, close }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Collapse in={open}>
        <Alert
          style={style}
          severity={severity}
          action={
            close ? (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            ) : null
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Alerts;

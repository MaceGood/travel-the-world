import useStyles from "./styles";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  CardActionArea,
  IconButton,
  CardHeader,
  Avatar,
  Popper,
  Grow,
  Paper,
  Button,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  Zoom,
  DialogActions,
  TextField,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Snackbar,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState, useRef, useEffect } from "react";
import moment from "moment";
import { deletePost, likePost, reportPost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FlagIcon from "@material-ui/icons/Flag";
import Alerts from "../../Alerts";
import Alert from "@material-ui/lab/Alert";
// import MuiAlert from "@material-ui/lab/Alert";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRep, setOpenRep] = useState(false);
  const [repMsg, setRepMsg] = useState({
    reason: "",
    reportedBy: "",
    reportedByEmail: "",
  });
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  let load = true;
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result.googleId || user?.result?._id;
  const liked = post.likes.find((like) => like === userId);
  const [openRepSuc, setOpenRepSuc] = useState(false);

  const handleOpenRep = () => {
    setOpenRep(true);
  };

  const handleCloseRep = () => {
    setOpenRep(false);
  };

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

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    history.push("/");
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setOpen(false);
    setCurrentId(post._id);
    window.scrollTo({ top: 50, behavior: "smooth" });
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (liked) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const LikeCount = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteIcon style={{ fontSize: "1.8rem", color: "#f44336" }} />
          <h1 style={{ fontSize: "1.4rem" }}>{likes.length}</h1>
        </>
      ) : (
        <>
          <FavoriteBorderIcon
            style={{ fontSize: "1.8rem", color: "#f44336" }}
          />
          <h1 style={{ fontSize: "1.4rem" }}>{likes.length}</h1>
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon style={{ fontSize: "1.8rem", color: "#f44336" }} />
      </>
    );
  };

  const handleClickReportSuccess = () => {
    setOpenRepSuc(true);
  };

  const handleCloseReportSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenRepSuc(false);
  };

  const handleReport = async (e) => {
    e.preventDefault();
    dispatch(
      reportPost(
        post._id,
        {
          ...repMsg,
          reportedBy: user?.result?.name,
          reportedByEmail: user?.result?.email,
        },
        history
      )
    );
    setRepMsg("");
    handleCloseRep();
    handleClickReportSuccess();
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Zoom in={load}>
        <Card className={classes.card} elevation={16}>
          <CardHeader
            avatar={
              <Avatar src={post?.profilePic}>
                {post.profilePic?.charAt(0)}
              </Avatar>
            }
            action={
              <>
                {user?.result?.googleId === post?.user ||
                user?.result?._id === post?.user ? (
                  <IconButton
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <MoreVertIcon style={{ fontSize: "1.5rem" }} />
                  </IconButton>
                ) : (
                  <>
                    {user ? (
                      <>
                        <IconButton onClick={handleOpenRep}>
                          <FlagIcon style={{ fontSize: "1.5rem" }} />
                        </IconButton>

                        <Dialog
                          open={openRep}
                          onClose={handleCloseRep}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Report '{post.title}'
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Please tell us why you are reporting this post.
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              label="Reason for Reporting"
                              type="text"
                              fullWidth
                              value={repMsg.reason}
                              onChange={(e) =>
                                setRepMsg({ repMsg, reason: e.target.value })
                              }
                            />
                            {repMsg.reason === "" && (
                              <Alerts
                                message="Please enter a reason for reporting this post"
                                severity="error"
                                style={{ marginTop: 10, marginBottom: 10 }}
                              />
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseRep} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={handleReport}
                              color="primary"
                              disabled={repMsg.reason === ""}
                            >
                              Report
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    ) : null}

                    <Snackbar
                      open={openRepSuc}
                      autoHideDuration={6000}
                      onClose={handleCloseReportSuccess}
                    >
                      <Alert
                        onClose={handleCloseReportSuccess}
                        severity="success"
                      >
                        You reported '{post.title}' successfully.
                      </Alert>
                    </Snackbar>
                  </>
                )}
              </>
            }
            title={post.name}
            subheader={moment(post.date).fromNow()}
          />
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
                      <MenuItem onClick={handleEdit}>
                        <ListItemIcon style={{ marginRight: "-1.5rem" }}>
                          <EditIcon />
                        </ListItemIcon>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <ListItemIcon style={{ marginRight: "-1.5rem" }}>
                          <DeleteIcon />
                        </ListItemIcon>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <CardActionArea>
            {post?.image && (
              <CardMedia
                className={classes.cardMedia}
                image={post.image}
                title={post.title}
              />
            )}

            <CardContent className={classes.cardContent}>
              <Typography>
                {post.tags.map((tag) => `#${tag}, ${" "}`)}{" "}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography>
                {" "}
                {post?.message?.length < 130 ? (
                  post.message
                ) : (
                  <span>
                    {post?.message?.substring(0, 130)}
                    {"... "}
                    <span style={{ color: "blue" }}> Show More...</span>{" "}
                  </span>
                )}
              </Typography>
            </CardContent>
          </CardActionArea>

          <Grid>
            <CardActions style={{ justifyContent: "space-between" }}>
              <Button onClick={handleLike} disabled={!user}>
                <LikeCount />
              </Button>

              <Button variant="outlined" color="secondary" disabled={!user}>
                reserve ${post.price} / night
              </Button>
            </CardActions>
          </Grid>
        </Card>
      </Zoom>
    </Grid>
  );
};

export default Post;

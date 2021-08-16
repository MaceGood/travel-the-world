import {
  Button,
  Grid,
  TextField,
  Container,
  Paper,
  Typography,
  InputLabel,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Zoom,
} from "@material-ui/core";
import useStyles from "./styles";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";
import FileBase64 from "react-file-base64";
import Alerts from "../Alerts";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [""],
    image: "",
    price: "",
  });

  const userData = JSON.parse(localStorage.getItem("user"));
  let load = true;
  const postDataFields =
    postData.title && postData.message && postData.image && postData.price;

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  const clear = useCallback(() => {
    setPostData({ title: "", message: "", tags: [], image: "", price: "" });
    setCurrentId(null);
  }, [setCurrentId]);

  // const refresh = useCallback(() => {
  //   history.push("/");
  // }, [history]);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const removeImage = () => setPostData({ ...postData, image: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === null) {
      if (postDataFields !== "")
        return dispatch(
          createPost(
            {
              ...postData,
              name: userData?.result?.name,
              profilePic:
                userData?.result.imageUrl || userData?.result.name.charAt(0),
            },
            history
          )
        );
    } else {
      if (postDataFields !== "") {
        dispatch(updatePost(currentId, { ...postData }));
      }
    }
    clear();
  };

  const handleAddTag = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteTag = (tagToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  if (!userData) return <> </>;

  return (
    <Container component="main" maxWidth="xs" style={{ paddingTop: "3em" }}>
      <Zoom in={load}>
        <Paper className={classes.paper} elevation={16}>
          <form className={classes.form} noValidate>
            <Grid container item spacing={2} xs={12} sm={12} md={12}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ width: "100%", textAlign: "center" }}
              >
                {currentId ? "Edit your Travel Trip" : "Create a Travel Trip"}
              </Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Title"
                name="title"
                type="text"
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                className={classes.formInput}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Message"
                multiline
                rowsMax={4}
                name="message"
                type="text"
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
                className={classes.formInput}
              />
              <ChipInput
                variant="outlined"
                required
                fullWidth
                label="Tags"
                name="tags"
                type="text"
                value={postData.tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
                className={classes.formInput}
                style={{ marginBottom: 15 }}
              />

              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginBottom: 15 }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Price
                </InputLabel>
                <OutlinedInput
                  type="number"
                  value={postData.price}
                  onChange={(e) =>
                    setPostData({ ...postData, price: e.target.value })
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>

              <Alerts
                message="When you entered the tag click ENTER to make the tag into a bubble, otherwise it won't work"
                severity="warning"
                close
                style={{ marginBottom: 15 }}
              />

              {currentId && (
                <Alerts
                  message="After submiting please refresh this page or click on the Refresh button for changes to appear"
                  severity="info"
                  close
                  style={{ marginBottom: 15 }}
                />
              )}

              <FileBase64
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, image: base64 })
                }
              />

              {postData.image && (
                <div className={classes.preview} onClick={removeImage}>
                  <img
                    src={postData.image}
                    alt=""
                    className={classes.previewImage}
                  />
                  <Button>Remove Image</Button>
                </div>
              )}

              {postDataFields === "" && (
                <Alerts
                  message="Fill in all the required fields (Title, Message, Image and Price)"
                  severity="error"
                  style={{ marginTop: 10 }}
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={postDataFields === ""}
            >
              {currentId ? "Update" : "Post"}
            </Button>

            {currentId || postData.title ? (
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.submit}
                onClick={clear}
              >
                cancel
              </Button>
            ) : null}

            {/* <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
              className={classes.submit}
              onClick={refresh}
            >
              refresh
            </Button> */}
          </form>
        </Paper>
      </Zoom>
    </Container>
  );
};

export default Form;

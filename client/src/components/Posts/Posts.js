import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import nodata from "../../images/nodata.svg";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, loading } = useSelector((posts) => posts);

  if (!posts?.length && !loading)
    return (
      <>
        <img
          src={nodata}
          alt="Nothing Found"
          width="300"
          style={{
            marginTop: "2rem",
            textAlign: "center",
            height: "50vh",
            width: "100%",
          }}
        />
        <h2 style={{ textAlign: "center" }}>Nothing Found</h2>
      </>
    );

  return loading ? (
    <CircularProgress />
  ) : (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={4}>
        {posts?.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;

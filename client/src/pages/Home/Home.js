import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPost } from "../../actions/posts";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getAllPost());
  }, [currentId, dispatch]);

  return (
    <Grid item>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <Posts setCurrentId={setCurrentId} />
    </Grid>
  );
};

export default Home;

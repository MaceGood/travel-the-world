import React from "react";
import img404 from "../../images/404.svg";
import styles from "./NotFound.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.nothingFound}>
      <div className={styles.nothingFoundContainer}>
        <img
          src={img404}
          alt="Nothing Found"
          className={styles.nothingFoundImage}
        />
        <h2>I have bad news for you</h2>
        <p>The page you are looking for doesn't exist</p>
        <Link to="/">
          <Button
            color="primary"
            variant="contained"
            style={{ marginTop: "1rem" }}
          >
            Come to Explore
          </Button>
        </Link>{" "}
      </div>
    </div>
  );
};

export default NotFound;

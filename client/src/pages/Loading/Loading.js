import React from "react";
import rocket_man from "../../images/rocket_man.gif";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.phoneContainer}>
        <img src={rocket_man} alt="Loading..." className={styles.loadingGif} />
        <h3 className={styles.by}>
          Animation is created by:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://dribbble.com/skov_com"
            title="Visit on Dribble"
          >
            Joey Skovgaard
          </a>
        </h3>
      </div>
    </div>
  );
};

export default Loading;

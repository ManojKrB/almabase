import React from "react";
import styles from "./Home.module.css";
import Page from "./Components/Page";
import Sidebar from "./Components/Sidebar";
import Modal from "./Components/Modal";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Page />
      <Sidebar />
      <Modal />
    </div>
  );
};

export default Home;

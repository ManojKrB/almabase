import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import DraggableBlock from "./Blocks";
import { ReducerContext } from "../context/Context";

const Sidebar = () => {
  const { state } = useContext(ReducerContext);
  const { blocks } = state;
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.header}>Blocks</div>
      <>
        {blocks.map((block) => {
          return <DraggableBlock label={block.name} key={block.name} />;
        })}
      </>
    </div>
  );
};

export default Sidebar;

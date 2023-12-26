import React from "react";
import styles from "./Blocks.module.css";
import icon from "../assets/grip-vertical.svg";

const DraggableBlock = ({ label }) => {
  const handleDragStart = (e, label) => {
    e.dataTransfer.setData("id", label);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, label)}
      className={styles.blockWrapper}
    >
      <div className={icon}>
        <img src={icon} alt="icon" width={32} />
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default DraggableBlock;

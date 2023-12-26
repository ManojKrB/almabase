import React, { useContext, useState } from "react";
import { deleteElement, dropped, updateModal } from "../context/actions";
import { ReducerContext } from "../context/Context";
import PositionForm from "./Form";

const Page = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const { blocks } = state;

  const [isHovered, setHovered] = useState(false);
  const [isActive, setActive] = useState(false);

  const { modalDispatch, stateDispatch } = dispatch;

  const handleDragStart = (e, label) => {
    e.dataTransfer.setData("id", label);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const id = e.dataTransfer.getData("id");
    const { clientX, clientY } = e;
    const { page } = blocks.filter((block) => block.name === id)[0];
    stateDispatch(dropped({ payload: { id, clientX, clientY } }));
    modalDispatch(updateModal(<PositionForm id={id} page={page} />));
  };

  const handleKeyDown = (e, name) => {
    if (e.keyCode === 13) {
      modalDispatch(updateModal(<PositionForm id={name} />));
    } else if (e.keyCode === 46) {
      stateDispatch(deleteElement(name));
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      {blocks.map((block) => {
        const { type, text, page, name } = block;
        if (page === "page") {
          if (type === "input") {
            return (
              <input
                key={type}
                style={{
                  position: "absolute",
                  top: `${block.ypos}px`,
                  left: `${block.xpos}px`,
                  padding: "8px 12px",
                  minHeight: "24px",
                  fontSize: `${block.fontSize}px`,
                  fontWeight: `${block.fontWeight}`,
                  border: "1px solid #d9d9d9",
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, name)}
                onKeyDown={(e) => handleKeyDown(e, name)}
              />
            );
          }
          const Component = type === "button" ? "div" : "label";
          return (
            <Component
              tabIndex="0"
              draggable
              onDragStart={(e) => handleDragStart(e, name)}
              key={type}
              style={{
                position: "absolute",
                top: `${block.ypos}px`,
                left: `${block.xpos}px`,
                fontSize: `${block.fontSize}px`,
                fontWeight: `${block.fontWeight}`,
                cursor: "pointer",
                ...(type === "button"
                  ? {
                      boxSizing: "border-box",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      padding: "8px 16px",
                      color: "#fff",
                      background: "#0044c1",
                      borderRadius: "2px",
                      width: "140px",
                      border: "2px solid #0044c1",
                    }
                  : {
                      border: isHovered ? "2px solid red" : "none",
                    }),
              }}
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}
              onMouseDown={() => setActive(true)}
              onMouseUp={() => setActive(false)}
              onKeyDown={(e) => handleKeyDown(e, name)}
              onClick={(e) => {
                e.target.classList.toggle("active");
              }}
            >
              {text}
            </Component>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Page;

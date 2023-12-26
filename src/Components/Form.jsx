import React, { useContext, useState } from "react";

import close from "../assets/close.png";
import { updateDragged, updateModal, updatePosition } from "../context/actions";
import { ReducerContext } from "../context/Context";

const formContainerStyle = {
  background: "#ffffff",
  width: "400px",
  borderRadius: "5px",
};

const formHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "24px",
};

const titleStyle = {};

const closeStyle = {
  height: "14px",
  width: "14px",
  cursor: "pointer",
};

const lineStyle = {
  opacity: "0.07",
  border: "1px solid #000000",
};

const formWrapperStyle = {
  display: "flex",
  padding: "24px",
  flexDirection: "column",
  gap: "32px",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  color: "#262626",
  fontSize: "14px",
  lineHeight: "22px",
};

const textInputStyle = {
  flex: "1",
  padding: "8px 12px",
  minHeight: "24px",
  fontSize: "inherit",
  backgroundColor: "transparent",
  border: "1px solid #d9d9d9",
  outline: "none",
};

const buttonStyle = {
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  padding: "8px 16px",
  color: "#fff",
  background: "#0044c1",
  borderRadius: "2px",
  width: "140px",
};

const selectStyle = {
  padding: "8px 12px",
};

const fontWeightOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const Form = ({ id }) => {
  const { state, dispatch } = useContext(ReducerContext);
  const block = state.blocks.filter((block) => block.name === id)[0];
  const [input, setInput] = useState({
    xpos: block.xpos,
    ypos: block.ypos,
    fontSize: block.fontSize || 16,
    fontWeight: block.fontWeight || 400,
  });
  const { modalDispatch, stateDispatch } = dispatch;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleModal = (e) => {
    e.preventDefault();
    modalDispatch(updateModal(null));
    stateDispatch(updateDragged(id));
    stateDispatch(updatePosition({ payload: { input, label: id } }));
  };

  const placeholderText = `This is ${id === "input" ? "an " + id : "a " + id}`;

  return (
    <div style={formContainerStyle} className={StyleSheet.formContainerStyle}>
      <div style={formHeaderStyle}>
        <div style={titleStyle}>Edit {id}</div>
        <img
          src={close}
          alt="close"
          style={closeStyle}
          onClick={(e) => handleModal(e)}
        />
      </div>
      <div style={lineStyle} />
      <div style={formWrapperStyle}>
        <div style={formGroupStyle}>
          <div style={labelStyle}>Text</div>
          <input style={textInputStyle} placeholder={placeholderText} />
        </div>
        <div style={formGroupStyle}>
          <div style={labelStyle}>X</div>
          <input
            type="number"
            value={input.xpos}
            name="xpos"
            onChange={(e) => handleInputChange(e, "xpos")}
            style={textInputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <div style={labelStyle}>Y</div>
          <input
            type="number"
            value={input.ypos}
            name="ypos"
            onChange={(e) => handleInputChange(e, "ypos")}
            style={textInputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <div style={labelStyle}>Font Size</div>
          <input
            type="number"
            value={input.fontSize}
            name="fontSize"
            onChange={(e) => handleInputChange(e)}
            style={textInputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <div style={labelStyle}>Font Weight</div>
          <select
            value={input.fontWeight}
            name="fontWeight"
            onChange={(e) => handleInputChange(e)}
            style={selectStyle}
          >
            {fontWeightOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div style={buttonStyle} onClick={(e) => handleModal(e)}>
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default Form;

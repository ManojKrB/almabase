import React, { useContext } from "react";
import { updateModal } from "../context/actions";
import { ReducerContext } from "../context/Context";

const Modal = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const { modal } = state;
  const { modalDispatch } = dispatch;
  function closeModal() {
    if (
      modal &&
      modal.props.onClose &&
      typeof modal.props.onClose === "function"
    ) {
      modal.props.onClose();
    }
    setTimeout(() => modalDispatch(updateModal(null)));
  }

  if (!modal || modal.props.page === "page" || !modal.props.id) return null;
  return (
    <div
      onClick={closeModal}
      style={{
        position: "absolute",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{modal}</div>
    </div>
  );
};

export default Modal;

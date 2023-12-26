import actionTypes from "./actionTypes";

export const updateModal = (modal) => {
  return {
    type: actionTypes.updateModal,
    modal,
  };
};

export const dropped = (payload) => {
  return {
    type: actionTypes.dropped,
    ...payload,
  };
};

export const updateDragged = (payload) => {
  return {
    type: actionTypes.dragged,
    payload,
  };
};

export const updatePosition = (payload) => {
  return {
    type: actionTypes.updatePosition,
    ...payload,
  };
};

export const deleteElement = (payload) => {
  return {
    type: actionTypes.deleteElement,
    payload,
  };
};

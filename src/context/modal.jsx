import actionTypes from "./actionTypes";

export const modalReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.updateModal:
      return {
        modal: action.modal,
      };
    default:
      return state;
  }
};

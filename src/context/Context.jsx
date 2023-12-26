import React, { createContext, useEffect, useReducer } from "react";
import { modalReducer } from "./modal";
import { initializer, initialState, reducer } from "./reducer";

export const ReducerContext = createContext();

const ReducerProvider = (props) => {
  const [state, stateDispatch] = useReducer(reducer, initialState, initializer);

  const [modalState, modalDispatch] = useReducer(modalReducer, null);

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(state));
  }, [state]);

  return (
    <ReducerContext.Provider
      value={{
        state: {
          ...state,
          ...modalState,
        },
        dispatch: { stateDispatch, modalDispatch },
      }}
    >
      {props.children}
    </ReducerContext.Provider>
  );
};

export default ReducerProvider;

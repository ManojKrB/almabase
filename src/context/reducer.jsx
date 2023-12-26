import actionTypes from "./actionTypes";

export const initialState = {
  blocks: [
    {
      name: "Label",
      type: "label",
      page: "sidebar",
      text: "This is a label",
    },
    {
      name: "Input",
      type: "input",
      page: "sidebar",
      text: "Input",
    },
    {
      name: "Button",
      type: "button",
      page: "sidebar",
      text: "Button",
    },
  ],
};

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("blocks")) || initialValue;

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.dropped:
      const { id, clientX, clientY } = action.payload;
      const blocks = state.blocks.filter((block) => {
        if (block.name === id) {
          block.xpos = clientX;
          block.ypos = clientY;
        }
        return block;
      });
      return {
        ...state,
        blocks: blocks,
      };
    case actionTypes.dragged:
      const draggedBlocks = state.blocks.filter((block) => {
        if (block.name === action.payload) {
          block.page = "page";
        }
        return block;
      });
      return {
        ...state,
        blocks: draggedBlocks,
      };
    case actionTypes.updatePosition:
      const { label, input } = action.payload;
      const updatedBlocks = state.blocks.filter((block) => {
        if (block.name === label) {
          block.xpos = input.xpos;
          block.ypos = input.ypos;
          block.fontSize = input.fontSize;
          block.fontWeight = input.fontWeight;
        }
        return block;
      });
      return {
        ...state,
        blocks: updatedBlocks,
      };
    case actionTypes.deleteElement:
      const deletedBlocks = state.blocks.filter((block) => {
        if (block.name === action.payload) {
          block.page = "sidebar";
          block.xpos = "";
          block.ypos = "";
          block.fontSize = "";
          block.fontWeight = "";
        }
        return block;
      });
      return {
        ...state,
        blocks: deletedBlocks,
      };
    default:
      return state;
  }
};

import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  options: db.options,
  option: {description: "", answer: ""},
};

const optionSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    addOption: (state, action) => {
      state.options = [
        ...state.options,
        { ...action.payload, o_id: new Date().getTime().toString() },
      ];
    },
    deleteOption: (state, action) => {
      state.options = state.options.filter(
        (option) => (option.o_id !== action.payload)
      );
    },
    updateOption: (state, action) => {
      state.options = state.options
      .map((option) => {
        if (option.o_id === action.payload.o_id) {
          return action.payload;
        } else {
          return option;
        }
      });
    },
    setOption: (state, action) => {
      state.option = action.payload;
    },
  },
});

export const { addOption, deleteOption, updateOption, setOption } = optionSlice.actions;
export default optionSlice.reducer;

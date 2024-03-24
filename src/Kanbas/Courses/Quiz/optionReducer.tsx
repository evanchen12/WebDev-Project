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
        { ...action.payload, p_id: new Date().getTime().toString() },
          ...state.options,
      ];
    },
    deleteOption: (state, action) => {
      state.options = state.options.filter(
        (option) => option.p_id !== action.payload
      );
    },
    editOption: (state, action) => {
      state.options = state.options.map((option) => {
        if (option.p_id === action.payload._id) {
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

export const { addOption, deleteOption, editOption, setOption } = optionSlice.actions;
export default optionSlice.reducer;

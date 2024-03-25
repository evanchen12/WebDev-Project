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
        { ...action.payload, o_id: new Date().getTime().toString() },
          ...state.options,
      ];
    },
    deleteOption: (state, action) => {
      state.options = state.options.filter(
        (option) => (option.o_id !== action.payload)
      );
    },
    setOptionAnswer: (state, action) => {
      state.options = state.options
      .map((option) => {
        if (option.o_id === action.payload.o_id) {
          return action.payload;
        } else {
          if (option.p_id === action.payload.p_id) {
            option.answer="false";
            return option;
          } else {
            return option;
          }
        }
      });
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

export const { addOption, deleteOption, setOptionAnswer, updateOption, setOption } = optionSlice.actions;
export default optionSlice.reducer;

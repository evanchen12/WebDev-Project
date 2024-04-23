import { createSlice } from "@reduxjs/toolkit";
import { Option } from '../../DataType';

const initialState = {
  options: [] as Option[],
  option: {description: "", answer: ""},
};

const optionSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    addOption: (state, action) => {
      state.options = [
        ...state.options,
        action.payload,
      ];
    },
    deleteOption: (state, action) => {
      state.options = state.options.filter(
        (option) => (option._id !== action.payload)
      );
    },
    updateOption: (state, action) => {
      state.options = state.options.map((option) => {
        if (option._id === action.payload._id) {
          return action.payload;
        } else {
          return option;
        }
      });
    },
    setOption: (state, action) => {
      state.option = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
  },
});

export const { addOption, deleteOption, updateOption, setOption, setOptions } = optionSlice.actions;
export default optionSlice.reducer;

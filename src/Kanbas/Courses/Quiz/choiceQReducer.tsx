import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";
import { ChoiceQ } from "../../DataType";

const initialState = {
  choiceQs: [] as ChoiceQ[],
  choiceQ: {o_id: "", title: "", type: "MC", question: "", answer: true, points: 0 },
};

const choiceQSlice = createSlice({
  name: "choiceQ",
  initialState,
  reducers: {
    setChoiceQs: (state, action) => {
      state.choiceQs = action.payload;
    },
    addChoiceQ: (state, action) => {
      state.choiceQs = [
          ...state.choiceQs,
          action.payload
      ];
      state.choiceQ = action.payload;
    },
    deleteChoiceQ: (state, action) => {
      state.choiceQs = state.choiceQs.filter(
        (choiceQ) => choiceQ._id !== action.payload
      );
    },
    updateChoiceQ: (state, action) => {
      state.choiceQs = state.choiceQs.map((choiceQ) => {
        if (choiceQ._id === action.payload._id) {
          return action.payload;
        } else {
          return choiceQ;
        }
      });
    },
    setChoiceQ: (state, action) => {
      state.choiceQ = action.payload;
    },
    resetChoiceQ: (state) => {
      state.choiceQ = {o_id: "", title: "", type: "MC", question: "", answer: true, points: 0 };
    },
  },
});

export const { setChoiceQs, addChoiceQ, deleteChoiceQ, updateChoiceQ, setChoiceQ, resetChoiceQ } = choiceQSlice.actions;
export default choiceQSlice.reducer;
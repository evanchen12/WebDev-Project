import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  choiceQs: db.choiceQ,
  choiceQ: {title: "", type: "MC", question: "", answer: true, points: 0 },
};

const choiceQSlice = createSlice({
  name: "choiceQ",
  initialState,
  reducers: {
    addChoiceQ: (state, action) => {
      const id = new Date().getTime().toString();
      state.choiceQs = [
        { ...action.payload, p_id: id },
          ...state.choiceQs,
      ];
      state.choiceQ = { ...action.payload, p_id: id };
    },
    deleteChoiceQ: (state, action) => {
      state.choiceQs = state.choiceQs.filter(
        (choiceQ) => choiceQ.p_id !== action.payload
      );
    },
    updateChoiceQ: (state, action) => {
      state.choiceQs = state.choiceQs.map((choiceQ) => {
        if (choiceQ.p_id === action.payload.p_id) {
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
      state.choiceQ = {title: "", type: "", question: "", answer: true, points: 0 };
    },
  },
});

export const { addChoiceQ, deleteChoiceQ, updateChoiceQ, setChoiceQ, resetChoiceQ } = choiceQSlice.actions;
export default choiceQSlice.reducer;
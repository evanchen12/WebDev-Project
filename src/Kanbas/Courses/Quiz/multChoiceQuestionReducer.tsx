import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  multChoiceQuestions: db.choiceQ,
  multChoiceQuestion: {title: "", type: "MC", question: "", points: 30 },
};

const choiceQSlice = createSlice({
  name: "multChoiceQuestions",
  initialState,
  reducers: {
    addChoiceQ: (state, action) => {
      const id = new Date().getTime().toString();
      state.multChoiceQuestions = [
        { ...action.payload, p_id: id },
          ...state.multChoiceQuestions,
      ];
      state.multChoiceQuestion = { ...action.payload, p_id: id };
    },
    deleteChoiceQ: (state, action) => {
      state.multChoiceQuestions = state.multChoiceQuestions.filter(
        (multChoiceQuestion) => multChoiceQuestion.p_id !== action.payload
      );
    },
    updateChoiceQ: (state, action) => {
      state.multChoiceQuestions = state.multChoiceQuestions.map((multChoiceQuestion) => {
        if (multChoiceQuestion.p_id === action.payload.p_id) {
          return action.payload;
        } else {
          return multChoiceQuestion;
        }
      });
    },
    setChoiceQ: (state, action) => {
      state.multChoiceQuestion = action.payload;
    },
  },
});

export const { addChoiceQ, deleteChoiceQ, updateChoiceQ, setChoiceQ } = choiceQSlice.actions;
export default choiceQSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
    multChoiceQuestions: db.choiceQ,
    multChoiceQuestion: {"quiz_id": 1, "p_id": 0, "type": "Blank", "question": "", "points": 30 },
};

const choiceQSlice = createSlice({
  name: "multChoiceQuestions",
  initialState,
  reducers: {
    addChoiceQ: (state, action) => {
      state.multChoiceQuestions = [
        { ...action.payload, quiz_id: new Date().getTime().toString() },
          ...state.multChoiceQuestions,
      ];
    },
    deleteChoiceQ: (state, action) => {
      state.multChoiceQuestions = state.multChoiceQuestions.filter(
        (multChoiceQuestion) => multChoiceQuestion.quiz_id !== action.payload
      );
    },
    updateChoiceQ: (state, action) => {
      state.multChoiceQuestions = state.multChoiceQuestions.map((multChoiceQuestion) => {
        if (multChoiceQuestion.quiz_id === action.payload.quiz_id) {
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
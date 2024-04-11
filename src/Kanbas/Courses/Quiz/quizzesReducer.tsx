import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  quizzes: db.quizzes,
  quiz: { name: "new quiz", type: "Graded Quiz", points: 0, group: "Quizzes", shuffle: true, limit: 20, publish: false,
  multiple: false, show: "", oneAtATime: true, webcam: false, lock: false, due: new Date("2023-09-21T13:00:00"), availiable: new Date("2023-09-21T11:40:00"), until: new Date("2023-09-21T13:00:00")},
  
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [
        { ...action.payload,
          _id: new Date().getTime().toString(),
          code: Math.random()},
          ...state.quizzes,
      ];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
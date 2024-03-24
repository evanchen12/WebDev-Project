import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";

import multChoiceQuestionReducer from "../Courses/Quiz/QuizDetail/Editor/QuizQuestionsEditor/multChoiceQuestionReducer";
import quizzesReducer from "../Courses/Quiz/quizzesReducer";
import tfQReducer from "../Courses/Quiz/tfQReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  multChoiceReducer: {
    multChoiceQuestions: any[];
    multChoiceQuestion: any;
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
  tfQReducer: {
    tfQ: any[];
    tf: any;
  }
}
const store = configureStore({
  reducer: {
    modulesReducer,
    multChoiceQuestionReducer
    quizzesReducer,
    tfQReducer
  }
});

export default store;
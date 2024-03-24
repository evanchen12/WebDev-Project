import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import multChoiceQuestionReducer from "../Courses/Quiz/QuizDetail/Editor/QuizQuestionsEditor/multChoiceQuestionReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  multChoiceReducer: {
    multChoiceQuestions: any[];
    multChoiceQuestion: any;
  }
}
const store = configureStore({
  reducer: {
    modulesReducer,
    multChoiceQuestionReducer
  }
});

export default store;
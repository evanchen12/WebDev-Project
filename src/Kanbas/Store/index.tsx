import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import multChoiceQuestionReducer from "../Courses/Quiz/multChoiceQuestionReducer";
import quizzesReducer from "../Courses/Quiz/quizzesReducer";
import tfQReducer from "../Courses/Quiz/tfQReducer";
import optionReducer from "../Courses/Quiz/optionReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  multChoiceQuestionReducer: {
    multChoiceQuestions: any[];
    multChoiceQuestion: any;
  };
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
  tfQReducer: {
    tfQ: any[];
    tf: any;
  };
  optionReducer: {
    options: any[];
    option: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    multChoiceQuestionReducer,
    quizzesReducer,
    tfQReducer,
    optionReducer,
  },
});

export default store;

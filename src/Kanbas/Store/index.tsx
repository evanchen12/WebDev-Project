import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import choiceQReducer from "../Courses/Quiz/choiceQReducer";
import quizzesReducer from "../Courses/Quiz/quizzesReducer";
import optionReducer from "../Courses/Quiz/optionReducer";
import { Quiz } from "../DataType";


export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  choiceQReducer: {
    choiceQs: any[];
    choiceQ: any;
  };
  quizzesReducer: {
    quizzes: Quiz[];
    quiz: Quiz;
  };
  optionReducer: {
    options: any[];
    option: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    choiceQReducer,
    quizzesReducer,
    optionReducer,
  },
});

export default store;

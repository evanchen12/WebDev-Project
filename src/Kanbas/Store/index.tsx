import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import quizzesReducer from "../Courses/Quiz/quizzesReducer";
import tfQReducer from "../Courses/Quiz/tfQReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
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
    quizzesReducer,
    tfQReducer
  }
});

export default store;
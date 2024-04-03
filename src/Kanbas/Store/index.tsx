import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";

import multChoiceQuestionReducer from "../Courses/Quiz/multChoiceQuestionReducer";
import quizzesReducer from "../Courses/Quiz/quizzesReducer";
import tfQReducer from "../Courses/Quiz/tfQReducer";
import optionReducer from "../Courses/Quiz/optionReducer";


interface Quiz {
  _id: number, 
  courseID: string, 
  name: string, 
  type: string, 
  points: number, 
  group: string, 
  shuffle: boolean, 
  limit: number,
  multiple: boolean, 
  show: string, 
  code: number, 
  oneAtATime: boolean, 
  webcam: boolean,
  lock: boolean, 
  due: Date, 
  availiable: Date, 
  until: Date
}

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  multChoiceReducer: {
    multChoiceQuestions: any[];
    multChoiceQuestion: any;
  }
  quizzesReducer: {
    quizzes: Quiz[];
    quiz: Quiz;
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
    optionReducer
  }
});

export default store;

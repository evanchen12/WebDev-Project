export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
};

export interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
};

export interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
};

export interface Quiz {
  _id: string, 
  courseID: string,
  instruction:string, 
  name: string, 
  type: string, 
  points: number, 
  group: string, 
  shuffle: boolean,
  setLimit: boolean,
  limit: number,
  multiple: boolean, 
  showCorrect: boolean,
  code: number | string, 
  oneAtATime: boolean, 
  webcam: boolean,
  lock: boolean, 
  due: string, 
  availiable: string, 
  until: string
  publish: boolean,
}

export interface ChoiceQ {
  _id: string,
  quiz_id: string,
  o_id: string,
  title: string,
  type: string,
  question: string,
  answer: boolean,
  points: number,
}

export interface Option {
  _id: string;
  p_id: string;
  description: string;
  answer: string;
}

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
  show: string, 
  code: number, 
  oneAtATime: boolean, 
  webcam: boolean,
  lock: boolean, 
  due: string, 
  availiable: string, 
  until: string
  publish: boolean,
}
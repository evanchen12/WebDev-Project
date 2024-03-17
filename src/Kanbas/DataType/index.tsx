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
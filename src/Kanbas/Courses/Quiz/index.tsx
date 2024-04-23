import { useParams } from "react-router"
import QuizList from "./QuizList"
import { FaEllipsisV } from "react-icons/fa";
import { addQuiz, resetQuiz, setQuiz } from "./quizzesReducer";
import { KanbasState } from "../../Store";
import { createQuizDetail } from "./Client/quizClient";
import { useEffect, useState } from "react";
import { Quiz } from "../../DataType";
import { Link, useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

function Quizzes() {

  const { courseId } = useParams();
  const navigate = useNavigate();

  const defaultQuiz : Quiz = {
    _id: "", 
    courseID: "",
    instruction:"", 
    name: "New Quiz", 
    type: "Graded Quiz", 
    points: 0, 
    group: "Quizzes", 
    shuffle: true,
    setLimit: true,
    limit: 20,
    multiple: false, 
    showCorrect: false,
    code: '', 
    oneAtATime: true, 
    webcam: false,
    lock: false, 
    due: "", 
    availiable: "", 
    until: "",
    publish: false
  }


  const handleAddQuiz = async () => {
    // Create Quiz from Database
    const createdQuiz = await createQuizDetail({ ...defaultQuiz, courseID: courseId ? courseId : "" });
    // Navigate to the new quiz detail page
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${createdQuiz._id}/QuizDetail`)
  }

  return (
    <>
      <div className="wd-buttons">
        <button type="button">Collapse All</button>
        <button type="button">View Progress</button>
        <select id="select-one">
          <option value="All">Publish All</option>
          <option value="This">Publish This</option>
        </select>
          <button className="big-red" type="button" onClick={handleAddQuiz}>
            + Quiz
          </button>
        <button type="button">
          <FaEllipsisV />
        </button>
        <hr />
      </div>
      <QuizList /> <br />
    </>
  )
}

export default Quizzes
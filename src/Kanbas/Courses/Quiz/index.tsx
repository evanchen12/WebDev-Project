import { Navigate, Route, Routes } from "react-router"
import QuizList from "./QuizList"
import QuizDetail from "./QuizDetail"
import db from "../../Database"
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

function Quizzes() {
  const [quizzes, setQuizzes] = useState(db.quizzes);

  return (
    <>
      <div className="wd-buttons">
        <button type="button">Collapse All</button>
        <button type="button">View Progress</button>
        <select id="select-one">
          <option value="All">Publish All</option>
          <option value="This">Publish This</option>
        </select>
        <button className="big-red" type="button">
          + Quiz</button>
        <button type="button"><FaEllipsisV /></button>
        <hr />
      </div>
      <QuizList /> <br/>
      <Link to={`q1`}> detail </Link>
    </>
  )
}

export default Quizzes
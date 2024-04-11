import { Navigate, Route, Routes, useParams } from "react-router"
import QuizList from "./QuizList"
import { FaEllipsisV } from "react-icons/fa";
import { addQuiz, deleteQuiz, updateQuiz, setQuiz } from "./quizzesReducer";
import { KanbasState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";

function Quizzes() {
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);
  const dispatch = useDispatch();
  const courseID = useParams();

  return (
    <>
      <div className="wd-buttons">
        <button type="button">Collapse All</button>
        <button type="button">View Progress</button>
        <select id="select-one">
          <option value="All">Publish All</option>
          <option value="This">Publish This</option>
        </select>
        <button className="big-red" type="button" onClick={() => dispatch(addQuiz({ ...quiz, courseID: courseID }))}>
          + Quiz</button>
        <button type="button"><FaEllipsisV /></button>
        <hr />
      </div>
      <QuizList /> <br />
    </>
  )
}

export default Quizzes
import { useParams } from "react-router"
import QuizList from "./QuizList"
import { FaEllipsisV } from "react-icons/fa";
import { addQuiz, resetQuiz, setQuiz } from "./quizzesReducer";
import { KanbasState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { createQuizDetail } from "./Client/quizClient";
import { useEffect, useState } from "react";
import { Quiz } from "../../DataType";
import { Link, useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

function Quizzes() {
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);
  const quizzes = useSelector((state: KanbasState) =>
    state.quizzesReducer.quizzes)
  const quizName = "Quiz " + (quizzes.length + 1);

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();


  const handleAddQuiz = async () => {
    // Create Quiz from Database
    const createdQuiz = await createQuizDetail({ ...quiz, name: quizName, courseID: courseId ? courseId : "" });
    // Add newly created quiz to redux store
    dispatch(addQuiz(createdQuiz));
    // Navigate to the new quiz detail page
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${createdQuiz._id}`)
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
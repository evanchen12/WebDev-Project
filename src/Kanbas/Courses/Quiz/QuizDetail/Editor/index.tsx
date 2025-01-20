import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { KanbasState } from "../../../../Store";
import * as client from "../../Clients/quizClient";
import { useSelector } from "react-redux";
import { useState } from "react";

function Editor() {
  const {quizId}= useParams();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const handleSaveQuiz = async (quiz: any) => {
    if (isValid) {
      await client.updateQuizDetail(quiz)
      navigate(`../Quizzes/${ quizId }/Quiz Detail`)
    }
    else {
      setErrorMessage('Please fill out the date and time field')
    }

  }
  const handleCancelEdit = () => {
    navigate(`../Quizzes/${ quizId }/Quiz Detail`)
  }

  return(
    <div className="container">
      <DetailsNav />
      <Routes>
        <Route path="/" element={<Navigate to="Quiz Details Editor"/>}/> 
        <Route path="Quiz Details Editor" element={<QuizDetailsEditor setIsValid={setIsValid}/>} />
        <Route path="Quiz Questions Editor" element={<QuizQuestionsEditor/>} />
      </Routes>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex container mt-4 mb-5 gap-2">
          <button className="btn btn-light btn-md d-flex align-items-center p-3" onClick={handleCancelEdit}> Cancel </button>
          <button className="btn btn-light btn-md d-flex align-items-center p-3" onClick={() => handleSaveQuiz({...quiz, publish: true})}>
            Save & Publish </button>
          <button className="btn btn-danger btn-md d-flex align-items-center p-3" onClick={() => handleSaveQuiz(quiz)}> Save </button> 
      </div> 
    </div>
  );
}

export default Editor;

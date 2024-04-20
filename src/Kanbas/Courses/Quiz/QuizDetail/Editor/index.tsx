import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { KanbasState } from "../../../../Store";
import * as client from "../../Client/quizClient";
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
      navigate(`/Kanbas/Courses/RS101/Quizzes/${ quizId }/QuizDetail`)
    }
    else {
      setErrorMessage('Please fill out the date and time field')
    }

  }
  const handleCancelEdit = () => {
    navigate(`/Kanbas/Courses/RS101/Quizzes/${ quizId }/QuizDetail`)
  }

  return(
    <div className="container">
      <DetailsNav />
      <Routes>
        <Route path="/" element={<Navigate to="QuizDetailsEditor"/>}/> 
        <Route path="QuizDetailsEditor" element={<QuizDetailsEditor setIsValid={setIsValid}/>} />
        <Route path="QuizQuestionsEditor" element={<QuizQuestionsEditor/>} />
      </Routes>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
      <div className="d-flex">
          <button onClick={handleCancelEdit}> Cancel </button>
          <button onClick={() => handleSaveQuiz({...quiz, publish: true})}>
            Save & Publish </button>
          <button onClick={() => handleSaveQuiz(quiz)}> Save </button> 
      </div> 
    </div>
  );
}

export default Editor;

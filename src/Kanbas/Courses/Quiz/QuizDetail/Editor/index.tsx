import { Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { KanbasState } from "../../../../Store";
import * as client from "../../Client/quizClient";
import { useSelector } from "react-redux";

function Editor() {
  const {quizId}= useParams();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const navigate = useNavigate();
  const handleSaveQuiz = async (quiz: any) => {
    await client.updateQuizDetail(quiz)
    navigate(`/Kanbas/Courses/RS101/Quizzes/${ quizId }`)
  }

  return(
    <div className="container">
      <DetailsNav />
      <Routes>
        <Route path="/" element={<Navigate to="QuizDetailsEditor"/>}/> 
        <Route path="QuizDetailsEditor" element={<QuizDetailsEditor/>} />
        <Route path="QuizQuestionsEditor" element={<QuizQuestionsEditor/>} />
      </Routes>
      <div className="d-flex">
          <button> Cancel </button>
          <button onClick={() => handleSaveQuiz({...quiz, publish: true})}>
            Save & Publish </button>
          <button onClick={() => handleSaveQuiz(quiz)}> Save </button> 
      </div> 
    </div>
  );
}

export default Editor;

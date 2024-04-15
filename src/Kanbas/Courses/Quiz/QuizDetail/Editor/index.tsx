import { Navigate, Route, Routes, useParams } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../Store";
import { updateQuiz, resetQuiz, setQuiz } from "../../quizzesReducer";
import * as client from "../../Client/quizClient";

function Editor() {
  const {quizId}= useParams();
  const quiz = useSelector((state: KanbasState) => 
  state.quizzesReducer.quiz);
  const dispatch = useDispatch()

  const handleSaveQuiz = (quiz: any) => {
    // dispatch(resetQuiz());
    console.log(quiz)
    client.updateQuizDetail(quiz)
    // getQuizDetail(quiz._id).then((detail) => {   console.log("Returned after saving", detail); return dispatch(setQuiz(detail));})
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
        <Link to={`/Kanbas/Courses/RS101/Quizzes/${ quizId }`}>
          <button> Cancel </button>
          <button onClick={() => handleSaveQuiz({...quiz, publish: true})}>
            Save & Publish </button>
          <button onClick={() => handleSaveQuiz(quiz)}> Save </button> 
        </Link>
      </div> 
    </div>
  );
}

export default Editor;

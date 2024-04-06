import { Navigate, Route, Routes, useParams } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../Store";
import { updateModule } from "../../../Modules/modulesReducer";
import { updateQuiz } from "../../quizzesReducer";

function Editor() {
  const {quizId}= useParams();
  const quiz = useSelector((state: KanbasState) => 
  state.quizzesReducer.quiz);
  const dispatch = useDispatch()
  return(
    <>
      <DetailsNav />
      <Routes>
        <Route path="/" element={<Navigate to="QuizDetailsEditor"/>}/> 
        <Route path="QuizDetailsEditor" element={<QuizDetailsEditor/>} />
        <Route path="QuizQuestionsEditor" element={<QuizQuestionsEditor/>} />
      </Routes>
      <div className="d-flex">
        <Link to={`/Kanbas/Courses/RS101/Quizzes/${ quizId }`}>
          <button> Cancel </button>
          <button onClick={() => {
            dispatch(updateQuiz(quiz))
          }} > Save & Publish </button>
          <button> Save </button> 
        </Link>
      </div> 
    </>
  );
}

export default Editor;

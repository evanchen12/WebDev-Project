import { Navigate, Route, Routes } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { Link } from "react-router-dom";

function Editor() {
  return(
    <>
      <DetailsNav />
      <Routes>
        <Route path="/" element={<Navigate to="QuizDetailsEditor"/>}/> 
        <Route path="QuizDetailsEditor" element={<QuizDetailsEditor/>} />
        <Route path="QuizQuestionsEditor" element={<QuizQuestionsEditor/>} />
      </Routes>
      <Link to={`/Kanbas/Courses/RS101/Quizzes/${ "quizID" }`}>
        <button>save</button> 
      </Link> 
    </>
  );
}

export default Editor;
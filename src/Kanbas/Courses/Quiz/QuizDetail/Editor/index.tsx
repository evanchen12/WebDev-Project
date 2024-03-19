import { Navigate, Route, Routes } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

function Editor() {
  return(
    <>
      <DetailsNav />
      <Routes>
        <Route path="/" element={<Navigate to="QuizDetailsEditor"/>}/> 
        <Route path="QuizDetailsEditor" element={<QuizDetailsEditor/>} />
        <Route path="QuizQuestionsEditor" element={<QuizQuestionsEditor/>} />
      </Routes>
    </>
  );
}

export default Editor;
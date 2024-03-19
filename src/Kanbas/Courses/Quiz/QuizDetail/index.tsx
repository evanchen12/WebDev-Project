import { Route, Routes } from "react-router";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import DetailsNav from "./detailsNav";

function QuizDetail() {
  return (
    <>
      <DetailsNav />
      <Routes>
        <Route path="QuizDetailsEditor" element={<QuizDetailsEditor />} />
        <Route path="QuizQuestionsEditor" element={<QuizQuestionsEditor />} />
      </Routes>
    </>
  );
}

export default QuizDetail;
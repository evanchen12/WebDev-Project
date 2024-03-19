import { Route, Routes } from "react-router";
import DetailsNav from "./detailsNav";
import QuizDetailsEditor from "./QuizDetailsEditor";

function Editor() {
  return(
    <>
      <DetailsNav />
      <Routes>
        <Route path="QuizDetailsEditor" element={<QuizDetailsEditor/>} />
      </Routes>
    </>
  );
}

export default Editor;
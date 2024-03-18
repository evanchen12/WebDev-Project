import { Navigate, Route, Routes } from "react-router"
import QuizListScreen from "./QuizListScreen"
import QuizDetail from "./QuizDetail"

function Quizzes() {
  return (
    <>
      <h2>Quizzes</h2>
      <Routes>
        <Route path="/" element={<Navigate to="QuizListScreen" />} />
        <Route path="QuizListScreen" element={<QuizListScreen />} />
        <Route path="QuizDetail/:quizID/*" element={<QuizDetail/>} />
      </Routes>
    </>
  )
}

export default Quizzes
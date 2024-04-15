import { useParams } from "react-router"
import QuizList from "./QuizList"
import { FaEllipsisV } from "react-icons/fa";
import { addQuiz, resetQuiz, setQuiz } from "./quizzesReducer";
import { KanbasState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { createQuizDetail } from "./Client/quizClient";
import { useEffect, useState } from "react";
import { Quiz } from "../../DataType";

function Quizzes() {
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);
  const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes)
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [quizDetail, setQuizDetail] = useState<Quiz>({
        _id: "", 
        courseID: courseId ?? "",
        instruction:"This is from the database!!", 
        name: "Quiz", 
        type: "", 
        points: 1000, 
        group: "", 
        shuffle: false,
        setLimit: false,
        limit: 0,
        multiple: false, 
        showCorrect: false,
        show: "", 
        code: 0, 
        oneAtATime: false, 
        webcam: false,
        lock: false, 
        due: new Date().toString(), 
        availiable: new Date().toString(), 
        until: new Date().toString(),
        publish: false,
  });

  const handleAddQuiz = () => {
    createQuizDetail(quizDetail).then((detail) => {dispatch(addQuiz(detail))    
    });
  }

  return (
    <>
      <div className="wd-buttons">
        <button type="button">Collapse All</button>
        <button type="button">View Progress</button>
        <select id="select-one">
          <option value="All">Publish All</option>
          <option value="This">Publish This</option>
        </select>
        <button className="big-red" type="button" onClick={handleAddQuiz}>
          + Quiz</button>
        <button type="button"><FaEllipsisV /></button>
        <hr />
      </div>
      <QuizList /> <br />
    </>
  )
}

export default Quizzes
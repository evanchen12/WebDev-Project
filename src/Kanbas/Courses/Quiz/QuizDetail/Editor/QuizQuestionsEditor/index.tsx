import ChoiceQuestions from "./choiceQuestions";
import TFQuestions from "./tfQuestions";
import BlankQuestions from "./blankQuestions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ, addChoiceQ, updateChoiceQ, resetChoiceQ } from "../../../choiceQReducer";
import { useState } from "react";

function QuizQuestionsEditor() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const quizId2 = quizId?.toString();
  const [editing, setEditing] = useState(false);
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);
  const questions = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQs);

  const handleAddQuestion = () => {
    setEditing(true);
    dispatch(addChoiceQ({ ...question, quiz_id: quizId}));
  }
  const handleResetQuestion = () => {
    setEditing(false);
    dispatch(resetChoiceQ(question));
  }
  const handleUpdateQuestion = () => {
    setEditing(false);
    dispatch(updateChoiceQ(question));
    dispatch(resetChoiceQ(question));
  }

  return (
    <div className="container">
      {JSON.stringify(questions)}<br/>
      <h2>QuizQuestionsEditor</h2>
      {editing ?
        <>
          <div className="d-flex">
            <input value={ question.title } className="form-control" 
              onChange={(e) => dispatch(setChoiceQ({...question, title: e.target.value}))}/>

            <select onChange={(e) => dispatch(setChoiceQ({...question, type: e.target.value}))}>
              <option value="MC" selected={question.type === "MC"}> Multiple Choice </option>
              <option value="TF" selected={question.type === "TF"}> True/False </option>
              <option value="BLANK" selected={question.type === "BLANK"}> Fill in the Blank </option>
            </select>

            <input value={ question.points } type="number" className="form-control" 
              onChange={(e) => dispatch(setChoiceQ({...question, points: e.target.value}))}/>
          </div>

          {question.type === "MC" ? <ChoiceQuestions/> : ""}
          {question.type === "TF" ? <TFQuestions/> : ""}
          {question.type === "BLANK" ? <BlankQuestions/> : ""}

          <div className="d-flex">
            <button onClick={handleResetQuestion}> Cancel </button>
            <button onClick={handleUpdateQuestion}> Update Question </button>
          </div>
          <hr/>
        </>
      : ""}
      <button onClick={handleAddQuestion}> + Question </button>
    </div>
  )
}

export default QuizQuestionsEditor;
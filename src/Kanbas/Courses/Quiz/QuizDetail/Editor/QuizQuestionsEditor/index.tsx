import ChoiceQuestions from "./choiceQuestions";
import TFQuestions from "./tfQuestions";
import BlankQuestions from "./blankQuestions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ, addChoiceQ, updateChoiceQ, resetChoiceQ } from "../../../choiceQReducer";

function QuizQuestionsEditor() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);
  const questions = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQs);

  return (
    <div className="container">
      {JSON.stringify(questions)}<br/>
      <h2>QuizQuestionsEditor</h2>
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
        <button onClick={() => dispatch(resetChoiceQ(question))}> Cancel </button>
        <button onClick={() => dispatch(updateChoiceQ(question))}> 
          Update Question </button>
      </div>
      <hr/>
      <button onClick={() => dispatch(addChoiceQ({ ...question, quiz_id: quizId}))}> 
          + Question </button>
    </div>
  )
}

export default QuizQuestionsEditor;
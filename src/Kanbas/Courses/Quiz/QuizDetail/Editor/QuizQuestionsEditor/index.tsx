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
  const [editing, setEditing] = useState(false);
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);
  const questions = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQs);

  const handleEditQuestion = (question: any) => {
    setEditing(true);
    dispatch(setChoiceQ(question));
  }
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
      <ul>
        {questions
          .filter((q) => (q.quiz_id === quizId))
          .map((q) => (
            <li className="card">
              <div className="card-body">
                <div className="card-title d-flex">
                  <div>{q.title}</div> 
                  <div>{q.points}</div> 
                </div>
                <div className="card-text"> 
                  <button onClick={() => handleEditQuestion(q)}> edit </button>
                  <div>{q.question}</div>
                </div>
              </div>
            </li>
        ))}
      </ul>
      {editing &&
        <div className="card">
          <div className="d-flex card-title">
            <input value={ question.title } 
              onChange={(e) => dispatch(setChoiceQ({...question, title: e.target.value}))}/>

            <select onChange={(e) => dispatch(setChoiceQ({...question, type: e.target.value}))}>
              <option value="MC" selected={question.type === "MC"}> Multiple Choice </option>
              <option value="TF" selected={question.type === "TF"}> True/False </option>
              <option value="BLANK" selected={question.type === "BLANK"}> Fill in the Blank </option>
            </select>

            <div>
              Points 
              <input value={ question.points } type="number"
                onChange={(e) => dispatch(setChoiceQ({...question, points: e.target.value}))}/>
            </div>
          </div>

          <div className="card-body">
            <div className="card-text">
              {question.type === "MC" && <ChoiceQuestions/>}
              {question.type === "TF" && <TFQuestions/>}
              {question.type === "BLANK" && <BlankQuestions/>}
            </div>
            
            <div className="d-flex">
              <button onClick={handleResetQuestion}> Cancel </button>
              <button onClick={handleUpdateQuestion}> Update Question </button>
            </div>
          </div>
         
        </div>
      }
      <button onClick={handleAddQuestion}> + Question </button>
    </div>
  )
}

export default QuizQuestionsEditor;
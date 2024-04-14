import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ } from "../../../choiceQReducer"; 
import "./index.css";

function TFQuestions() {
  const dispatch = useDispatch();
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);

  return (
    <>
      Enter your question text, then select if True or False is the correct answer.<br/>
      <b><h5>Question:</h5></b>
      <textarea className="form-control" defaultValue={ question.question } 
        onChange={(e) => dispatch(setChoiceQ({...question, question: e.target.value }))}/>
        
      <b><h5>Answer:</h5></b>
      <label><input type="radio" name="option" defaultChecked={question.answer}
        onChange={() => dispatch(setChoiceQ({...question, answer: true}))}/>
        True</label><br/>
      <label><input type="radio" name="option" defaultChecked={!question.answer}
        onChange={() => dispatch(setChoiceQ({...question, answer: false}))}/>
        False</label><br/>
    </>
  )
}

export default TFQuestions;
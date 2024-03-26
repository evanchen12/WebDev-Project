import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ, updateChoiceQ } from "../../../choiceQReducer"; 

function TFQuestions() {
  const dispatch = useDispatch();
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);

  return (
    <>
      Enter your question text, then select if True or False is the correct answer.<br/>
      <b><h4>Question:</h4></b>
      <textarea defaultValue={ question.question } onChange={(e) => dispatch(setChoiceQ({...question, question: e.target.value }))}/>
      <b><h4>Answer:</h4></b>
      <label><input type="radio" name="option" defaultChecked={question.answer}
        onChange={() => dispatch(setChoiceQ({...question, answer: true}))}/>
        True</label><br/>
      <label><input type="radio" name="option" defaultChecked={!question.answer}
        onChange={() => dispatch(setChoiceQ({...question, answer: false}))}/>
        False</label><br/>

      <button onClick={() => dispatch(updateChoiceQ(question))}>Update</button><br/>
    </>
  )
}

export default TFQuestions;
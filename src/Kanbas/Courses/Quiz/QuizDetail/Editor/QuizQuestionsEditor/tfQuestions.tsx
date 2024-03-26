import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setTFQ, updateTFQ  } from "../../../tfQReducer";

function TFQuestions() {
  const dispatch = useDispatch();
  const tfQ = useSelector((state: KanbasState) => 
    state.tfQReducer.tf);
  const tfQs = useSelector((state: KanbasState) => 
    state.tfQReducer.tfQ);

  return (
    <>
      Enter your question text, then select if True or False is the correct answer.<br/>
      <b><h4>Question:</h4></b>
      <textarea defaultValue={ tfQ.question } onChange={(e) => dispatch(setTFQ({...tfQ, question: e.target.value }))}/>
      { JSON.stringify(tfQs) }
      <b><h4>Answer:</h4></b>
      <label><input type="radio" name="option" defaultChecked={tfQ.answer}
        onChange={() => dispatch(setTFQ({...tfQ, answer: true}))}/>
        True</label><br/>
      <label><input type="radio" name="option" defaultChecked={!tfQ.answer}
        onChange={() => dispatch(setTFQ({...tfQ, answer: false}))}/>
        False</label><br/>

      <button onClick={() => dispatch(updateTFQ(tfQ))}>Update</button><br/>
    </>
  )
}

export default TFQuestions;
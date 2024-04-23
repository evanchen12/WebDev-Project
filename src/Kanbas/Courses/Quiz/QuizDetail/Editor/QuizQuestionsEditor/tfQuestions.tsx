import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
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
      <div className="form-group mb-4 mt-4">
        <b><h5>Question:</h5></b>
        <Editor apiKey="fuwvr20gje9j16aatycd3yxkofqonpysg7nuf5jjsxm41iyi"
          value={ question.question }
          onEditorChange={(value, editor) => { dispatch(setChoiceQ({...question, question: editor.getContent({ format: 'text' })}))}} />
      </div>
        
      <b><h5>Answer:</h5></b>
      <div className="tf">
        <label><input type="radio" name="option" defaultChecked={question.answer}
          onChange={() => dispatch(setChoiceQ({...question, answer: true}))}/>
          True</label><br/>
        <label><input type="radio" name="option" defaultChecked={!question.answer}
          onChange={() => dispatch(setChoiceQ({...question, answer: false}))}/>
          False</label><br/>
      </div>
    </>
  )
}

export default TFQuestions;
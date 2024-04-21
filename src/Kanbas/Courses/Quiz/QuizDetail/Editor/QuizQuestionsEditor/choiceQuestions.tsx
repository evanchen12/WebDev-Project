import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ } from "../../../choiceQReducer";
import { addOption, deleteOption, updateOption, setOptions } from "../../../optionReducer";
import { Editor } from "@tinymce/tinymce-react";
import * as client from "../../../Clients/optionClient"
import "./index.css";
import { FaTrashAlt } from "react-icons/fa";

function ChoiceQuestions() {
  const dispatch = useDispatch();
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);
  const options = useSelector((state: KanbasState) => 
    state.optionReducer.options);

  const fetchOptions = async () => {
    const options = await client.findAllOptions();
    dispatch(setOptions(options));
  }
  const handleAddOption = (_id: string) => {
    client.createOption({p_id: _id, description: "", answer: "$MC-"})
    .then((option) => {
      dispatch(addOption(option));
    });
  };
  const handleUpdateOption = async (option: any) => {
    client.updateOption(option)
    .then((status) => {dispatch(updateOption(option))});
  };
  const handleDeleteOption = (_id: string) => {
    client.deleteOption(_id)
    .then((status) => {dispatch(deleteOption(_id))});
  }
  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <>
      Enter your question and multiple answers, then select the one correct answer.<br/>
      <div className="form-group mb-4 mt-4">
        <b><h5>Question:</h5></b>
        <Editor apiKey="fuwvr20gje9j16aatycd3yxkofqonpysg7nuf5jjsxm41iyi"
          value={ question.question }
          onEditorChange={(value, editor) => { dispatch(setChoiceQ({...question, question: editor.getContent({ format: 'text' })}))}} />
      </div>
      
      <b><h5>Answers:</h5></b>
      <ul className="options">
      {options
        .filter((o) => ((o.p_id === question._id) && (o.answer === "$MC-")))
        .map((o) => (
            <li key={o._id}>
              <input type="radio" name="answers" defaultChecked={o._id === question.o_id} 
                onChange={() => dispatch(setChoiceQ({ ...question, o_id: o._id }))}/>
              <input defaultValue={o.description} onChange={(e) => handleUpdateOption({ ...o, description: e.target.value })} />
              <button type="button" className="btn-secondary trash-button" onClick={() => handleDeleteOption(o._id)}>
                <FaTrashAlt className="ms-2" />
              </button>
            </li>
          ))}
      </ul>
      <button className="d-flex add-button" onClick={() => handleAddOption(question._id)}>
        + Add Another Answer
      </button>
    </>
  )
}

export default ChoiceQuestions;
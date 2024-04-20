import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ } from "../../../choiceQReducer";
import { addOption, deleteOption, updateOption, setOptions } from "../../../optionReducer";
import * as client from "../../../Clients/optionClient"
import "./index.css";
import { FaTrashAlt } from "react-icons/fa";

function BlankQuestions() {
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
    client.createOption({p_id: _id, description: "", answer: ""})
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
      Enter your question text, then define all possible correct answers for the blank.
      Students will see the question followed by a small text box to type their answer.<br/>
      <b><h5>Question:</h5></b>
      <textarea className="form-control" value={ question.question } cols={150}
        onChange={(e) => dispatch(setChoiceQ({...question, question: e.target.value }))}/>
      <b><h5>Answers:</h5></b>
      <ul className="options">
      {options
        .filter((o) => ((o.p_id === question._id) && (o.answer !== "$MC-")))
        .map((o) => (
            <li key={o._id}>
              <input defaultValue={o.description} onChange={(e) => handleUpdateOption({ ...o, description: e.target.value })} />
              <input defaultValue={o.answer} onChange={(e) => handleUpdateOption({ ...o, answer: e.target.value })} />
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

export default BlankQuestions;
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ } from "../../../choiceQReducer";
import { addOption, deleteOption, updateOption } from "../../../optionReducer";
import "./index.css";
import { FaTrashAlt } from "react-icons/fa";

function BlankQuestions() {
  const dispatch = useDispatch();
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);
  const options = useSelector((state: KanbasState) => 
    state.optionReducer.options);
  const option = useSelector((state: KanbasState) => 
    state.optionReducer.option);

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
        .filter((option) => ((option.p_id === question._id) && (option.answer !== "$MC-")))
        .map((option) => (
            <li>
              <input defaultValue={option.description} onChange={(e) => dispatch(updateOption({ ...option, description: e.target.value }))} />
              <input defaultValue={option.answer} onChange={(e) => dispatch(updateOption({ ...option, answer: e.target.value }))} />
              <button type="button" className="btn-secondary trash-button" onClick={() => dispatch(deleteOption(option.o_id))}>
                <FaTrashAlt className="ms-2" />
              </button>
            </li>
          ))}
      </ul>
      <button className="d-flex add-button" onClick={() => dispatch(addOption({ ...option, p_id: question._id}))}>
        + Add Another Answer
      </button>
    </>
  )
}

export default BlankQuestions;
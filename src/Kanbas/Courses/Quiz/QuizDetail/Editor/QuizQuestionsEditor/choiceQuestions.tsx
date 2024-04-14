import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ } from "../../../choiceQReducer";
import { addOption, deleteOption, updateOption } from "../../../optionReducer";
import "./index.css";
import { FaTrashAlt } from "react-icons/fa";

function ChoiceQuestions() {
  const dispatch = useDispatch();
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);
  const options = useSelector((state: KanbasState) => 
    state.optionReducer.options);
  const option = useSelector((state: KanbasState) => 
    state.optionReducer.option);

  return (
    <>
      Enter your question and multiple answers, then select the one correct answer.<br/>
      <b><h5>Question:</h5></b>
      <textarea className="form-control" value={ question.question } 
        onChange={(e) => dispatch(setChoiceQ({...question, question: e.target.value }))}/>
      <b><h5>Answers:</h5></b>
      <ul className="options">
      {options
        .filter((option) => ((option.p_id === question._id) && (option.answer === "$MC-")))
        .map((option) => (
            <li>
              <input type="radio" name="answers" defaultChecked={option.o_id === question.o_id} 
                onChange={() => dispatch(setChoiceQ({ ...question, o_id: option.o_id }))}/>
              <input defaultValue={option.description} onChange={(e) => dispatch(updateOption({ ...option, description: e.target.value }))} />
              <button type="button"  onClick={() => dispatch(deleteOption(option.o_id))}>
                <FaTrashAlt className="ms-2" />
              </button>
            </li>
          ))}
      </ul>
      <button className="add-button" onClick={() => dispatch(addOption({ ...option, p_id: question._id, answer: "$MC-"}))}>
        + Add Another Answer
      </button>
    </>
  )
}

export default ChoiceQuestions;
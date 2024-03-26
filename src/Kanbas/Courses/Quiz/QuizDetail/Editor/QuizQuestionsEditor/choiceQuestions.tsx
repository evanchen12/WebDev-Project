import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ } from "../../../choiceQReducer";
import { setOption, addOption, deleteOption, setOptionAnswer, updateOption } from "../../../optionReducer";

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
      <b><h4>Question:</h4></b>
      <textarea value={ question.question } 
        onChange={(e) => dispatch(setChoiceQ({...question, question: e.target.value }))}/>
      <b><h4>Answers:</h4></b>
      {JSON.stringify(options)}
      <ul>
      {options
        .filter((option) => option.p_id === question.p_id)
        .map((option) => (
            <li>
              <input type="radio" name="answers" defaultChecked={Boolean(option.answer)} 
                onChange={(e) => dispatch(setOptionAnswer({ ...option, answer: e.target.checked.toString() }))}/>
              <input defaultValue={option.description} onChange={(e) => dispatch(setOption({ ...option, description: e.target.value }))} />
              <button type="button" onClick={() => dispatch(deleteOption(option.o_id))}>Delete</button>
            </li>
          ))}
      </ul>
      <button onClick={() => dispatch(updateOption(option))}>Update</button><br/>
      <button onClick={() => dispatch(addOption({ ...option, p_id: question.p_id}))}>Add another Answer</button>
    </>
  )
}

export default ChoiceQuestions;
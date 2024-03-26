import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ } from "../../../multChoiceQuestionReducer";
import { setOption, addOption, deleteOption, updateOption } from "../../../optionReducer";

function BlankQuestions() {
  const dispatch = useDispatch();
  const choiceQ = useSelector((state: KanbasState) => 
    state.multChoiceQuestionReducer.multChoiceQuestion);
  const options = useSelector((state: KanbasState) => 
    state.optionReducer.options);
  const option = useSelector((state: KanbasState) => 
    state.optionReducer.option);

  return (
    <>
      {JSON.stringify(options)}
      Enter your question text, then define all possible correct answers for the blank.
      Students will see the question followed by a small text box to type their answer.<br/>
      <b><h4>Question:</h4></b>
      <textarea value={ choiceQ.question }
        onChange={(e) => dispatch(setChoiceQ({...choiceQ, question: e.target.value }))}/>
      <b><h4>Answers:</h4></b>
      {JSON.stringify(option)}
      <ul>
      {options
        .filter((option) => option.p_id === choiceQ.p_id)
        .map((option) => (
            <li>
              <input defaultValue={option.description} onChange={(e) => dispatch(setOption({ ...option, description: e.target.value }))} />
              <input defaultValue={option.answer} onChange={(e) => dispatch(setOption({ ...option, answer: e.target.value }))} />
              <button type="button" onClick={() => dispatch(deleteOption(option.o_id))}>Delete</button>
            </li>
          ))}
      </ul>
      <button onClick={() => dispatch(updateOption(option))}>Update</button><br/>
      <button onClick={() => dispatch(addOption({ ...option, p_id: choiceQ.p_id}))}>Add another Answer</button>
    </>
  )
}

export default BlankQuestions;
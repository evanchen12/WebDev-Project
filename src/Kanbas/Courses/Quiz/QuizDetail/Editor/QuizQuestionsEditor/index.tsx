import { UseSelector, useSelector } from "react-redux";
import store from "../../../../../Store";
import multChoiceQuestionReducer from "../../../multChoiceQuestionReducer";


function QuizQuestionsEditor() {

  const multChoiceQuestions = useSelector((store: any) => store.multChoiceQuestionReducer.multChoiceQuestion)

  return (
    <div>
      <h2>QuizQuestionsEditor</h2>
      <h2>{JSON.stringify(multChoiceQuestions)}</h2>
    </div>
  )
}

export default QuizQuestionsEditor;
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ, addChoiceQ, updateChoiceQ, resetChoiceQ, deleteChoiceQ, setChoiceQs } from "../../../choiceQReducer";
import { useEffect, useState } from "react";
import ChoiceQuestions from "./choiceQuestions";
import TFQuestions from "./tfQuestions";
import BlankQuestions from "./blankQuestions";
import * as client from "../../../Clients/choiceQClient"
import { FaPen, FaTrashAlt } from "react-icons/fa";
import "./index.css";

function QuizQuestionsEditor() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const [editing, setEditing] = useState(false);
  const question = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQ);
  const questions = useSelector((state: KanbasState) => 
    state.choiceQReducer.choiceQs);

  const fetchQuestions = async () => {
    const questions = await client.findAllChoiceQs(quizId);
    dispatch(setChoiceQs(questions));
  };
  const handleResetQuestion = () => {
    setEditing(false);
    dispatch(resetChoiceQ(question));
  };
  const handleEditQuestion = (question: any) => {
    setEditing(true);
    dispatch(setChoiceQ(question));
  };
  const handleAddQuestion = () => {
    setEditing(true);
    client.createChoiceQ({ ...question, quiz_id: quizId})
    .then((question) => {
      dispatch(addChoiceQ(question));
    });
  };
  const handleUpdateQuestion = async () => {
    setEditing(false);
    client.updateChoiceQ(question)
    .then((status) => {dispatch(updateChoiceQ(question))});
    dispatch(resetChoiceQ(question));
  };
  const handleDeleteQuestion = (_id: string) => {
    client.deleteChoiceQ(_id)
    .then((status) => {dispatch(deleteChoiceQ(_id))});
    if (_id === question._id) {
      setEditing(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  return (
    <div>
      <ul className="wd-questions">
        {questions
          .filter((q) => (q.quiz_id === quizId))
          .map((q) => (
            <li>
                <div className="d-flex title">
                  <div>{q.title}</div> 
                  <div className="point">{q.points} pts</div> 
                </div>
                <div className="body"> 
                  <div className="question-button">
                    <button className="btn-secondary" onClick={() => handleEditQuestion(q)}>
                      <FaPen className="ms-2" />
                    </button>
                    <button className="btn-secondary" onClick={() => handleDeleteQuestion(q._id)}>
                      <FaTrashAlt className="ms-2" />
                    </button>
                  </div>
                  <div>{q.question}</div>
                </div>
            </li>
        ))}
      </ul>
      {editing &&
        <div className="card">
          <div className="d-flex card-title">
            <input value={ question.title } 
              onChange={(e) => dispatch(setChoiceQ({...question, title: e.target.value}))}/>

            <select onChange={(e) => dispatch(setChoiceQ({...question, type: e.target.value}))}>
              <option value="MC" selected={question.type === "MC"}> Multiple Choice </option>
              <option value="TF" selected={question.type === "TF"}> True/False </option>
              <option value="BLANK" selected={question.type === "BLANK"}> Fill in the Blank </option>
            </select>

            <div>
              pts  
              <input value={ question.points } type="number"
                onChange={(e) => dispatch(setChoiceQ({...question, points: e.target.value}))}/>
            </div>
          </div>

          <div className="card-body">
            <div className="card-text">
              {question.type === "MC" && <ChoiceQuestions/>}
              {question.type === "TF" && <TFQuestions/>}
              {question.type === "BLANK" && <BlankQuestions/>}
            </div>
            
            <div className="d-flex buttons-2">
              <button onClick={handleResetQuestion}> Cancel </button>
              <button className="big-red" onClick={handleUpdateQuestion}> Update Question </button>
            </div>
          </div>
         
        </div>
      }
      <div className="buttons">
        <div className="text-center">
          <button onClick={handleAddQuestion}> + New Question </button>
          <button> + New Question Group </button>
          <button> Find Question </button>
        </div>
      </div>
    </div>
  )
}

export default QuizQuestionsEditor;
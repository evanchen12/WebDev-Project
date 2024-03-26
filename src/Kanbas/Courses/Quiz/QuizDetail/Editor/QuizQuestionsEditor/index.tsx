import ChoiceQuestions from "./choiceQuestions";
import TFQuestions from "./tfQuestions";
import BlankQuestions from "./blankQuestions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../Store";
import { setChoiceQ, addChoiceQ, updateChoiceQ, resetChoiceQ } from "../../../multChoiceQuestionReducer";
import { setTFQ, addTFQ, updateTFQ } from "../../../tfQReducer";
import { useState } from "react";


function QuizQuestionsEditor() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const choiceQ = useSelector((state: KanbasState) => 
    state.multChoiceQuestionReducer.multChoiceQuestion);
  const choiceQs = useSelector((state: KanbasState) => 
    state.multChoiceQuestionReducer.multChoiceQuestions);
  const tfQ = useSelector((state: KanbasState) => 
    state.tfQReducer.tf);
  const [qType, setQType] = useState("MC");

  const handleQType = (e: any) => {
    setQType(e.target.value);
    if (qType === "TF") {
      dispatch(setTFQ({...tfQ, type: e.target.value}))
    } else {
      dispatch(setChoiceQ({...choiceQ, type: e.target.value }))
    }
  }
  const handleQTitle = (e: any) => {
    if (qType === "TF") {
      dispatch(setTFQ({...tfQ, title: e.target.value}))
    } else {
      dispatch(setChoiceQ({...choiceQ, title: e.target.value }))
    }
  }
  const handleQPoint = (e: any) => {
    if (qType === "TF") {
      dispatch(setTFQ({...tfQ, points: e.target.value}))
    } else {
      dispatch(setChoiceQ({...choiceQ, points: e.target.value }))
    }
  }

  return (
    <div className="container">
      {JSON.stringify(choiceQs)}<br/>
      <h2>QuizQuestionsEditor</h2>
      <div className="d-flex">
        <input value={ (qType === "TF" ? tfQ.title : choiceQ.title) } className="form-control" 
          onChange={(e) => handleQTitle(e)}/>

        <select onChange={(e) => handleQType(e)}>
          <option value="MC"> Multiple Choice </option>
          <option value="TF"> True/False </option>
          <option value="BLANK"> Fill in the Blank </option>
        </select>

        <input value={ (qType === "TF" ? tfQ.points : choiceQ.points) } className="form-control" 
          onChange={(e) => handleQPoint(e)}/>
      </div>

      {qType === "MC" ? <ChoiceQuestions/> : ""}
      {qType === "TF" ? <TFQuestions/> : ""}
      {qType === "BLANK" ? <BlankQuestions/> : ""}

      <div className="d-flex">
        <button onClick={() => dispatch(resetChoiceQ(choiceQ))}> Cancel </button>
        <button onClick={() => (qType === "TF" ? dispatch(updateTFQ(tfQ)) : dispatch(updateChoiceQ(choiceQ)))}> 
          Update Question </button>
      </div>
      <hr/>
      <button onClick={() => (qType === "TF" ? dispatch(addTFQ({ ...tfQ, quiz_id: quizId})) : dispatch(addChoiceQ({ ...choiceQ, quiz_id: quizId})))}> 
          + Question </button>
    </div>
  )
}

export default QuizQuestionsEditor;
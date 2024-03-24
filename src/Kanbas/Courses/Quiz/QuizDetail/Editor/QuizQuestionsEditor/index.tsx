import ChoiceQuestions from "./choiceQuestions";
import TFQuestions from "./tfQuestions";
import BlankQuestions from "./blankQuestions";
import { useState } from "react";


function QuizQuestionsEditor() {
  return (
    <div className="container">
      <h2>QuizQuestionsEditor</h2>
      <div className="d-flex">
        <input value={ 'choiceQ.problem' } className="form-control" />
        <select onChange={(e) => {setType(e.target.value)}}>
          <option value="MC"> Multiple Choice </option>
          <option value="TF"> True/False </option>
          <option value="BLANK"> Fill in the Blank </option>
        </select>
        <input value={ 'choiceQ.points' } className="form-control" />
      </div>
      {qtype === "MC" ? <ChoiceQuestions/> : ""}
      {qtype === "TF" ? <TFQuestions/> : ""}
      {qtype === "BLANK" ? <BlankQuestions/> : ""}
      <div className="d-flex">
        <button> Cancel </button>
        <button> Update Question </button>
      </div>
      <hr/>
      <button> + Question </button>
    </div>
  )
}

export default QuizQuestionsEditor;
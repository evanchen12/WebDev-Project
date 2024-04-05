import { useParams } from "react-router";

function QuizDetailsEditor() {

  return (
    <div>
      <h2>QuizDetailsEditor</h2>
      <div className="d-flex align-items-center gap-4 mb-3">
        <div>Points 0</div>
        <div>Not Published</div>
        <button className="btn btn-light d-flex align-items-center">:</button>
      </div>
      <input type="text" defaultValue={"Unnamed Quiz"} placeholder="Quiz Name" />
      <div>Quiz Instructions:</div>
      <input type="text" />
      <div className="d-flex gap-4">
        <label htmlFor="quiz-select">Quiz Type:</label>

        <select name="quiz" id="quiz-select">
          <option value="graded">Graded Quiz</option>
        </select>
      </div>
      <div className="d-flex gap-4">
        <label htmlFor="quiz-select">Assignment Group</label>

        <select name="quiz" id="quiz-select">
          <option value="assignments">ASSIGNMENTS</option>
        </select>
      </div>
      <div>
        <div>Options</div>
        <div>
          <input type="checkbox" id="shuffle-answers" name="shuffle-answers" checked />
          <label htmlFor="shuffle-answers">Shuffle Answers</label>
        </div>

        <div>
          <input type="checkbox" id="time-limit" name="time-limit" />
          <label htmlFor="time-limit">Time Limit</label>
        </div>

        <div>
          <input type="text" id="minutes" name="minutes" />
          <label htmlFor="minutes">Minutes</label>
        </div>
        <div className="border">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" />
          <label htmlFor="allow-mult-atmpt">Allow Multiple Attempts</label>
        </div>
      </div>
      <div className="">
        <div>Assign to</div>
        <div>
          <div>Due</div>
          <input type="date" />
        </div>
        <div>
          <div>Available from</div>
          <input type="date" />
        </div>
        <div>
          <div>Until</div>
          <input type="date" />
        </div>
        <button className="w-100">+ Add</button>
      </div>
    </div>
  )
}

export default QuizDetailsEditor;
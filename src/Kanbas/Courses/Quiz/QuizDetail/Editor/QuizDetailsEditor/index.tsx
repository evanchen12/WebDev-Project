
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../../../../Store";
import { setQuiz } from "../../../quizzesReducer";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "path";
import { setTextRange } from "typescript";

function QuizDetailsEditor() {
  const { quizId } = useParams()
  const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
  const quiz = quizList.filter((quiz) => quiz._id === quizId)[0]
  const dispatch = useDispatch();
  //const isDefaultSetting = quiz === undefined ? true : false;
  //const [shuffle, setShuffle] = useState(isDefaultSetting ? true : quiz.shuffle);
  const [shuffle, setShuffle] = useState(true);
  const [quizType, setQuizType] = useState(quiz.type);
  const [islimit, setIsLimit] = useState(true);
  const [limitAmt, setLimitAmt] = useState(20);
  const [multiple, setMultiple] = useState(quiz.multiple);
  const [instruction, setInstruction] = useState(quiz.instruction);
  const [showCorrect, setShowCorrect] = useState(quiz.showCorrect);
  const [accessCode, SetAccessCode] = useState(quiz.code);
  const [isOneAtATime, setOneAtTime] = useState(quiz.oneAtATime);
  const [isWebCam, setIsWebCam] = useState(quiz.webcam);
  const [isLock, setIsLock] = useState(quiz.lock);
  const [dueDate, setDueDate] = useState(quiz.due);
  const [availableDate, setAvailableDate] = useState(quiz.availiable);
  const [untilDate, setUntilDate] = useState(quiz.until);

  // If the current value of shuffle is false in Quiz JSON object,
  // and "Shuffle Answers" is by default checked, then clicking on Save button without doing anything else will fail, 
  // because useState/dispatch is updated onChange, which means the user needs to click on the html for state to update. 
  // In addition, having a single dispatch call is cleaner approach than having multiple dispatch under every single
  // onChange trigger. 
  useEffect(() => {
    dispatch(setQuiz({ ...quiz, shuffle: shuffle, limit: limitAmt, setLimit: islimit, multiple: multiple, showCorrect: showCorrect, webcam: isWebCam, code:accessCode, oneAtATime:isOneAtATime, lock:isLock, due:dueDate, availiable:availableDate, until:untilDate, instruction:instruction, type:quizType}))
  }, [shuffle, islimit, limitAmt, multiple, showCorrect, accessCode, isOneAtATime, isWebCam, isLock, dueDate, availableDate, instruction, untilDate, quizType]);


  return (
    <div>
      <div className="d-flex align-items-center gap-4 mb-3">
        <div>Points {quiz.points}</div>
        <div>Not Published</div>
        <button className="btn btn-light d-flex align-items-center">:</button>
      </div>
      <input type="text" defaultValue={quiz.name} placeholder="Quiz Name"
        onChange={(e) => {
          dispatch(setQuiz({ ...quiz, name: e.target.value }))
        }}
      />
      <div className="form-group mb-4 mt-4">
        <label htmlFor="instruction">Quiz Instructions:</label>
        <Editor apiKey="fuwvr20gje9j16aatycd3yxkofqonpysg7nuf5jjsxm41iyi" initialValue={quiz.instruction} onEditorChange={(value, editor) => {setInstruction(editor.getContent({format: 'text'}))}} />
        {/* <textarea className="form-control" id="instruction" rows={3} value={instruction} ></textarea> */}
      </div>
      <div className="d-flex gap-4">
        <label htmlFor="quiz-select">Quiz Type:</label>

        <select name="quiz" id="quiz-select" onChange={(e) => {setQuizType(e.target.value)}}>
          <option value="Graded">Graded Quiz</option>
          <option value="Practice">Practice Quiz</option>
          <option value="Survey">Graded Survey</option>
          <option value="Upgraded">Upgraded Survey</option>
        </select>
      </div>
      <label htmlFor="points">Points: </label>
      <input type="number" className="" id="points"
        onChange={(e) => {
          dispatch(setQuiz({ ...quiz, points: e.target.value }))
        }}
      />
      <div className="d -flex gap-4">
        <label htmlFor="quiz-select">Assignment Group</label>

        <select name="quiz" id="quiz-select">
          <option value="Quizzes">Quizzes</option>
          <option value="Exams">Exams</option>
          <option value="Assignments">Assignments</option>
          <option value="Project">Project</option>
        </select>
      </div>
      <div>
        <div>Options</div>
        <div>
          <input type="checkbox" id="shuffle-answers" name="shuffle-answers" defaultChecked={true} onChange={(e) => {
            //dispatch(setQuiz({...quiz, shuffle: e.target.checked}))
            setShuffle(e.target.checked)
          }} />
          <label htmlFor="shuffle-answers">Shuffle Answers</label>
        </div>

        <div>
          <input type="checkbox" id="time-limit" name="time-limit" defaultChecked={true} onChange={(e) => { setIsLimit(e.target.checked) }} />
          <label htmlFor="time-limit" >Time Limit </label>
          <span style={{ display: islimit ? "block" : "none" }}>
            <input type="number" id="minutes" name="minutes" placeholder="20" value={limitAmt} onChange={(e) => { 
              setLimitAmt(parseInt(e.target.value));
              }} />
          <label htmlFor="minutes">Minutes</label>

          </span>
        </div>
        <div className="border">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" defaultChecked={multiple} onChange={(e) => {setMultiple(e.target.checked)}}/>
          <label htmlFor="allow-mult-atmpt">Allow Multiple Attempts</label>
        </div>
        <div className="border">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" defaultChecked={showCorrect} onChange={(e) => {
            setShowCorrect(e.target.checked)
          }}/>
          <label htmlFor="allow-mult-atmpt">Show Correct Answers</label>
        </div>
        <div>
          <label htmlFor="access-code">Access Code: </label>
          <input type="number" name="access-code" id="access-code" value={accessCode} onChange={(e) => {SetAccessCode(parseInt(e.target.value))}} />
        </div>
        <div>
          <label htmlFor="one-question">One Question at a Time </label>
          <input type="checkbox" id="one-question" defaultChecked={isOneAtATime} onChange={(e) => {setOneAtTime(e.target.checked)}} />
        </div>
        <div>
          <label htmlFor="webcam">Webcam Required</label>
          <input type="checkbox" id="webcam" defaultChecked={isWebCam} onChange={(e) => {setIsWebCam(e.target.checked)}}/>
        </div>
        <div>
          <label htmlFor="lock-question">Lock Questions After Answering </label>
          <input type="checkbox" id="lock-question" defaultChecked={isLock} onChange={(e) => {setIsLock(e.target.checked)}}/>
        </div>
      </div>
      <div className="w-50">
        <div>
          <div>Due</div>
          <input type="datetime-local" className="form-control" defaultValue={dueDate?.toLocaleString()} onChange={(e)=>{ setDueDate(e.target.value)}} />
        </div>
        <div>
          <div>Available from</div>
          <input type="datetime-local" className="form-control" defaultValue={availableDate?.toLocaleString()} onChange={(e)=>{ setAvailableDate(e.target.value)}}/>
        </div>
        <div>
          <div>Until</div>
          <input type="datetime-local" className="form-control" defaultValue={untilDate?.toString()} onChange={(e)=>{
            setUntilDate(e.target.value)}}/>
        </div>
        <button className="w-100">+ Add</button>
      </div>
    </div>
  )
}

export default QuizDetailsEditor;
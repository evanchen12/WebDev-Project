
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../../../../Store";
import { setQuiz } from "../../../quizzesReducer";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "path";
import { setTextRange } from "typescript";
import * as client from "../../../Client/quizClient";
import { Quiz } from "../../../../../DataType";
import Kanbas from "../../../../..";


function QuizDetailsEditor() {

  const { quizId } = useParams()

  const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes)

  console.log(quizzes)
  // let quiz : Quiz;
  // const dispatch = useDispatch();
  // const [text, setText] = useState("");

  // // Grab the current quiz detail
  // const fetchQuizDetailById = async () => {
  //   if (quizId) {
  //     await client.getQuizDetailById(quizId).then((quiz) => {dispatch(setQuiz(quiz))});
  //     quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
  //   }
  // }


  // useEffect(() => {
  //   fetchQuizDetailById();
  // }, [quizId]);




  return(<></>)
  // return (
  //   <div>
  //     <div className="d-flex align-items-center gap-4 mb-3">
  //       <div>Points {quiz.points}</div>
  //       <div>{quiz.publish ? "Published" : "Not Published"}</div>
  //       <button className="btn btn-light d-flex align-items-center">:</button>
  //     </div>
  //     <input type="text" defaultValue={quiz.name} placeholder="Quiz Name"
  //       onChange={(e) => {
  //         dispatch(setQuiz({ ...quiz, name: e.target.value }))
  //       }}
  //     />
  //     <div className="form-group mb-4 mt-4">
  //       <label htmlFor="instruction">Quiz Instructions:</label>
  //       <Editor apiKey="fuwvr20gje9j16aatycd3yxkofqonpysg7nuf5jjsxm41iyi" 
  //       initialValue={text}
  //       onInit = {(evt, editor) => {
  //         setText(editor.getContent({format: 'text'}))
  //       }} 
  //       value=""
  //       onEditorChange={(value, editor) => { dispatch(setQuiz({ ...quiz, instruction: editor.getContent({ format: 'text' }) })); }} />
  //     </div>
  //     <div className="d-flex gap-4">
  //       <label htmlFor="quiz-select">Quiz Type:</label>

  //       <select name="quiz" id="quiz-select" onChange={(e) => dispatch(setQuiz({ ...quiz, type: e.target.value }))}>
  //         <option value="Graded">Graded Quiz</option>
  //         <option value="Practice">Practice Quiz</option>
  //         <option value="Survey">Graded Survey</option>
  //         <option value="Upgraded">Upgraded Survey</option>
  //       </select>
  //     </div>
  //     <label htmlFor="points">Points: </label>
  //     <input type="number" className="" id="points"
  //       onChange={(e) => {
  //         dispatch(setQuiz({ ...quiz, points: e.target.value }))
  //       }}
  //     />
  //     <div className="d -flex gap-4">
  //       <label htmlFor="quiz-select">Assignment Group</label>

  //       <select name="quiz" id="quiz-select">
  //         <option value="Quizzes">Quizzes</option>
  //         <option value="Exams">Exams</option>
  //         <option value="Assignments">Assignments</option>
  //         <option value="Project">Project</option>
  //       </select>
  //     </div>
  //     <div>
  //       <div>Options</div>
  //       <div>
  //         <input type="checkbox" id="shuffle-answers" name="shuffle-answers" defaultChecked={true}
  //           onChange={(e) => {
  //             dispatch(setQuiz({ ...quiz, shuffle: e.target.checked }))
  //           }} />
  //         <label htmlFor="shuffle-answers">Shuffle Answers</label>
  //       </div>

  //       <div>
  //         <input type="checkbox" id="time-limit" name="time-limit" defaultChecked={true}
  //           onChange={(e) => { dispatch(setQuiz({ ...quiz, setLimit: e.target.checked })) }} />
  //         <label htmlFor="time-limit" >Time Limit </label>
  //         <span style={{ display: quiz.setLimit ? "block" : "none" }}>
  //           <input type="number" id="minutes" name="minutes" placeholder="20" value={quiz.limit}
  //             onChange={(e) => dispatch(setQuiz({ ...quiz, limit: e.target.value }))} />
  //           <label htmlFor="minutes">Minutes</label>

  //         </span>
  //       </div>
  //       <div className="border">
  //         <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" defaultChecked={quiz.multiple}
  //           onChange={(e) => dispatch(setQuiz({ ...quiz, multiple: e.target.checked }))} />
  //         <label htmlFor="allow-mult-atmpt">Allow Multiple Attempts</label>
  //       </div>
  //       <div className="border">
  //         <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" defaultChecked={quiz.showCorrect}
  //           onChange={(e) => {
  //             dispatch(setQuiz({ ...quiz, showCorrect: e.target.checked }))
  //           }} />
  //         <label htmlFor="allow-mult-atmpt">Show Correct Answers</label>
  //       </div>
  //       <div>
  //         <label htmlFor="access-code">Access Code: </label>
  //         <input type="number" name="access-code" id="access-code" value={quiz.code} onChange={(e) =>
  //           dispatch(setQuiz({ ...quiz, code: e.target.value }))
  //         } />
  //       </div>
  //       <div>
  //         <label htmlFor="one-question">One Question at a Time </label>
  //         <input type="checkbox" id="one-question" defaultChecked={quiz.oneAtATime} onChange={(e) =>
  //           dispatch(setQuiz({ ...quiz, oneAtATime: e.target.checked }))
  //         } />
  //       </div>
  //       <div>
  //         <label htmlFor="webcam">Webcam Required</label>
  //         <input type="checkbox" id="webcam" defaultChecked={quiz.webcam} onChange={(e) =>
  //           dispatch(setQuiz({ ...quiz, webcam: e.target.checked }))} />
  //       </div>
  //       <div>
  //         <label htmlFor="lock-question">Lock Questions After Answering </label>
  //         <input type="checkbox" id="lock-question" defaultChecked={quiz.lock} onChange={(e) =>
  //           dispatch(setQuiz({ ...quiz, lock: e.target.checked }))
  //         } />
  //       </div>
  //     </div>
  //     <div className="w-50">
  //       <div>
  //         <div>Due</div>
  //         <input type="datetime-local" className="form-control" defaultValue={quiz.due.toString().slice(0, -8)}
  //           onChange={(e) =>
  //             dispatch(setQuiz({ ...quiz, due: e.target.value }))
  //           } />
  //       </div>
  //       <div>
  //         <div>Available from</div>
  //         <input type="datetime-local" className="form-control" defaultValue={quiz.availiable.toString().slice(0, -8)}
  //           onChange={(e) =>
  //             dispatch(setQuiz({ ...quiz, availiable: e.target.value }))
  //           } />
  //       </div>
  //       <div>
  //         <div>Until</div>
  //         <input type="datetime-local" className="form-control" defaultValue={quiz.until.toString().slice(0, -8)}
  //           onChange={(e) => {
  //             dispatch(setQuiz({ ...quiz, until: e.target.value }));
  //           }
  //           }
  //         />
  //       </div>
  //       <button className="w-100">+ Add</button>
  //     </div>
  //   </div>
  // )
}

export default QuizDetailsEditor;
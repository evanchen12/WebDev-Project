
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../../../../Store";
import { setQuiz } from "../../../quizzesReducer";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "path";
import { setTextRange } from "typescript";
import * as client from "../../../Client/quizClient";


function QuizDetailsEditor() {

  const { quizId } = useParams()

  let quizDetail = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);

  const dispatch = useDispatch();

  const fetchQuizDetail = async () => {
    if (quizId) {
      quizDetail = await client.getQuizDetailById(quizId);
    }
    dispatch(setQuiz(quizDetail))
  }

  useEffect(() => {
    fetchQuizDetail();
  }, [quizId]);




  return (
    <div>
      <div className="d-flex align-items-center gap-4 mb-3">
        <div>Points {quizDetail.points}</div>
        <div>Not Published</div>
        <button className="btn btn-light d-flex align-items-center">:</button>
      </div>
      <input type="text" defaultValue={quizDetail.name} placeholder="Quiz Name"
        onChange={(e) => {
          dispatch(setQuiz({ ...quizDetail, name: e.target.value }))
        }}
      />
      <div className="form-group mb-4 mt-4">
        <label htmlFor="instruction">Quiz Instructions:</label>
        <Editor apiKey="fuwvr20gje9j16aatycd3yxkofqonpysg7nuf5jjsxm41iyi" initialValue={quizDetail.instruction} onEditorChange={(value, editor) => { dispatch(setQuiz({ ...quizDetail, instruction: editor.getContent({ format: 'text' }) })); }} />
        {/* setInstruction(editor.getContent({format: 'text'})) */}
        {/* <textarea className="form-control" id="instruction" rows={3} value={instruction} ></textarea> */}
      </div>
      <div className="d-flex gap-4">
        <label htmlFor="quiz-select">Quiz Type:</label>

        <select name="quiz" id="quiz-select" onChange={(e) => dispatch(setQuiz({ ...quizDetail, type: e.target.value }))}>
          <option value="Graded">Graded Quiz</option>
          <option value="Practice">Practice Quiz</option>
          <option value="Survey">Graded Survey</option>
          <option value="Upgraded">Upgraded Survey</option>
        </select>
      </div>
      <label htmlFor="points">Points: </label>
      <input type="number" className="" id="points"
        onChange={(e) => {
          dispatch(setQuiz({ ...quizDetail, points: e.target.value }))
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
          <input type="checkbox" id="shuffle-answers" name="shuffle-answers" defaultChecked={true}
            onChange={(e) => {
              dispatch(setQuiz({ ...quizDetail, shuffle: e.target.checked }))
            }} />
          <label htmlFor="shuffle-answers">Shuffle Answers</label>
        </div>

        <div>
          <input type="checkbox" id="time-limit" name="time-limit" defaultChecked={true}
            onChange={(e) => { dispatch(setQuiz({ ...quizDetail, setLimit: e.target.checked })) }} />
          <label htmlFor="time-limit" >Time Limit </label>
          <span style={{ display: quizDetail.setLimit ? "block" : "none" }}>
            <input type="number" id="minutes" name="minutes" placeholder="20" value={quizDetail.limit}
              onChange={(e) => dispatch(setQuiz({ ...quizDetail, limit: e.target.value }))} />
            <label htmlFor="minutes">Minutes</label>

          </span>
        </div>
        <div className="border">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" defaultChecked={quizDetail.multiple}
            onChange={(e) => dispatch(setQuiz({ ...quizDetail, multiple: e.target.checked }))} />
          <label htmlFor="allow-mult-atmpt">Allow Multiple Attempts</label>
        </div>
        <div className="border">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" defaultChecked={quizDetail.showCorrect}
            onChange={(e) => {
              dispatch(setQuiz({ ...quizDetail, showCorrect: e.target.checked }))
            }} />
          <label htmlFor="allow-mult-atmpt">Show Correct Answers</label>
        </div>
        <div>
          <label htmlFor="access-code">Access Code: </label>
          <input type="number" name="access-code" id="access-code" value={quizDetail.code} onChange={(e) =>
            dispatch(setQuiz({ ...quizDetail, code: e.target.value }))
          } />
        </div>
        <div>
          <label htmlFor="one-question">One Question at a Time </label>
          <input type="checkbox" id="one-question" defaultChecked={quizDetail.oneAtATime} onChange={(e) =>
            dispatch(setQuiz({ ...quizDetail, oneAtATime: e.target.checked }))
          } />
        </div>
        <div>
          <label htmlFor="webcam">Webcam Required</label>
          <input type="checkbox" id="webcam" defaultChecked={quizDetail.webcam} onChange={(e) =>
            dispatch(setQuiz({ ...quizDetail, webcam: e.target.checked }))} />
        </div>
        <div>
          <label htmlFor="lock-question">Lock Questions After Answering </label>
          <input type="checkbox" id="lock-question" defaultChecked={quizDetail.lock} onChange={(e) =>
            dispatch(setQuiz({ ...quizDetail, lock: e.target.checked }))
          } />
        </div>
      </div>
      <div className="w-50">
        <div>
          <div>Due</div>
          <input type="datetime-local" className="form-control" defaultValue={quizDetail.due.toString().slice(0, -8)}
            onChange={(e) =>
              dispatch(setQuiz({ ...quizDetail, due: e.target.value }))
            } />
        </div>
        <div>
          <div>Available from</div>
          <input type="datetime-local" className="form-control" defaultValue={quizDetail.availiable.toString().slice(0, -8)}
            onChange={(e) =>
              dispatch(setQuiz({ ...quizDetail, availiable: e.target.value }))
            } />
        </div>
        <div>
          <div>Until</div>
          <input type="datetime-local" className="form-control" defaultValue={quizDetail.until.toString().slice(0, -8)}
            onChange={(e) => {
              dispatch(setQuiz({ ...quizDetail, until: e.target.value }));
            }
            }
          />
        </div>
        <button className="w-100">+ Add</button>
      </div>
    </div>
  )
}

export default QuizDetailsEditor;
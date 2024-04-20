
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "path";
import * as client from "../../../Client/quizClient";
import { Quiz } from "../../../../../DataType";
import { useDispatch } from "react-redux";
import { setQuiz } from "../../../quizzesReducer";


interface ChildComponentProps {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function QuizDetailsEditor({setIsValid} : ChildComponentProps) {

  const { quizId } = useParams()
  const dispatch = useDispatch()
  const [quiz, setThisQuiz] = useState<Quiz>({
    _id: "",
    courseID: "",
    instruction: "",
    name: "New Quiz",
    type: "Graded Quiz",
    points: 0,
    group: "Quizzes",
    shuffle: true,
    setLimit: true,
    limit: 20,
    multiple: false,
    showCorrect: false,
    code: '',
    oneAtATime: false,
    webcam: false,
    lock: false,
    due: "",
    availiable: "",
    until: "",
    publish: false
  })

  const [text, setText] = useState("");

  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    handleClick({ ...quiz, instruction: content });
  };

  const handleSetTime = (timeText: string) => {
    const isDueFilled = timeText.length >= 16;
    const isAvailableFilled = timeText.length >= 16;
    const isUntilFilled = timeText.length >= 16;
    if (isDueFilled && isAvailableFilled && isUntilFilled) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  const handleClick = (quiz: Quiz) => {

    const updatedQuiz = quiz;
    setThisQuiz(updatedQuiz)
    dispatch(setQuiz(updatedQuiz));
  }
  // // Grab the current quiz detail
  const fetchQuizDetailById = async () => {
    if (quizId) {
      const fetchedQuiz : Quiz = await client.getQuizDetailById(quizId);
      setText(fetchedQuiz.instruction);
      setThisQuiz(fetchedQuiz);
      if (fetchedQuiz.due.length >= 16 && fetchedQuiz.until.length >= 16 && fetchedQuiz.availiable.length >= 16) {
        setIsValid(true);
      }
    }
  }

  useEffect(() => {
    fetchQuizDetailById();
  }, [quizId]);

  return (
    <div>
      <div className="d-flex align-items-center gap-4 mb-3">
        <div>Points {quiz.points}</div>
        <div>{quiz.publish ? "Published" : "Not Published"}</div>
        <button className="btn btn-light d-flex align-items-center">:</button>
      </div>
      <input type="text" value={quiz.name} placeholder="Quiz Name"
        onChange={(e) => {
          handleClick({ ...quiz, name: e.target.value });
        }}
      />
      <div className="form-group mb-4 mt-4">
        <label htmlFor="instruction">Quiz Instructions:</label>
        <Editor apiKey="fuwvr20gje9j16aatycd3yxkofqonpysg7nuf5jjsxm41iyi"
          initialValue={text}
          onInit={(evt, editor) => { setEditorContent(editor.getContent({ format: 'text' })) }}
          onEditorChange={(value, editor) => { handleEditorChange(editor.getContent({ format: 'text' })); }} />
      </div>
      <div className="d-flex gap-4">
        <label htmlFor="quiz-select">Quiz Type:</label>

        <select name="quiz" id="quiz-select" value={quiz.type} onChange={(e) => handleClick({ ...quiz, type: e.target.value })}>
          <option value="Graded Quiz">Graded Quiz</option>
          <option value="Practice Quiz">Practice Quiz</option>
          <option value="Graded Survey">Graded Survey</option>
          <option value="Upgraded Survey">Upgraded Survey</option>
        </select>
      </div>
      <label htmlFor="points">Points: </label>
      <input type="number" className="" id="points" value={quiz.points}
        onChange={(e) => {
          handleClick({ ...quiz, points: parseInt(e.target.value) })
        }}
      />
      <div className="d -flex gap-4">
        <label htmlFor="assignment-group">Assignment Group</label>

        <select name="assignment" id="assignment-group" value={quiz.group} onChange={(e) => handleClick({ ...quiz, group: e.target.value })}>
          <option value="Quizzes">Quizzes</option>
          <option value="Exams">Exams</option>
          <option value="Assignments">Assignments</option>
          <option value="Project">Project</option>
        </select>
      </div>
      <div>
        <div>Options</div>
        <div>
          <input type="checkbox" id="shuffle-answers" name="shuffle-answers" checked={quiz.shuffle}
            onChange={(e) => {
              handleClick({ ...quiz, shuffle: e.target.checked })
            }} />
          <label htmlFor="shuffle-answers">Shuffle Answers</label>
        </div>

        <div>
          <input type="checkbox" id="time-limit" name="time-limit" checked={quiz.setLimit}
            onChange={(e) => { handleClick({ ...quiz, setLimit: e.target.checked }) }} />
          <label htmlFor="time-limit" >Time Limit </label>
          <span style={{ display: quiz.setLimit ? "block" : "none" }}>
            <input type="number" id="minutes" name="minutes" placeholder="20" value={quiz.limit}
              onChange={(e) => handleClick({ ...quiz, limit: parseInt(e.target.value) })} />
            <label htmlFor="minutes">Minutes</label>

          </span>
        </div>
        <div className="border">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" checked={quiz.multiple}
            onChange={(e) => handleClick({ ...quiz, multiple: e.target.checked })} />
          <label htmlFor="allow-mult-atmpt">Allow Multiple Attempts</label>
        </div>
        <div className="border">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" checked={quiz.showCorrect}
            onChange={(e) => {
              handleClick({ ...quiz, showCorrect: e.target.checked })
            }} />
          <label htmlFor="allow-mult-atmpt">Show Correct Answers</label>
        </div>
        <div>
          <label htmlFor="access-code">Access Code: </label>
          <input type="number" name="access-code" id="access-code" value={quiz.code} onChange={(e) =>
            handleClick({ ...quiz, code: e.target.value ? parseInt(e.target.value) : "" })
          } />
        </div>
        <div>
          <label htmlFor="one-question">One Question at a Time </label>
          <input type="checkbox" id="one-question" checked={quiz.oneAtATime} onChange={(e) =>
            handleClick({ ...quiz, oneAtATime: e.target.checked })
          } />
        </div>
        <div>
          <label htmlFor="webcam">Webcam Required</label>
          <input type="checkbox" id="webcam" checked={quiz.webcam} onChange={(e) =>
            handleClick({ ...quiz, webcam: e.target.checked })} />
        </div>
        <div>
          <label htmlFor="lock-question">Lock Questions After Answering </label>
          <input type="checkbox" id="lock-question" checked={quiz.lock} onChange={(e) =>
            handleClick({ ...quiz, lock: e.target.checked })
          } />
        </div>
      </div>
      <div className="w-50">
        <div>
          <div>Due</div>
          <input type="datetime-local" className="form-control" value={quiz.due}
            onChange={(e) => {
              handleClick({ ...quiz, due: e.target.value })
              handleSetTime(e.target.value)

            }} />
        </div>
        <div>
          <div>Available from</div>
          <input type="datetime-local" className="form-control" value={quiz.availiable}
            onChange={(e) => {
              handleClick({ ...quiz, availiable: e.target.value })
              handleSetTime(e.target.value)
            }} />
        </div>
        <div>
          <div>Until</div>
          <input type="datetime-local" className="form-control" value={quiz.until} required
            onChange={(e) => {
              handleClick({ ...quiz, until: e.target.value })
              handleSetTime(e.target.value)
              }} />
        </div>
      </div>
    </div>
  )
}

export default QuizDetailsEditor;
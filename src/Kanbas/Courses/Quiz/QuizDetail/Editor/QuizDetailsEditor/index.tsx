
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as client from "../../../Clients/quizClient";
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
    <div className="container d-flex flex-column gap-3">
      <div className="d-flex align-items-center gap-3 mt-3">
        <div>Points {quiz.points}</div>
        <div>{quiz.publish ? "Published" : "Not Published"}</div>
        <button className="btn btn-light d-flex align-items-center">:</button>
      </div>
        <div>
        <input type="text" className="form-control w-25" value={quiz.name} placeholder="Quiz Name"
        onChange={(e) => {
          handleClick({ ...quiz, name: e.target.value });
        }}/>
        </div>
      <div className="form-group">
        <label htmlFor="instruction" className="mb-2">Quiz Instructions:</label>
        <Editor apiKey=""
          initialValue={text}
          onInit={(evt, editor) => { setEditorContent(editor.getContent({ format: 'text' })) }}
          onEditorChange={(value, editor) => { handleEditorChange(editor.getContent({ format: 'text' })); }} />
      </div>
      <div className="d-flex gap-4">

        <label htmlFor="quiz-select" className="mt-2">Quiz Type:</label>
        <select className="form-select w-25" name="quiz" id="quiz-select" value={quiz.type} onChange={(e) => handleClick({ ...quiz, type: e.target.value })}>
          <option value="Graded Quiz">Graded Quiz</option>
          <option value="Practice Quiz">Practice Quiz</option>
          <option value="Graded Survey">Graded Survey</option>
          <option value="Upgraded Survey">Upgraded Survey</option>
        </select>
      </div>
      <div className="d-flex gap-5">
      <label htmlFor="points" className="mt-2">Points: </label>
      <input type="number" min="0" max="240" className="form-control w-25" id="points" value={quiz.points}
        onChange={(e) => {
          handleClick({ ...quiz, points: e.target.value? parseInt(e.target.value) : 0 })
        }}/>
      </div>

      <div className="d-flex gap-2">
        <label htmlFor="assignment-group" className="mt-2">Assignment Group</label>
        <select className="form-select w-25" name="assignment" id="assignment-group" value={quiz.group} onChange={(e) => handleClick({ ...quiz, group: e.target.value })}>
          <option value="Quizzes">Quizzes</option>
          <option value="Exams">Exams</option>
          <option value="Assignments">Assignments</option>
          <option value="Project">Project</option>
        </select>
      </div>
      <div className="border container d-flex flex-column gap-2">
        <div style={{ fontWeight: "bold" }} className="mt-3">Options</div>
        <div>
          <input type="checkbox" id="shuffle-answers" name="shuffle-answers" checked={quiz.shuffle}
            onChange={(e) => {
              handleClick({ ...quiz, shuffle: e.target.checked })
            }} />
          <label htmlFor="shuffle-answers" className="ms-2">Shuffle Answers</label>
        </div>

        <div className="">
          <input type="checkbox" id="time-limit" name="time-limit" checked={quiz.setLimit}
            onChange={(e) => { handleClick({ ...quiz, setLimit: e.target.checked }) }} />
          <label htmlFor="time-limit" className="ms-2 mb-2">Time Limit </label>
          <div style={{ display: quiz.setLimit ? "flex" : "none"}}>
            <input className="form-control w-25" type="number" min="0" max="240" id="minutes" name="minutes" placeholder="20" value={quiz.limit}
              onChange={(e) => handleClick({ ...quiz, limit: e.target.value? parseInt(e.target.value) : 0 })} />
            <label htmlFor="minutes" className="ms-2 mt-2">Minutes</label>
          </div>
        </div>
        <div className="">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" checked={quiz.multiple}
            onChange={(e) => handleClick({ ...quiz, multiple: e.target.checked })} />
          <label htmlFor="allow-mult-atmpt" className="ms-2">Allow Multiple Attempts</label>
        </div>
        <div className="">
          <input type="checkbox" id="allow-mult-atmpt" name="allow-mult-atmpt" checked={quiz.showCorrect}
            onChange={(e) => {
              handleClick({ ...quiz, showCorrect: e.target.checked })
            }} />
          <label htmlFor="allow-mult-atmpt" className="ms-2">Show Correct Answers</label>
        </div>
        <div className="d-flex">
          <label htmlFor="access-code" className="me-2 mt-2">Access Code: </label>
          <input className="form-control w-25" type="number" min="0" max="999" name="access-code" id="access-code" value={quiz.code} onChange={(e) =>
            handleClick({ ...quiz, code: e.target.value ? parseInt(e.target.value) : "" })
          } />
        </div>
        <div>
          <label htmlFor="one-question" className="me-2">One Question at a Time</label>
          <input type="checkbox" id="one-question" checked={quiz.oneAtATime} onChange={(e) =>
            handleClick({ ...quiz, oneAtATime: e.target.checked })
          } />
        </div>
        <div>
          <label htmlFor="webcam" className="me-2">Webcam Required</label>
          <input type="checkbox" id="webcam" checked={quiz.webcam} onChange={(e) =>
            handleClick({ ...quiz, webcam: e.target.checked })} />
        </div>
        <div className="mb-3">
          <label htmlFor="lock-question" className="me-2">Lock Questions After Answering </label>
          <input type="checkbox" id="lock-question" checked={quiz.lock} onChange={(e) =>
            handleClick({ ...quiz, lock: e.target.checked })
          } />
        </div>
      </div>
      <div className="w-50">
        <div>
          <div className="mb-2">Due</div>
          <input type="datetime-local" className="form-control" value={quiz.due}
            onChange={(e) => {
              handleClick({ ...quiz, due: e.target.value })
              handleSetTime(e.target.value)

            }} />
        </div>
        <div>
          <div className="mb-2 mt-2">Available from</div>
          <input type="datetime-local" className="form-control" value={quiz.availiable}
            onChange={(e) => {
              handleClick({ ...quiz, availiable: e.target.value })
              handleSetTime(e.target.value)
            }} />
        </div>
        <div className="mb-4">
          <div className="mb-2 mt-2">Until</div>
          <input type="datetime-local" className="form-control" value={quiz.until} required
            onChange={(e) => {
              handleClick({ ...quiz, until: e.target.value })
              console.log(e.target.value)
              handleSetTime(e.target.value)
              }} />
        </div>
      </div>
    </div>
  )
}

export default QuizDetailsEditor;
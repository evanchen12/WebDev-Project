import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { KanbasState } from "../../../Store";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import * as client from "../Client/quizClient"
import { setQuiz, updateQuiz } from "../quizzesReducer";

function QuizDetail() {

  const { quizId } = useParams()
  let quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz);
  const dispatch = useDispatch();
  const [publish, setPublish] = useState(false);

  const updatePublished = async () => {
    const updatedPublish = !publish; 
    setPublish(updatedPublish); 
    await client.updateQuizDetail({ ...quiz, publish: updatedPublish }); 
  }

  // Grab the current quiz detail
  const fetchQuizDetail = async () => {
    if (quizId) {
      quiz = await client.getQuizDetailById(quizId);
      setPublish(quiz.publish);
    }
    dispatch(setQuiz(quiz))
  }

  useEffect(() => {
    fetchQuizDetail();
  }, [quizId])


  return (
    <div>
      <div className="d-flex">
        <button className={`btn ${publish ? 'btn-success' : 'btn-danger'} d-flex align-items-center`} onClick={updatePublished}>
          {publish ? "Published" : "Unpublished"}</button>
        <Link to={"QuizPreview"}>
          <button className="btn btn-light d-flex align-items-center">Preview</button>
        </Link>

        <Link to={"Editor"}>
          <button className="btn btn-light d-flex align-items-center">Edit</button>
        </Link>
        <button className="btn btn-light">:</button>
      </div>
      <hr />
      <h1>{`${quiz.name}`} - HTML</h1>      <div>
        <h5>Quiz Type: {`${quiz.type}`}</h5>
        <h5>Points: {`${quiz.points}`}</h5>
        <h5>Assignment Group: {`${quiz.group}`}</h5>
        <h5>Shuffle Answers: {`${quiz.shuffle ? "Yes" : "No"}`}</h5>
        <h5>Time Limit: {`${quiz.setLimit ? quiz.limit : "No Time Limit"}`}</h5>
        <h5>Multiple Attempts: {`${quiz.multiple ? "Yes" : "No"}`}</h5>
        <h5>Show Correct Answers: {`${quiz.showCorrect ? "Yes" : "No"}`}</h5>
        <h5>Access Code: {`${quiz.code ? quiz.code : ""}`}</h5>
        <h5>One Question at a Time: {`${quiz.oneAtATime ? "Yes" : "No"}`}</h5>
        <h5>Webcam Required: {`${quiz.webcam ? "Yes" : "No"}`}</h5>
        <h5>Lock Questions After Answering: {`${quiz.lock ? "Yes" : "No"}`}</h5>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{`${format(quiz.due, 'MMMM dd h:mm a')}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizDetail;


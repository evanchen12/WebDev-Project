import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import * as client from "../Clients/quizClient"
import { Quiz } from "../../../DataType";

function QuizDetail() {


  const { quizId } = useParams()

  const [quiz, setThisQuiz] = useState<Quiz>({
    _id: "",
    courseID: "",
    instruction: "",
    name: "",
    type: "",
    points: 0,
    group: "",
    shuffle: false,
    setLimit: false,
    limit: 0,
    multiple: false,
    showCorrect: false,
    code: 0,
    oneAtATime: false,
    webcam: false,
    lock: false,
    due: "",
    availiable: "",
    until: "",
    publish: false
  })


  const [publish, setPublish] = useState(false);
  const navigate = useNavigate()

  const handleEditRedirect = () => {
    navigate('Editor')
  }

  const updatePublished = async () => {
    const updatedPublish = !publish;
    setPublish(updatedPublish);
    await client.updateQuizDetail({ ...quiz, publish: updatedPublish });
  }

  // Grab the current quiz detail
  const fetchQuizDetail = async () => {
    if (quizId) {
      const fetchedQuiz = await client.getQuizDetailById(quizId);
      setPublish(fetchedQuiz.publish);
      setThisQuiz(fetchedQuiz);
    }
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


        <button className="btn btn-light d-flex align-items-center" onClick={handleEditRedirect}>Edit</button>

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
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.due === "" ? '' : format(new Date(quiz.due).toISOString(), "MMMM d 'at' h:mm a")}</td>
              <td>{quiz.availiable === "" ? '' : format(new Date(quiz.availiable).toISOString(), "MMMM d 'at' h:mm a")}</td>
              <td>{quiz.until === "" ? '' : format(new Date(quiz.until).toISOString(), "MMMM d 'at' h:mm a")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizDetail;


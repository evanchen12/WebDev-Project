import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { KanbasState } from "../../../Store";
import { format } from 'date-fns';

function QuizDetail() {

  const { quizId } = useParams()
  const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
  const quiz = quizList.filter((quiz) => quiz._id === 2)[0]


  return (
    <>
      <h2> Quiz Detail </h2>

      <div className="d-flex">
        <button className="btn btn-success d-flex align-items-center">Published</button>
        <button className="btn btn-light d-flex align-items-center">Preview</button>
        <Link to={"Editor"}>
          <button className="btn btn-light d-flex align-items-center">Edit</button>
        </Link>
        <button className="btn btn-light">:</button>
      </div>
      <hr />
      <h1>{`${quizId}`} - HTML</h1>      <div>
        <h5>Quiz Type: {`${quiz.type}`}</h5>
        <h5>Points: {`${quiz.points}`}</h5>
        <h5>Assignment Group: {`${quiz.group}`}</h5>
        <h5>Shuffle Answers: {`${quiz.shuffle ? "Yes" : "No"}`}</h5>
        <h5>Time Limit: {`${quiz.limit}`}</h5>
        <h5>Multiple Attempts: {`${quiz.multiple ? "Yes" : "No"}`}</h5>
        <h5>View Responses: {`${quiz.show}`}</h5>
        <h5>Show Correct Answers: {`${quiz.code}`}</h5>
        <h5>One Question at a Time: {`${quiz.oneAtATime ? "Yes" : "No"}`}</h5>
        <h5>Webcam Required: {`${quiz.webcam}`}</h5>
        <h5>Lock Questions After Answering: {`${quiz.lock ? "Yes" : "No"}`}</h5>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Availiable from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{`${format(quiz.due,'MMMM dd h:mm a')}`}</td>
              <td>Everyone</td>
              <td>{`${format(quiz.availiable,'MMMM dd h:mm a')}`}</td>
              <td>{`${format(quiz.until,'MMMM dd h:mm a')}`}</td>
            </tr>
          </tbody>
        </table>
      </div>


    </>
  );
}

export default QuizDetail;
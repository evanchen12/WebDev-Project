import { Link } from "react-router-dom";

function QuizDetail() {
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
      <h1>Q1 - HTML</h1>
      <div>
        <h5>Quiz Type</h5>
        <h5>Points</h5>
        <h5>Assignment Group</h5>
        <h5>Shuffle Answers</h5>
        <h5>Time Limit</h5>
        <h5>Multiple Attempts</h5>
        <h5>View Responses</h5>
        <h5>Show Correct Answers</h5>
        <h5>One Question at a Time</h5>
        <h5>Require Respondus LockDown</h5>
        <h5>Browser</h5>
        <h5>Required to View Quiz Results</h5>
        <h5>Webcam Required</h5>
        <h5>Lock Question After Answering</h5>
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
              <td>Sep 21 at 1pm</td>
              <td>Everyone</td>
              <td>Sep 21 at 11:40am</td>
              <td>Sep 21 at 1 pm</td>
            </tr>
          </tbody>
        </table>
      </div>


    </>
  );
}

export default QuizDetail;
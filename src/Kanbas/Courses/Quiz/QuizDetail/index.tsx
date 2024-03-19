import { Link } from "react-router-dom";

function QuizDetail() {
  return (
    <>
      <h2> Quiz Detail </h2>
      <Link to={"Editor"}>
        <button>edit</button> 
      </Link>
    </>
  );
}

export default QuizDetail;
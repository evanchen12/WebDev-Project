import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { FaEllipsisV, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteQuiz, setQuiz } from '../quizzesReducer';
import { KanbasState } from '../../../Store';
import { updateQuiz } from "../quizzesReducer";
import { format, isBefore, isAfter } from 'date-fns';
import './index.css';
import { displayPartsToString } from 'typescript';

function QuizList() {
  const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
  const [visibleMenuQuizId, setVisibleMenuQuizId] = useState(null);

  const dispatch = useDispatch();

  const toggleMenu = (quizId: any) => {
    setVisibleMenuQuizId(visibleMenuQuizId === quizId ? null : quizId);
  };
  const {courseId} = useParams();



  if (quizzes.length === 0) {
    return <p>No quizzes available. Click the "+ Quiz" button to create one.</p>;
  }
  const handleDelete = (quizId: any) => {
    dispatch(deleteQuiz(quizId));
    setVisibleMenuQuizId(null);
  };

  const handlePublish = (quizId: any) => {
    const quizToPublish = quizzes.find((quiz) => quiz._id === quizId);
    if (quizToPublish) {
      const updatedQuiz = { ...quizToPublish, publish: !quizToPublish.publish };
      dispatch(updateQuiz(updatedQuiz));
    }
  };



  return (
    <>
      <h2>Quiz List</h2>
      <ul className="wd-modules">
        {quizzes.map((quiz) => {
          const now = new Date();
          const availableDate = new Date(quiz.availiable); // Ensure this matches your data model
          const untilDate = new Date(quiz.until);
          let availabilityStatus = "Closed";
          if (isBefore(now, availableDate)) {
            availabilityStatus = `Not available until ${format(availableDate, 'PPP')}`;
          } else if (isAfter(now, availableDate) && isBefore(now, untilDate)) {
            availabilityStatus = "Available";
          }

          return (
            <li key={quiz._id} className="quiz-item">
              <div className="quiz-content">
                <div className="quiz-info">
                  <Link to={`/Kanbas/Courses/RS101/Quizzes/${quiz._id}`} className="quiz-name">{quiz.name}</Link>
                  <div className="quiz-details">
                    <p>{availabilityStatus}</p>
                    <p>Due date: {format(new Date(quiz.due), 'PPP')}</p>
                    <p>Points: {quiz.points}</p>
                    <p>Number of questions:</p>
                  </div>
                </div>
                <button className="menu-button" onClick={() => toggleMenu(quiz._id)}>
                  {quiz.publish ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
                  <FaEllipsisV />
                </button>

                <div className={`dropdown-menu ${visibleMenuQuizId === quiz._id ? "show" : ""}`}>
                  <ul>
                    <li><Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}><button onClick={() => dispatch(setQuiz(quiz))}>Edit</button></Link></li>
                    <li><button onClick={() => handleDelete(quiz._id)}>Delete</button></li>
                    <li><button onClick={() => handlePublish(quiz._id)}>{quiz.publish ? "Unpublish" : "Publish"}</button></li>
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default QuizList;
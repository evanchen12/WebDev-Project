import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEllipsisV, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { format, isBefore, isAfter } from 'date-fns';
import './index.css';
import * as client from '../Client/quizClient'
import { Quiz } from '../../../DataType';

function QuizList() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz []>([])
  const [quiz, setThisQuiz] = useState<Quiz>({
    _id: "", 
    courseID: "",
    instruction:"", 
    name: "", 
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

  const fetchAllQuizzes = async () => {
    const quizzesFromDB = await client.getAllQuizzes();
    setQuizzes(quizzesFromDB);
  }

  
  const handlePublish = async (quizId : string) => {
    const selectedQuiz = quizzes.filter((quiz) => quiz._id === quizId)[0]
    const updatedPublish = !selectedQuiz.publish; 
    await client.updateQuizDetail({ ...selectedQuiz, publish: updatedPublish }); 
  }

  useEffect(() => {
    fetchAllQuizzes();
  }, [courseId, handlePublish])

  const handleDelete = async (quizId: string) => {
    try {
      await client.deleteQuiz(quizId).then(() => fetchAllQuizzes())

    } catch (error) {
      console.log(error);
    }
    setVisibleMenuQuizId(null);
  };

  const [visibleMenuQuizId, setVisibleMenuQuizId] = useState(null);


  const toggleMenu = (quizId: any) => {
    setVisibleMenuQuizId(visibleMenuQuizId === quizId ? null : quizId);
  };


  if (quizzes.length === 0) {
    return <p>No quizzes available. Click the "+ Quiz" button to create one.</p>;
  }

  return (
    <>
      <h2>Quiz List</h2>
      <ul className="wd-modules">
        {quizzes.map((quiz) => {
          const now = new Date();
          const availableDate = new Date(quiz.availiable).toString(); // Ensure this matches your data model
          const untilDate = new Date(quiz.until).toString();
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
                  <Link to={`/Kanbas/Courses/RS101/Quizzes/${quiz._id}/QuizDetail`} className="quiz-name">{quiz.name}</Link>
                  <div className="quiz-details">
                    <p>Availability: {availabilityStatus}</p>
                    <p>Due date: {quiz.due === "" ? '' : format(new Date(quiz.due).toISOString(), "MMMM d 'at' h:mm a")}</p>
                    <p>Points: {quiz.points}</p>
                    <p>Number of questions:</p>
                  </div>
                </div>
                <button className="menu-button" onClick={() => toggleMenu(quiz._id)}>
                  {quiz.publish ? "✅" : "🚫"}
                  <FaEllipsisV />
                </button>

                <div className={`dropdown-menu ${visibleMenuQuizId === quiz._id ? "show" : ""}`}>
                  <ul>
                    <li>
                      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>
                        <button onClick={() => setThisQuiz(quiz)}>Edit</button>
                      </Link>
                    </li>
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
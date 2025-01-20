import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { KanbasState } from "../../../Store";
import { useState, useEffect } from "react";
import './QuizPreview.css';
import { Option } from '../../../DataType';
import * as optionClient from "../Clients/optionClient"
import * as choiceQClient from "../Clients/choiceQClient"
import * as quizClient from "../Clients/quizClient"
import { setOptions } from "../optionReducer";
import { setChoiceQs } from "../choiceQReducer";

function QuizPreview() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const options = useSelector((state: KanbasState) => state.optionReducer.options);
  const choiceQuestions = useSelector((state: KanbasState) => state.choiceQReducer.choiceQs);
  const [quiz, setQuiz] = useState({
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
  });

  const fetchQuiz = async () => {
    if (quizId) {
      const fetchedQuiz = await quizClient.getQuizDetailById(quizId);
      setQuiz(fetchedQuiz);
    }
  };
  const fetchQuestions = async () => {
    const questions = await choiceQClient.findAllChoiceQs(quizId);
    dispatch(setChoiceQs(questions));
  };
  const fetchOptions = async () => {
    const options = await optionClient.findAllOptions();
    dispatch(setOptions(options));
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  useEffect(() => {
    fetchOptions();
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = choiceQuestions[currentQuestionIndex];
  const optionsForCurrentQuestion = currentQuestion ? options.filter((option) => option.p_id === currentQuestion._id) : [];
  const [userAnswer, setUserAnswer] = useState("");
  const oneAtATime = quiz.oneAtATime ?? false;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < choiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {

      // end of quiz
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      <h2>{quiz?.name}</h2>
      <h2>Quiz Instructions</h2>


      {oneAtATime ? (
        // Display one question at a time
        currentQuestion ? (
          <div className="border question-container">
            <div><strong>{currentQuestion.title}</strong></div>
            <div>{currentQuestion.question}</div>
            {currentQuestion.type === "MC" && optionsForCurrentQuestion.map((option) => (
              <div className="MC">
                <label>
                  <input
                    type="radio"
                    name="mc_answer"
                    value={option.description}
                  /> {option.description}
                </label>
              </div>
            ))}
            {currentQuestion.type === "BLANK" && (
              <div className="BLANK">
                {options
                  .filter((option) => option.p_id === currentQuestion._id)
                  .map((option) =>
                    <label>
                      {option.description}
                      <input type="text" />
                    </label>
                  )}
              </div>
            )}
            {currentQuestion.type === "TF" && (
              <div className="TF">
                <input type="radio" name="answer" value="True" /> True
                <br />
                <input type="radio" name="answer" value="False" /> False
              </div>
            )}
          </div>
        ) : (
          <div>No questions available for this quiz</div>
        )
      ) : (
        // display all questions at once 
        <>
          {choiceQuestions.map((question, index) => (
            <div key={question.p_id} className="border">
              <div><strong>Question {index + 1}: {question.title}</strong></div>
              <div>{question.question}</div>
              <div className="question-container">
                {question.type === "MC" && (
                  <>
                    {options
                      .filter((option) => option.p_id === question._id)
                      .map((option) =>
                        <div className="MC">
                          <label>
                            <input
                              type="radio"
                              name="mc_answer"
                              value={option.description}
                            /> {option.description}
                          </label>
                        </div>
                      )}
                  </>
                )}
                {question.type === "BLANK" && (
                  <div className="BLANK" >
                    {options
                      .filter((option) => option.p_id === question._id)
                      .map((option) =>
                        <div>
                          <label>
                            {option.description}
                            <input type="text" />
                          </label>
                        </div>
                      )}
                  </div>
                )}
                {question.type === "TF" && (
                  <div className="TF" >
                    <input type="radio" name={`tf_answer${question.pid}`} value="True" /> True
                    <br />
                    <input type="radio" name={`tf_answer${question.p_id}`} value="False" /> False
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {oneAtATime && (
        <>
          <ol className="questions-list">
            {choiceQuestions.map((question, index) => (
              <li key={question.p_id} style={{ fontWeight: index === currentQuestionIndex ? 'bold' : 'normal' }}>
                Question {index + 1}
              </li>
            ))}
          </ol>

          {/* buttons*/}

          <div style={{ height: '20px' }} />
          <div className="d-flex" style={{ marginLeft: '15px' }}>  
            <button
              className="btn btn-secondary d-flex align-items-center me-2 big-red"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button
              className="btn btn-secondary d-flex align-items-center me-2 big-red"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex >= choiceQuestions.length - 1}// Disable if on the last Question
              > 
              Next
            </button>
          </div>
        </>
      )}
      <div className="border">
        <div className="button-container">
          Quiz saved at {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          <Link to={"../"}>
            <button className="btn btn-light d-flex align-items-center">Submit Quiz</button>
          </Link>
        </div>
        <Link to={`../Quizzes/${quizId}/Quiz Detail/Editor/`}>

          <button className="btn btn-light d-flex align-items-center">Keep Editing This Quiz</button>
        </Link>
      </div>
    </>
  );
}

export default QuizPreview;
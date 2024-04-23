import axios from "axios";
import { Quiz } from "../../../DataType";
// Call backend from here

const QUIZ_API = process.env.REACT_APP_API_BASE;

export const getQuizDetailById = async (quizId:string) => {
    const response = await axios.get(`${QUIZ_API}/api/quiz/${quizId}`)
    return response.data;
}

export const createQuizDetail = async (quiz:Quiz) => {
    const response = await axios.post(`${QUIZ_API}/api/quiz`, quiz)
    return response.data;
}

export const updateQuizDetail = async (quiz:Quiz) => {
    const response = await axios.put(`${QUIZ_API}/api/quiz/${quiz._id}`, quiz)
}

export const getAllQuizzes = async () => {
    const response = await axios.get(`${QUIZ_API}/api/quiz`)
    return response.data;
}

export const deleteQuiz = async (quizId:string) => {
    const response = await axios.delete(`${QUIZ_API}/api/quiz/${quizId}`)
    return response.data;

}


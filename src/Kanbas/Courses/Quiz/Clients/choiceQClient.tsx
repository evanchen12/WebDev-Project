import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const QUESTIONS_API = `${BASE_API}/api/questions`;

export const createChoiceQ = async (choiceQ: any) => {
  const response = await axios.post(`${QUESTIONS_API}`, choiceQ);
  return response.data;
}

export const findAllChoiceQs = async (quiz_id: any) => {
  const response = await axios.get(`${QUESTIONS_API}/${quiz_id}`);
  return response.data;
};

export const updateChoiceQ = async (choiceQ: any) => {
  const response = await axios.put(`${QUESTIONS_API}/${choiceQ._id}`, choiceQ);
  return response.data;
};

export const deleteChoiceQ = async (_id: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${_id}`);
  return response.data;
};
import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const OPTION_API = `${BASE_API}/api/options`;

export const createOption = async (option: any) => {
  const response = await axios.post(`${OPTION_API}`, option);
  return response.data;
}

export const findAllOptions = async () => {
  const response = await axios.get(`${OPTION_API}`);
  return response.data;
};

export const updateOption = async (option: any) => {
  const response = await axios.put(`${OPTION_API}/${option._id}`, option);
  return response.data;
};

export const deleteOption = async (_id: string) => {
  const response = await axios.delete(`${OPTION_API}/${_id}`);
  return response.data;
};
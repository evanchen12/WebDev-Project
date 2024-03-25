import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  tfQ: db.tfQ,
  tf: {title: "", question: "", answer: true, points: 0},
};

const tfQSlice = createSlice({
  name: "tfQ",
  initialState,
  reducers: {
    addTFQ: (state, action) => {
      const id = new Date().getTime().toString();
      state.tfQ = [
        { ...action.payload, p_id: id },
          ...state.tfQ,
      ];
      state.tf = { ...action.payload, p_id: id };
    },
    deleteTFQ: (state, action) => {
      state.tfQ = state.tfQ.filter(
        (tf) => tf.p_id !== action.payload
      );
    },
    updateTFQ: (state, action) => {
      state.tfQ = state.tfQ.map((tf) => {
        if (tf.p_id === action.payload.p_id) {
          return action.payload;
        } else {
          return tf;
        }
      });
    },
    setTFQ: (state, action) => {
      state.tf = action.payload;
    },
  },
});

export const { addTFQ, deleteTFQ, updateTFQ, setTFQ } = tfQSlice.actions;
export default tfQSlice.reducer;
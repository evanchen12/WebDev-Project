import Nav from "../Nav";
import Assignment3 from "./a3";
import Assignment4 from "./a4";
import Assignment5 from "./a5";
import {Routes, Route, Navigate} from "react-router";
import store from "./Store";
import { Provider } from "react-redux";


function Labs() {
  return (
  <Provider store={store}>
    <Nav />
    <Routes>
      <Route path="a3" element={<Assignment3 />}></Route>
      <Route path="a4" element={<Assignment4 />}></Route>
      <Route path="a5" element={<Assignment5 />}></Route>
    </Routes>
  </Provider>
  );
}
 
export default Labs;
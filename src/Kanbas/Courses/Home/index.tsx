import Modules from "../Modules";
import StatusButtons from "./StatusButtons";
import Todo from "./Todo";
import CommingUp from "./CommingUp";
import "./index.css";
import { FaEllipsisV } from "react-icons/fa";

function Home() {
  return (
    <div className="d-flex">
      <div className="flex-fill wd-main-body">
        <Modules />
      </div>
      
      <div className="flex-grow-0 me-2 d-none d-xl-block">
        <h6>Course Status</h6>
        <StatusButtons />
        <Todo />
        <CommingUp />
      </div>
    </div>
  );
}
export default Home;
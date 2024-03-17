import ModuleList from "./list";
import "./index.css";
import { FaEllipsisV } from "react-icons/fa";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../Store";
import { addModule } from "./modulesReducer";

function Modules() {
  const { courseId } = useParams();
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();

  return (
    <div className="wd-main-body">
      <div className="wd-buttons">
          <button type="button">Collapse All</button>
          <button type="button">View Progress</button>
          <select id="select-one">
            <option value="All">Publish All</option>
            <option value="This">Publish This</option>
          </select>
          <button className="big-red" type="button" onClick={() => dispatch(addModule({ ...module, course: courseId}))}>
            + Module</button>
          <button type="button"><FaEllipsisV /></button>
          <hr />
        </div>
      <ModuleList />
    </div>
  );
}
export default Modules;
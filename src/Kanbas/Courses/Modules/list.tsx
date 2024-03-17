import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { addModule, deleteModule, updateModule, setModule } from "./modulesReducer";
import { KanbasState } from "../../Store";
import { Lesson } from "../../DataType";

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  return (
    <>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div className="wd-add">
            <button onClick={() => dispatch(updateModule(module))}>Update</button>
            <input value={module.name}
              onChange={(e) => dispatch(setModule({
                ...module, name: e.target.value }))}
            />
            <textarea  value={module.description}
              onChange={(e) => dispatch(setModule({
                ...module, description: e.target.value }))}
            />
          </div>
        </li>
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module) => (
          <li
            className="list-group-item"
            onClick={() => setSelectedModule(module)}>
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end d-flex wd-side-button">
                <FaCheckCircle className="text-success" />
                <div className="dropdown">
                  <button className="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaPlusCircle className="ms-2" />
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" type="button" onClick={() => dispatch(setModule(module))}>
                      Edit</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => dispatch(deleteModule(module._id))}>
                      Delete</button></li>
                  </ul>
                </div>
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson: Lesson) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;
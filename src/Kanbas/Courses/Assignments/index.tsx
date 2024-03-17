import React, { useState } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import "./index.css"

function Assignments() {
  const { courseId } = useParams();
  const [ assignments, setAssignment] = useState(db.assignments)
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId);

  return (
    <div className="wd-main-body">
      {/* {<!-- Add buttons and other fields here -->} */}
      <div className="d-flex">
        <div className="col">
          <input type="search" placeholder="Search for Assignment" className="text-center"/>
        </div>
        <div className="col wd-buttons" style={{textAlign: "right"}}>
          <button type="button">+ Group</button>
          <button className="bg-danger text-white" type="button">
            + Assignment</button>
          <button type="button"><FaEllipsisV /></button>
        </div>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <FaEllipsisV className="me-2" />
                <Link
                   to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))}
          </ul>
        </li>
      </ul>
    </div>
);}
export default Assignments;
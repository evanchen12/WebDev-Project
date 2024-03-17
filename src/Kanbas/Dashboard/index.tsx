/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { Course } from "../DataType";

function Dashboard({courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse}: {
    courses: Course[],
    course: Course,
    setCourse: any,
    addNewCourse: () => void,
    deleteCourse: (courseId: string) => void,
    updateCourse: () => void
}) {

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />
      <h2>Published Courses ({courses.length})</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course: any) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}>  
                  <img src={`/images/${course.image}`} className="card-img-top"
                        style={{ height: 150 }}/>
                </Link>
                <div className="card-body ellipsis">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                    <div className="card-title">{course.number} {course.name}</div>
                    <p className="card-text ellipsis fontsize">{course.name}</p>
                    <div className="card-buttons">
                      <button onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}>
                        Edit
                      </button>
                      <button className="big-red" onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}>
                        Delete
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="col" style={{ width: 300 }}>
            <div className="card">
              <div className="card-body function-card">
                <h5>Course</h5>
                <input value={course.name} className="form-control" onChange={(e) => setCourse({ ...course, name: e.target.value } ) } />
                <input value={course.number} className="form-control" onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
                <input value={course.startDate} className="form-control" type="date" onChange={(e) => setCourse({ ...course, startDate: e.target.value }) } />
                <input value={course.endDate} className="form-control" type="date" onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />    
                <button className="big-green" onClick={addNewCourse} >
                  Add
                </button>
                <button onClick={updateCourse} >
                  Update
                </button>    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
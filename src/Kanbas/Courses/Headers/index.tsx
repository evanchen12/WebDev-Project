import { useParams, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
import '../../../libs/bootstrap/bootstrap.min.css';
import { HeaderCourseNavigation } from "../Navigation";
import { HeaderKanbasNavigation } from "../../Navigation";
import "./index.css"
import { Course } from "../../DataType";


function Headers({ courses }: { courses: Course[] }) {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const location = useLocation();
  const pathArray = location.pathname.split('/'); 
  const currentPage = pathArray[pathArray.length - 1]; 
  const currentPageClean = currentPage.replace(/[^A-Za-z]+/g, ' ');

  return (
    <>
      <div className="d-none d-md-block" style={{margin: "20px"}}>
        <h4><span className="text-danger"><HiMiniBars3 /> {course?._id} {course?.name}</span> {"> "}
          { currentPageClean }
        </h4>
        <hr />
      </div>

      <div className="d-md-none wd-header">
        <nav className="navbar navbar-dark bg-black">
          <div className="container-fluid">
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#kanbasNav" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <h6 className="text-white text-center"> { course?._id } <br/>
                { currentPageClean }</h6>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#courseNav" aria-controls="courseNav" aria-expanded="false" aria-label="Toggle navigation">
              <FaChevronDown />
            </button>
          </div>
        </nav>
        <div className="collapse collapse-vertical" id="courseNav">
          <div className="card card-body text-black" style={{ width: "100%" }}>
            <HeaderCourseNavigation />
          </div>
        </div>
        <div className="collapse collapse-horizontal" id="kanbasNav">
          <div className="card card-body text-black" style={{ width: "100%" }}>
            <HeaderKanbasNavigation />
          </div>
        </div>
      </div>
    </>
  );
}

export default Headers;
import { Link, useLocation } from "react-router-dom";

function DetailsNav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link className={`nav-link ${pathname.includes("QuizDetailsEditor") ? "active" : ""}`} 
        to="QuizDetailsEditor">Details</Link>
      <Link className={`nav-link ${pathname.includes("QuizQuestionsEditor") ? "active" : ""}`} 
        to="QuizQuestionsEditor">Questions</Link>
    </nav>
  );
}
export default DetailsNav; 
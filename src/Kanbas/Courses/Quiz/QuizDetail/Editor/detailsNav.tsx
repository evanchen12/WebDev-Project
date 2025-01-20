import { Link, useLocation } from "react-router-dom";

function DetailsNav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link className={`nav-link ${pathname.includes("Details") ? "active" : ""}`} 
        to="Quiz Details Editor">Details</Link>
      <Link className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`} 
        to="Quiz Questions Editor">Questions</Link>
    </nav>
  );
}
export default DetailsNav; 
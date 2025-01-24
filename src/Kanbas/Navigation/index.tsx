import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaRegClock, FaSitemap, FaRegQuestionCircle, FaChevronCircleRight } from "react-icons/fa";

const links = [
  { label: "Account",   icon: <FaRegUserCircle className="fs-2" />  },
  { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" />  },
  { label: "Courses",   icon: <FaBook className="fs-2" />           },
  { label: "Calendar",  icon: <FaRegCalendarAlt className="fs-2" /> },
  { label: "Inbox",  icon: <FaInbox className="fs-2" /> },
  { label: "History",  icon: <FaRegClock className="fs-2" /> },
  { label: "Studio",  icon: <FaSitemap className="fs-2" /> },
  { label: "Commons",  icon: <FaChevronCircleRight className="fs-2" /> },
  { label: "Help",  icon: <FaRegQuestionCircle className="fs-2" /> }
];

function KanbasNavigation() {
  const { pathname } = useLocation();

  return (
    <ul className="wd-kanbas-navigation">
      <li>
        <Link to='/Kanbas/Dashboard'>
          <img src={`/images/logo.png`} style={{ width: 70 }}/>
        </Link>
      </li>
      {links.map((link, index) => (
        <li key={index} className={(pathname.includes(link.label) ? "wd-active" : "") +
          (link.label === 'Account' ? ' wd-account' : '')}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} 
            <div>{link.label}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function HeaderKanbasNavigation() {  
  return (
    <ul className="wd-kanbas-navigation-h">
      <li>
        <Link to='/Kanbas/Dashboard'>Canvas</Link>
      </li>
      {links.map((link, index) => (
        <li key={index} className={(link.label === 'Account' ? ' wd-account-h' : '')}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { KanbasNavigation, HeaderKanbasNavigation };
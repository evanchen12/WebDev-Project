import { FaBullhorn, FaChartBar, FaDownload, FaHome, FaRegBell, FaBan, FaCheckCircle } from "react-icons/fa";
import "./index.css";

function StatusButtons() {
  const buttons = [
    { label: "Import Existing Content",   icon: <FaDownload className="ms" />  },
    { label: "Import From Commons", icon: <FaDownload className="ms" />  },
    { label: "Choose Home Page",   icon: <FaHome className="ms" />           },
    { label: "View Course Stream",  icon: <FaChartBar className="ms" /> },
    { label: "New Announcement",  icon: <FaBullhorn className="ms" /> },
    { label: "New Analytics",  icon: <FaChartBar className="ms" /> },
    { label: "View Course Notifications",  icon: <FaRegBell className="ms" /> }
  ];

  return (
    <div>
      <div className="wd-publish-buttons">
        <button type="button">
          <FaBan className="ms" /> Unpublish</button>
        <button type="button" className="big-green" style={{margin: "5px"}}>
          <FaCheckCircle className="ms" /> Published</button>
      </div>

      <ul className="wd-button-list">
        {buttons.map((button, index) => (
          <li key={index}>
            <button type="button">
              {button.icon} {button.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusButtons
import { Link } from 'react-router-dom';
import './Sidebar.css';
export function SideBar({ isSidebarOpen, sidebarClose }) {

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`} id="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🎓</div>
        <span className="brand-text">AttendTrack</span>
        <button 
          className="sidebar-close" 
          id="sidebarClose"
          onClick={sidebarClose}
          >
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-link active" data-page="index">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Setup</span>
        </Link> 

        <Link to="/table" className="nav-link" data-page="table">
          <span className="nav-icon">📅</span>
          <span className="nav-text">Timetable</span>
        </Link> 
        <Link to="/attendance" className="nav-link" data-page="attendance">
          <span className="nav-icon">✏️</span>
          <span className="nav-text">Attendance</span>
        </Link> 
        <Link to="/dashboard" className="nav-link" data-page="dashboard">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </Link> 
        <Link to="/summary" className="nav-link" data-page="summary">
          <span className="nav-icon">📋</span>
          <span className="nav-text">Summary</span>
        </Link> 
      </nav>

      <div className="sidebar-footer">
        <p>Student Attendance Tracker</p>
      </div>
    </aside>
  );
}

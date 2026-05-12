import { NavLink } from 'react-router-dom';
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
        {/* Add 'end' prop so "/" only matches exact root, not all pages */}
        <NavLink 
          to="/semesterSetup" 
          end
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          onClick={sidebarClose}
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Setup</span>
        </NavLink> 

        <NavLink 
          to="/table"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          onClick={sidebarClose}
        >
          <span className="nav-icon">📅</span>
          <span className="nav-text">Timetable</span>
        </NavLink> 

        <NavLink 
          to="/attendance"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          onClick={sidebarClose}
        >
          <span className="nav-icon">✏️</span>
          <span className="nav-text">Attendance</span>
        </NavLink> 
        
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          onClick={sidebarClose}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </NavLink> 

        <NavLink 
          to="/summary"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          onClick={sidebarClose}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-text">Summary</span>
        </NavLink> 
      </nav>

      <div className="sidebar-footer">
        <p>Student Attendance Tracker</p>
      </div>
    </aside>
  );
}
import './Sidebar.css';
export function SideBar() {
  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🎓</div>
        <span className="brand-text">AttendTrack</span>
        <button className="sidebar-close" id="sidebarClose">
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        <a href="index.html" className="nav-link active" data-page="index">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Setup</span>
        </a>
        <a href="table.html" className="nav-link" data-page="table">
          <span className="nav-icon">📅</span>
          <span className="nav-text">Timetable</span>
        </a>
        <a href="attendance.html" className="nav-link" data-page="attendance">
          <span className="nav-icon">✏️</span>
          <span className="nav-text">Attendance</span>
        </a>
        <a href="dashboard.html" className="nav-link" data-page="dashboard">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </a>
        <a href="summary.html" className="nav-link" data-page="summary">
          <span className="nav-icon">📋</span>
          <span className="nav-text">Summary</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <p>Student Attendance Tracker</p>
      </div>
    </aside>
  );
}

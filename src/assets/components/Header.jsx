import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';

export function Header({ title, subtitle }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  function toggleNotifications() {
    setShowNotifications(prev => !prev);
  }

  function closeNotifications() {
    setShowNotifications(false);
  }

  return (
    <>
      <header className="main-header" id="mainHeader">
        <div className="header-container">
          <div className="header-left">
            <div className="header-brand-mobile">
              <span className="header-logo">🎓</span>
              <span className="header-brand-text">AttendTrack</span>
            </div>
          </div>

          <div className="header-center">
            <h1 className="header-title">{title || "Page Title"}</h1>
            <p className="header-subtitle">{subtitle || ""}</p>
          </div>

          <div className="header-right">
            <button 
              className="header-icon-btn" 
              title="Notifications"
              onClick={toggleNotifications}
            >
              <span>🔔</span>
              <span className="notification-dot" style={{ display: "none" }}></span>
            </button>
            <button 
              className="header-profile"
              onClick={() => navigate("/dashboard")}
              title="Go to Dashboard"
            >
              <span className="profile-avatar">👤</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Dropdown */}
      {showNotifications && (
        <>
          <div className="notification-overlay" onClick={closeNotifications}></div>
          <NotificationDropdown onClose={closeNotifications} />
        </>
      )}
    </>
  );
}

// Inline Notification Dropdown Component
function NotificationDropdown({ onClose }) {
  const navigate = useNavigate();

  const schedule = JSON.parse(localStorage.getItem("scheduleList") || "[]");
  const todayLog = JSON.parse(localStorage.getItem("dailyAttendanceLog") || "{}");
  const attendanceData = JSON.parse(localStorage.getItem("attendanceData") || "{}");
  const semesterDates = JSON.parse(localStorage.getItem("semesterDates") || "null");

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  const todayClasses = schedule.filter(course => course.day === today);
  const markedToday = Object.keys(todayLog).length;
  const unmarkedCount = todayClasses.length - markedToday;

  const notifications = [];

  if (unmarkedCount > 0) {
    notifications.push({
      id: "unmarked",
      type: "warning",
      icon: "⏰",
      title: `${unmarkedCount} class${unmarkedCount > 1 ? "es" : ""} pending`,
      message: "Mark attendance for today's classes",
      action: "Mark",
      path: "/attendance"
    });
  }

  if (markedToday === todayClasses.length && todayClasses.length > 0) {
    notifications.push({
      id: "completed",
      type: "success",
      icon: "✅",
      title: "All caught up",
      message: "You've marked all classes today"
    });
  }

  const lowAttendance = todayClasses.filter(course => {
    const stats = attendanceData[course.id] || { present: 0, total: 0 };
    if (stats.total === 0) return false;
    return (stats.present / stats.total) * 100 < 75;
  });

  lowAttendance.forEach(course => {
    const stats = attendanceData[course.id] || { present: 0, total: 0 };
    const percent = Math.round((stats.present / stats.total) * 100);
    notifications.push({
      id: `risk-${course.id}`,
      type: "danger",
      icon: "⚠️",
      title: `${course.courseName} at risk`,
      message: `Attendance: ${percent}%`,
      action: "View",
      path: "/attendance"
    });
  });

  const daysLeft = semesterDates?.endDate 
    ? Math.max(0, Math.ceil((new Date(semesterDates.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  if (daysLeft <= 7 && daysLeft > 0) {
    notifications.push({
      id: "semester-ending",
      type: "info",
      icon: "📅",
      title: "Semester ending soon",
      message: `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
    });
  }

  function handleAction(path) {
    onClose();
    if (path) navigate(path);
  }

  return (
    <div className="notification-dropdown">
      <div className="notification-dropdown-header">
        <h3>Notifications</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="notification-dropdown-list">
        {notifications.length === 0 ? (
          <div className="notification-empty">
            <span>🔕</span>
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map(note => (
            <div key={note.id} className={`notification-item ${note.type}`}>
              <span className="item-icon">{note.icon}</span>
              <div className="item-content">
                <p className="item-title">{note.title}</p>
                <p className="item-message">{note.message}</p>
              </div>
              {note.action && (
                <button 
                  className="item-action"
                  onClick={() => handleAction(note.path)}
                >
                  {note.action}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import '../components/General.css';
import "./Notifications.css";

function loadFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function getTodayCourses(schedule) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  if (!Array.isArray(schedule)) return [];
  return schedule.filter(course => course.day === today);
}

export function Notifications() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const schedule = loadFromStorage("scheduleList", []);
  const todayLog = loadFromStorage("dailyAttendanceLog", {});
  const attendanceData = loadFromStorage("attendanceData", {});
  const semesterDates = loadFromStorage("semesterDates", null);

  const todayClasses = getTodayCourses(schedule);
  const markedToday = Object.keys(todayLog).length;
  const unmarkedCount = todayClasses.length - markedToday;

  const lowAttendanceCourses = todayClasses.filter(course => {
    const stats = attendanceData[course.id] || { present: 0, total: 0 };
    if (stats.total === 0) return false;
    const percent = (stats.present / stats.total) * 100;
    return percent < 75;
  });

  const daysLeft = semesterDates?.endDate 
    ? Math.max(0, Math.ceil((new Date(semesterDates.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  const notifications = [];

  if (unmarkedCount > 0) {
    notifications.push({
      id: "unmarked",
      type: "warning",
      icon: "⏰",
      title: `${unmarkedCount} class${unmarkedCount > 1 ? "es" : ""} pending`,
      message: "You haven't marked attendance for today's classes yet.",
      time: "Today",
      action: "Mark Now",
      path: "/attendance"
    });
  }

  if (markedToday === todayClasses.length && todayClasses.length > 0) {
    notifications.push({
      id: "completed",
      type: "success",
      icon: "✅",
      title: "All caught up",
      message: "You've marked attendance for all today's classes.",
      time: "Today",
      action: null,
      path: null
    });
  }

  lowAttendanceCourses.forEach(course => {
    const stats = attendanceData[course.id] || { present: 0, total: 0 };
    const percent = Math.round((stats.present / stats.total) * 100);
    notifications.push({
      id: `risk-${course.id}`,
      type: "danger",
      icon: "⚠️",
      title: `${course.courseName} at risk`,
      message: `Attendance is ${percent}%. You need 80% to be eligible.`,
      time: "This week",
      action: "View",
      path: "/attendance"
    });
  });

  if (daysLeft <= 7 && daysLeft > 0) {
    notifications.push({
      id: "semester-ending",
      type: "info",
      icon: "📅",
      title: "Semester ending soon",
      message: `${daysLeft} day${daysLeft > 1 ? "s" : ""} left until exams.`,
      time: "Upcoming",
      action: null,
      path: null
    });
  }

  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev);
  }

  return (
    <>
      <title>Notifications</title>

      <Header 
        title="Notifications" 
          subtitle="Stay updated"
      />

      <SideBar 
        isSidebarOpen={isSidebarOpen} 
        sidebarClose={toggleSidebar}
      />

      <div className="sidebar-overlay"></div>

      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      <div className="header-spacer"></div>

      <main className="notifications-container">
        <div className="notifications-header">
          <h2>Recent</h2>
          <span className="notifications-count">{notifications.length}</span>
        </div>

        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <span className="empty-icon">🔕</span>
            <p>No notifications yet</p>
            <span className="empty-sub">Check back after marking attendance</span>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map(note => (
              <div key={note.id} className={`notification-card ${note.type}`}>
                <div className="notification-icon">{note.icon}</div>
                <div className="notification-content">
                  <div className="notification-top">
                    <h3 className="notification-title">{note.title}</h3>
                    <span className="notification-time">{note.time}</span>
                  </div>
                  <p className="notification-message">{note.message}</p>
                  {note.action && (
                    <button 
                      className="notification-action"
                      onClick={() => note.path && navigate(note.path)}
                    >
                      {note.action}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
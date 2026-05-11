import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { SaveMessage } from "../components/SaveMessage";
import '../components/General.css';
import "./Attendance.css";

const STORAGE_KEYS = {
  SCHEDULE: "scheduleList",
  ATTENDANCE: "attendanceData",
  DAILY_LOG: "dailyAttendanceLog",
  LAST_DATE: "lastAttendanceDate"
};

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function getTodayCourses(schedule) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];

  if (!schedule || schedule.length === 0) {
    return [];
  }

  return schedule.filter(course => {
    const hasSingleDay = course.day && typeof course.day === 'string';
    if (!hasSingleDay) {
      return false;
    }
    return course.day === today;
  });
}

export function Attendance() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [todayLog, setTodayLog] = useState({});
  const [markedCount, setMarkedCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function initAttendance() {
      const today = getTodayKey();
      const lastDate = loadFromStorage(STORAGE_KEYS.LAST_DATE, "");

      let dailyLog;
      if (lastDate === today) {
        dailyLog = loadFromStorage(STORAGE_KEYS.DAILY_LOG, {});
      } else {
        dailyLog = {};
        saveToStorage(STORAGE_KEYS.LAST_DATE, today);
        saveToStorage(STORAGE_KEYS.DAILY_LOG, {});
      }

      const schedule = loadFromStorage(STORAGE_KEYS.SCHEDULE, []);
      const attendance = loadFromStorage(STORAGE_KEYS.ATTENDANCE, {});
      const todayCourses = getTodayCourses(schedule);

      setCourses(todayCourses);
      setAttendanceData(attendance);
      setTodayLog(dailyLog);
      setMarkedCount(Object.keys(dailyLog).length);
      setIsLoading(false);
    }

    initAttendance();
  }, []);

  function markAttendance(courseId, status) {
    if (todayLog[courseId]) {
      setErrorMessage("You already marked this course today! Click 'Change' if you need to fix it.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) {
      setErrorMessage("Error: Course not found.");
      return;
    }

    const newLog = { ...todayLog, [courseId]: status };
    saveToStorage(STORAGE_KEYS.DAILY_LOG, newLog);
    setTodayLog(newLog);

    const oldStats = attendanceData[courseId] || { present: 0, total: 0 };
    const newStats = {
      present: status === 'present' ? oldStats.present + 1 : oldStats.present,
      total: oldStats.total + 1
    };

    const newAttendance = { ...attendanceData, [courseId]: newStats };
    saveToStorage(STORAGE_KEYS.ATTENDANCE, newAttendance);
    setAttendanceData(newAttendance);

    setMarkedCount(Object.keys(newLog).length);
    setErrorMessage("");
  }

  function changeMark(courseId) {
    if (!todayLog[courseId]) {
      setErrorMessage("Nothing to change - not marked yet!");
      return;
    }

    const previousStatus = todayLog[courseId];
    const restOfLog = { ...todayLog };
    delete restOfLog[courseId];

    saveToStorage(STORAGE_KEYS.DAILY_LOG, restOfLog);
    setTodayLog(restOfLog);

    const oldStats = attendanceData[courseId];
    if (oldStats) {
      const newStats = {
        present: previousStatus === 'present'
          ? Math.max(0, oldStats.present - 1)
          : oldStats.present,
        total: Math.max(0, oldStats.total - 1)
      };

      const newAttendance = { ...attendanceData, [courseId]: newStats };
      saveToStorage(STORAGE_KEYS.ATTENDANCE, newAttendance);
      setAttendanceData(newAttendance);
    }

    setMarkedCount(Object.keys(restOfLog).length);
    setErrorMessage("");
  }

  function handleSaveLog() {
    if (markedCount === 0) {
      setErrorMessage("Mark at least one class before saving!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="loading-screen">
          <p>Loading your classes...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Mark Attendance</title>

      <Header 
        title="Mark Attendance" 
        subtitle="Step 3: Track your daily attendance"
      />

      <SideBar
        isSidebarOpen={isSidebarOpen}
        sidebarClose={toggleSidebar}
      />

      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      <button
        className="sidebar-toggle"
        id="sidebarToggle"
        onClick={toggleSidebar}
        aria-label="Open or close menu"
      >
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      <SaveMessage showMessage={showMessage} message="Saved successfully!" />
      <div className="header-spacer"></div>

      <main className="attendance-container">
        <div className="progress-bar">
          <div className="progress-step">
            <span className="step-number">1</span>
            <span className="step-label">Dates</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-number">2</span>
            <span className="step-label">Timetable</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step active">
            <span className="step-number">3</span>
            <span className="step-label">Attendance</span>
          </div>
        </div>

        {errorMessage && (
          <div className="error-banner" role="alert">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{errorMessage}</span>
            <button
              className="error-close"
              onClick={() => setErrorMessage("")}
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        <div className="progress-overview">
          <div className="stat-pill">
            <span className="pill-label">Today's Classes</span>
            <span className="pill-value">{courses.length}</span>
          </div>
          <div className={`stat-pill ${markedCount === courses.length && courses.length > 0 ? 'completed' : ''}`}>
            <span className="pill-label">Marked</span>
            <span className="pill-value">{markedCount}/{courses.length}</span>
          </div>
        </div>

        <section className="attendance-list">
          {courses.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📅</span>
              <p className="empty-title">No classes today!</p>
              <p className="empty-sub">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long' })}.</p>
              <p className="empty-hint">
                <strong>Tip:</strong> Go to the Timetable page and add courses for this day.
              </p>
            </div>
          ) : (
            courses.map(course => {
              const status = todayLog[course.id];
              const isMarked = !!status;
              const stats = attendanceData[course.id] || { present: 0, total: 0 };

              let percent = 0;
              if (stats.total > 0) {
                percent = Math.round((stats.present / stats.total) * 100);
              }

              let percentColor = 'danger';
              if (percent >= 80) {
                percentColor = 'safe';
              } else if (percent >= 75) {
                percentColor = 'warning';
              }

              return (
                <div
                  key={course.id}
                  className={`course-card ${isMarked ? `marked-${status}` : ''}`}
                >
                  <div className="course-info">
                    <h3 className="course-name">{course.courseName}</h3>

                    <div className="course-meta">
                      <span className="course-time">
                        🕐 {course.time || `${course.start} - ${course.end}`}
                      </span>
                      <span className="course-room">
                        📍 {course.day}
                      </span>
                    </div>

                    <div className="attendance-mini-stats">
                      <span className={`mini-percent ${percentColor}`}>
                        {percent}% attendance
                      </span>
                      <span className="mini-count">
                        ({stats.present}/{stats.total} classes)
                      </span>
                    </div>
                  </div>

                  <div className="attendance-actions">
                    {!isMarked ? (
                      <>
                        <button
                          className="btn-present"
                          onClick={() => markAttendance(course.id, 'present')}
                          aria-label={`Mark ${course.courseName} as present`}
                        >
                          <span className="btn-icon">✓</span>
                          Present
                        </button>

                        <button
                          className="btn-absent"
                          onClick={() => markAttendance(course.id, 'absent')}
                          aria-label={`Mark ${course.courseName} as absent`}
                        >
                          <span className="btn-icon">✗</span>
                          Absent
                        </button>
                      </>
                    ) : (
                      <div className="marked-status">
                        <span className={`status-badge ${status}`}>
                          {status === 'present' ? '✓ Present' : '✗ Absent'}
                        </span>

                        <button
                          className="btn-change"
                          onClick={() => changeMark(course.id)}
                          aria-label={`Change attendance for ${course.courseName}`}
                        >
                          ↺ Change
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </section>

        {markedCount === courses.length && courses.length > 0 && (
          <div className="completion-message visible">
            <div className="completion-content">
              <span className="completion-icon">🎉</span>
              <p>All done for today! Great job tracking your attendance.</p>
            </div>
          </div>
        )}

        <div className="fab-container">
          <button
            className="fab-button"
            onClick={handleSaveLog}
            disabled={markedCount === 0}
            aria-label="Save today's attendance"
          >
            <span>💾</span>
            Save Daily Log
          </button>
        </div>
      </main>
    </>
  );
}
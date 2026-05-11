import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";

import "./Dashboard.css";
import "../components/General.css";

function loadFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);

    if (stored !== null) {
      return JSON.parse(stored);
    }

    return defaultValue;
  } catch (error) {
    console.error("Storage read error:", error);
    return defaultValue;
  }
}

function getTodayKey() {
  return new Date().toLocaleDateString("en-CA");
}

function getTodayCourses(schedule) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = days[new Date().getDay()];

  if (!Array.isArray(schedule)) {
    return [];
  }

  return schedule.filter((course) => {
    const hasDaysArray = Array.isArray(course.days);

    const hasSingleDay =
      typeof course.day === "string";

    const matchesDaysArray =
      hasDaysArray &&
      course.days.includes(today);

    const matchesSingleDay =
      hasSingleDay &&
      course.day === today;

    return (
      matchesDaysArray ||
      matchesSingleDay
    );
  });
}

function calculateStats(
  schedule,
  attendance
) {
  let safe = 0;
  let risk = 0;

  schedule.forEach((course) => {
    const stats =
      attendance[course.id] || {
        present: 0,
        total: 0,
      };

    const percent =
      stats.total > 0
        ? (stats.present / stats.total) *
          100
        : 0;

    if (percent >= 80) {
      safe++;
    } else if (stats.total > 0) {
      risk++;
    }
  });

  return {
    total: schedule.length,
    safe,
    risk,
  };
}

function calculateDaysLeft(dates) {
  if (!dates || !dates.endDate) {
    return 0;
  }

  const end = new Date(dates.endDate);
  const now = new Date();

  const diff = Math.ceil(
    (end - now) /
      (1000 * 60 * 60 * 24)
  );

  return diff > 0 ? diff : 0;
}

function calculateSemesterProgress(dates) {
  if (
    !dates ||
    !dates.startDate ||
    !dates.endDate
  ) {
    return 0;
  }

  const start = new Date(
    dates.startDate
  ).getTime();

  const end = new Date(
    dates.endDate
  ).getTime();

  const now = new Date().getTime();

  if (now <= start) {
    return 0;
  }

  if (now >= end) {
    return 100;
  }

  return (
    ((now - start) / (end - start)) *
    100
  );
}

export function Dashboard() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const [schedule] = useState(() =>
    loadFromStorage("scheduleList", [])
  );

  const [attendanceData] = useState(() =>
    loadFromStorage("attendanceData", {})
  );

  const [semesterDates] = useState(() =>
    loadFromStorage("semesterDates", null)
  );

  const [todayLog] = useState(() => {
    const today = getTodayKey();

    const lastDate = loadFromStorage(
      "lastAttendanceDate",
      ""
    );

    if (lastDate === today) {
      return loadFromStorage(
        "dailyAttendanceLog",
        {}
      );
    }

    return {};
  });

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const todayClasses =
    getTodayCourses(schedule);

  const stats = calculateStats(
    schedule,
    attendanceData
  );

  const daysLeft =
    calculateDaysLeft(semesterDates);

  const semesterProgress =
    calculateSemesterProgress(
      semesterDates
    );

  const markedToday =
    Object.keys(todayLog).length;

  const allMarked =
    markedToday ===
      todayClasses.length &&
    todayClasses.length > 0;

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  function getCoursePercent(courseId) {
    const data =
      attendanceData[courseId] || {
        present: 0,
        total: 0,
      };

    if (data.total === 0) {
      return 0;
    }

    return Math.round(
      (data.present / data.total) *
        100
    );
  }

  function getPercentColor(percent) {
    if (percent >= 80) {
      return "safe";
    }

    if (percent >= 75) {
      return "warning";
    }

    return "danger";
  }

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Your attendance at a glance"
      />

      <SideBar
        isSidebarOpen={isSidebarOpen}
        sidebarClose={toggleSidebar}
      />

      <div className="sidebar-overlay"></div>

      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <span className="toggle-line"></span>

        <span className="toggle-line"></span>

        <span className="toggle-line"></span>
      </button>

      <div className="header-spacer"></div>

      <main className="dashboard-container">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">
              📚
            </div>

            <div className="stat-info">
              <span className="stat-value">
                {stats.total}
              </span>

              <span className="stat-label">
                Courses
              </span>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">
              ✓
            </div>

            <div className="stat-info">
              <span className="stat-value">
                {stats.safe}
              </span>

              <span className="stat-label">
                Safe
              </span>
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-icon">
              ⚠
            </div>

            <div className="stat-info">
              <span className="stat-value">
                {stats.risk}
              </span>

              <span className="stat-label">
                At Risk
              </span>
            </div>
          </div>
        </div>

        <div className="action-grid">
          <button
            className="action-card primary"
            onClick={() =>
              navigate("/attendance")
            }
          >
            <div className="action-icon">
              ✏️
            </div>

            <div className="action-text">
              <h3>Mark Attendance</h3>

              <p>
                {todayClasses.length > 0
                  ? `${markedToday}/${todayClasses.length} classes marked today`
                  : "No classes today"}
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>
          </button>

          <button
            className="action-card secondary"
            onClick={() =>
              navigate("/table")
            }
          >
            <div className="action-icon">
              📅
            </div>

            <div className="action-text">
              <h3>Edit Timetable</h3>

              <p>
                {stats.total} courses
                scheduled
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>
          </button>
        </div>

        {semesterDates && (
          <div className="semester-info">
            <div className="semester-bar">
              <div className="semester-track">
                <div
                  className="semester-fill"
                  style={{
                    width: `${semesterProgress}%`,
                  }}
                ></div>
              </div>

              <div className="semester-labels">
                <span>
                  Semester Progress
                </span>

                <span>
                  {daysLeft} days left
                </span>
              </div>
            </div>
          </div>
        )}

        <section className="courses-section">
          <div className="section-header">
            <h2>Today's Classes</h2>

            <span className="view-hint">
              {allMarked
                ? "All done!"
                : `${
                    todayClasses.length -
                    markedToday
                  } remaining`}
            </span>
          </div>

          <div className="courses-grid">
            {todayClasses.length ===
            0 ? (
              <div className="empty-dashboard">
                <span>🎉</span>

                <p>
                  No classes today!
                  Enjoy your free
                  time.
                </p>
              </div>
            ) : (
              todayClasses.map(
                (course) => {
                  const percent =
                    getCoursePercent(
                      course.id
                    );

                  const isMarked =
                    todayLog[
                      course.id
                    ];

                  const colorClass =
                    getPercentColor(
                      percent
                    );

                  return (
                    <button
                      key={course.id}
                      className="course-row"
                      onClick={() =>
                        navigate(
                          "/attendance"
                        )
                      }
                    >
                      <div className="course-row-info">
                        <p className="course-row-name">
                          {
                            course.courseName
                          }
                        </p>

                        <span className="course-row-time">
                          {course.time ||
                            "No time"}
                        </span>
                      </div>

                      <div className="course-row-right">
                        {isMarked ? (
                          <span
                            className={`row-badge ${todayLog[course.id]}`}
                          >
                            {todayLog[
                              course.id
                            ] ===
                            "present"
                              ? "✓"
                              : "✗"}
                          </span>
                        ) : (
                          <span className="row-pending">
                            Pending
                          </span>
                        )}

                        <span
                          className={`row-percent ${colorClass}`}
                        >
                          {percent}%
                        </span>
                      </div>
                    </button>
                  );
                }
              )
            )}
          </div>
        </section>
      </main>
    </>
  );
}
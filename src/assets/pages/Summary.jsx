import { useState } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import './Summary.css';
import '../components/General.css';

function getCoursesPercent(courseId, attendanceData) {
  const data = attendanceData[courseId] || { present: 0, total: 0 };
  if (data.total === 0) return 0;
  return Math.round((data.present / data.total) * 100);
}

function getStatus(percent) {
  if (percent === 0) return "neutral";
  if (percent >= 80) return "eligible";
  return "risk";
}

export function Summary() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const schedule = JSON.parse(localStorage.getItem("scheduleList") || "[]");
  const attendance = JSON.parse(localStorage.getItem("attendanceData") || "{}");

  let eligibility = 0;
  let atRisk = 0;

  schedule.forEach((course) => {
    const percent = getCoursesPercent(course.id, attendance);
    const status = getStatus(percent);

    if (status === "eligible") eligibility++;
    else if (status === "risk") atRisk++;
  });

  const total = schedule.length;

  function toggleSideBar() {
    setIsSidebarOpen(prev => !prev);
  }

  return (
    <>
      <Header title="Review" subtitle="Your final semester review" />
      <title>Semester Summary</title>

      <SideBar isSidebarOpen={isSidebarOpen} sidebarClose={toggleSideBar} />

      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      <button
        className="sidebar-toggle"
        id="sidebarToggle"
        onClick={toggleSideBar}
        aria-label="Toggle sidebar"
        aria-expanded={isSidebarOpen}
      >
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      <div className="save-message"></div>
      <div className="header-spacer"></div>

      <main className="summary-container">
        <div className="status-banner">
          {total === 0 ? (
            <p>No courses found. Add courses in Timetable first.</p>
          ) : atRisk === 0 ? (
            <p>All courses eligible for exams!</p>
          ) : (
            <p>{atRisk} course(s) at risk. Attend remaining classes.</p>
          )}
        </div>

        <div className="course-grid">
          {schedule.map((course) => {
            const percent = getCoursesPercent(course.id, attendance);
            const status = getStatus(percent);

            return (
              <div key={course.id} className={`course-card ${status}`}>
                <div className="course-info">
                  <h3>{course.courseName || course.course}</h3>
                  <span>{course.day} • {course.time || `${course.start} - ${course.end}`}</span>
                </div>
                <div className="course-stats">
                  <span className="percent">{percent}%</span>
                  <span className="badge">
                    {status === "eligible" ? "✓ Eligible" : status === "risk" ? "⚠ At Risk" : "○ No Data"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <section className="final-stats">
          <h2>Semester Overview</h2>
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-number">{total}</span>
              <span className="stat-label">Total Courses</span>
            </div>
            <div className="stat-box success">
              <span className="stat-number">{eligibility}</span>
              <span className="stat-label">Eligible</span>
            </div>
            <div className="stat-box danger">
              <span className="stat-number">{atRisk}</span>
              <span className="stat-label">At Risk</span>
            </div>
          </div>
        </section>

        <div className="action-message">
          {atRisk === 0 && total > 0 ? (
            <p>Great job! You're on track for all courses.</p>
          ) : total > 0 ? (
            <p>Focus on attending remaining classes for at-risk courses.</p>
          ) : (
            <p>Go to Timetable to add your courses.</p>
          )}
        </div>
      </main>
    </>
  );
}
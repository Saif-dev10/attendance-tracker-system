import { useState } from "react";
import "./Attendance.css";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import '../components/General.css';

export function Attendance() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <title>Mark Attendance</title>
      <Header />
      <SideBar 
        isSidebarOpen={isSidebarOpen}
        sidebarClose={toggleSidebar}
      />

      <div class="sidebar-overlay" id="sidebarOverlay"></div>

      <button 
        class="sidebar-toggle" 
        id="sidebarToggle"
        onClick={toggleSidebar}
      >
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </button>

      <div class="header-spacer"></div>

      <div class="save-message js-save-message"></div>

      <main className="attendance-container">
        {/* Progress overview */}

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

        <div className="progress-overview">
          <div className="stat-pill">
            <span className="pill-label">Today's classNamees</span>
            <span className="pill-value js-today-count">0</span>
          </div>
          <div className="stat-pill completed">
            <span className="pill-label">Marked</span>
            <span className="pill-value js-marked-count">0/0</span>
          </div>
        </div>

        {/* Course list */}
        <section className="attendance-list js-result-display">
          {/* Courses injected here */}
        </section>

        {/* Completion message */}
        <div
          className="completion-message js-completion-message"
          style={{ display: "none" }}
        >
          <div className="completion-content">
            <span className="completion-icon">🎉</span>
            <p>All done for today! Great job tracking your attendance.</p>
          </div>
        </div>

        {/* Floating save button */}
        <div className="fab-container">
          <button className="fab-button js-save-log">
            <span>💾</span>
            Save Daily Log
          </button>
        </div>
      </main>
    </>
  );
}

import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import './Summary.css';
import '../components/General.css';

export function Summary() {
  return (
    <>
      <title>Semester Summary</title>
      <SideBar />

      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      <button className="sidebar-toggle" id="sidebarToggle">
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      <div class="save-message js-save-message"></div>

      <Header />

      <div className="header-spacer"></div>

      {/* Main container */}
  <main className="summary-container">
    
    {/* Status banner at top */}
    <div className="status-banner js-status-banner">
      <p>Calculating eligibility...</p>
    </div>

    {/* Course cards grid */}
    <div className="course-grid js-course-summary">
      {/* JavaScript fills this with course cards */}
    </div>

    {/* Final stats section */}
    <section className="final-stats">
      <h2>Semester Overview</h2>
      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-number js-total-courses">0</span>
          <span className="stat-label">Total Courses</span>
        </div>
        <div className="stat-box">
          <span className="stat-number js-eligible-courses">0</span>
          <span className="stat-label">Eligible</span>
        </div>
        <div className="stat-box">
          <span className="stat-number js-at-risk-courses">0</span>
          <span className="stat-label">At Risk</span>
        </div>
      </div>
    </section>

    {/* Action message */}
    <div className="action-message js-action-message">
      <p>Review your attendance records above.</p>
    </div>
    
  </main>
    </>
  );
}
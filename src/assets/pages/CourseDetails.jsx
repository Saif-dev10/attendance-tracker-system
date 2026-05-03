import { Header } from '../components/Header';
import { SideBar } from '../components/Sidebar';
import './CourseDetails.css';
import '../components/General.css';

export function CourseDetails() {
  return (
    <>
      <title>Course Details</title>
      <Header />
      <SideBar />

      <div class="sidebar-overlay" id="sidebarOverlay"></div>

      <button class="sidebar-toggle" id="sidebarToggle">
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </button>

      <div class="header-spacer"></div>

      <div class="save-message js-save-message"></div>

      <div className="page-wrapper">
        <a href="dashboard.html" className="back-link">← Back to Dashboard</a>

        <main className="detail-container">
          <div className="hero-stats">
            <div className="percentage-circle">
              <svg className="circle-svg" viewBox="0 0 100 100">
                <circle className="circle-bg" cx="50" cy="50" r="45"></circle>
                {/* FIXED: Added stroke-dasharray for circle to work */}
                <circle className="circle-progress js-progress-ring" cx="50" cy="50" r="45" 
                        stroke-dasharray="283" stroke-dashoffset="283"></circle>
              </svg>
              <div className="circle-content">
                <span className="circle-percentage js-percentage">0%</span>
                <span className="circle-label">Attendance</span>
              </div>
            </div>
            
            <div className="status-badge js-status-badge">Loading...</div>
          </div>

          <div className="stats-grid">
            <div className="detail-card">
              <div className="card-icon blue">📊</div>
              <div className="card-content">
                <span className="card-value js-total-classes">0</span>
                <span className="card-label">Total Classes</span>
              </div>
            </div>
            
            <div className="detail-card">
              <div className="card-icon green">✓</div>
              <div className="card-content">
                <span className="card-value js-attended-classes">0</span>
                <span className="card-label">Attended</span>
              </div>
            </div>
            
            <div className="detail-card">
              <div className="card-icon red">✕</div>
              <div className="card-content">
                <span className="card-value js-missed-classes">0</span>
                <span className="card-label">Missed</span>
              </div>
            </div>
          </div>

          <div className="message-box js-message-box">
            <div className="message-icon">💡</div>
            <p className="message-text js-warning-message">Loading course data...</p>
          </div>

          <div className="detail-actions">
            <a href="attendance.html" className="action-btn primary"><span>✏️</span>Mark Attendance</a>
            <a href="dashboard.html" className="action-btn secondary"><span>📋</span>View All Courses</a>
          </div>
        </main>
      </div>
    </>
  );
};
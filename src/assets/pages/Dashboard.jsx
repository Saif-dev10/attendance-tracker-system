import { Header } from '../components/Header';
import { SideBar } from '../components/Sidebar';
import './Dashboard.css';
import '../components/General.css';

export function Dashboard() {
  return (
    <>
      <title>Dashboard</title>
      <Header />
      <SideBar />

      <div class="sidebar-overlay" id="sidebarOverlay"></div>

      <button class="sidebar-toggle" id="sidebarToggle">
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </button>

      <div className="header-spacer"></div>

      <main className="dashboard-container">
        
        {/* Quick stats row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <span className="stat-value js-total-courses">0</span>
              <span className="stat-label">Courses</span>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <span className="stat-value js-safe-courses">0</span>
              <span className="stat-label">Safe</span>
            </div>
          </div>
          <div className="stat-card danger">
            <div className="stat-icon">⚠</div>
            <div className="stat-info">
              <span className="stat-value js-risk-courses">0</span>
              <span className="stat-label">At Risk</span>
            </div>
          </div>
        </div>

        {/* REMOVED: Old action buttons with links */}
        {/* Now navigation is handled by sidebar */}

        {/* Course list section */}
        <section className="courses-section">
          <div className="section-header">
            <h2>Your Courses</h2>
            <span className="view-hint">Tap to view details</span>
          </div>
          
          <div className="courses-grid js-result-analysis">
            {/* Courses injected here */}
          </div>
        </section>

      </main>
    </>
  );
}
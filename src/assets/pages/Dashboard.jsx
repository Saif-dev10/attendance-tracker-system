import { useState } from "react";
import { Header } from '../components/Header';
import { SideBar } from '../components/Sidebar';
import './Dashboard.css';
import '../components/General.css';

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <title>Dashboard</title>
      
      <Header 
        title="Dashboard" 
        subtitle="Overview of your attendance"
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
      >
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      <div className="header-spacer"></div>

      <main className="dashboard-container">
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

        <section className="courses-section">
          <div className="section-header">
            <h2>Your Courses</h2>
            <span className="view-hint">Tap to view details</span>
          </div>
          
          <div className="courses-grid js-result-analysis">
          </div>
        </section>
      </main>
    </>
  );
}
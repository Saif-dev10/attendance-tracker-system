import { useNavigate } from "react-router-dom";
import './Header.css';

export function Header({ title, subtitle }) {
  const navigate = useNavigate();

  return (
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
          <button className="header-icon-btn" title="Notifications">
            <span>🔔</span>
            <span
              className="notification-dot"
              style={{ display: "none" }}
            ></span>
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

      <div className="header-progress" style={{ display: "none" }}>
        <div className="progress-fill"></div>
      </div>
    </header>
  );
}
import './Header.css';
export function Header() {
  return (
    <header className="main-header" id="mainHeader">
      <div className="header-container">
        {/* Left: Menu toggle (if sidebar exists) or logo */}
        <div className="header-left">
          <div className="header-brand-mobile">
            <span className="header-logo">🎓</span>
            <span className="header-brand-text">AttendTrack</span>
          </div>
        </div>

        {/* Center: Page Title */}
        <div className="header-center">
          <h1 className="header-title js-header-title">Page Title</h1>
          <p className="header-subtitle js-header-subtitle">
            Subtitle goes here
          </p>
        </div>

        {/* Right: Actions/Profile */}
        <div className="header-right">
          <button className="header-icon-btn" title="Notifications">
            <span>🔔</span>
            <span
              className="notification-dot"
              style={{ display: "none" }}
            ></span>
          </button>
          <div className="header-profile">
            <span className="profile-avatar">👤</span>
          </div>
        </div>
      </div>

      <div className="header-progress" style={{ display: "none" }}>
        <div className="progress-fill"></div>
      </div>
    </header>
  );
}

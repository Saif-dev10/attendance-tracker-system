import { useState } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { SaveButton } from "../components/SaveButton";
import { SaveMessage } from "../components/SaveMessage";
import './SemesterSetup.css';
import '../components/General.css';

export function SemesterSetup() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  function handleSave(event) {
    event.preventDefault();

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      navigate("/table")
    }, 2000);
  };

  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
    examDate: "",
  });
  function handleDateChange(event) {
    const { id, value } = event.target;
    setDates(prevDates => ({
      ...prevDates,
      [id]: value
    }));
    console.log(event.target.value);
  };

  return (
    <>
      <Header />
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

      {/* Save Message */}
      <SaveMessage showMessage={showMessage} />

      <div className="header-spacer"></div>

      <main className="setup-container">
        
        {/* Progress indicator */}
        <div className="progress-bar">
          <div className="progress-step active">
            <span className="step-number">1</span>
            <span className="step-label">Dates</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-number">2</span>
            <span className="step-label">Timetable</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-number">3</span>
            <span className="step-label">Attendance</span>
          </div>
        </div>

        {/* Form card */}
        <div className="form-card">
          <div className="form-header">
            <h2>Academic Dates</h2>
            <p>Set your semester timeline</p>
          </div>

          <div className="form-group">
            
            {/* Error message */}
            <p className="error-message">An input fiels is not filled</p>

            <label htmlFor="startDate">Semester Start Date</label>
            <div className="input-wrapper">
              <span className="input-icon">📅</span>
              <input
                className="date-input js-data-input"
                type="date"
                id="startDate"
                value={dates.startDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Semester End Date</label>
            <div className="input-wrapper">
              <span className="input-icon">📅</span>
              <input
                className="date-input js-data-input"
                type="date"
                id="endDate"
                value={dates.endDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="examDate">Examination Date</label>
            <div className="input-wrapper">
              <span className="input-icon">📝</span>
              <input
                className="date-input js-data-input"
                type="date"
                id="examDate"
                value={dates.examDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          {/* Save Button */}
          <SaveButton onSave={handleSave} />
        </div>

        <div className="info-tip">
          <span className="tip-icon">💡</span>
          <p>You can edit these dates later from the settings menu.</p>
        </div>
      </main>
    </>
  );
}

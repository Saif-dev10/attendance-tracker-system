import { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { SaveButton } from "../components/SaveButton";
import { SaveMessage } from "../components/SaveMessage";
import './SemesterSetup.css';
import '../components/General.css';

export function SemesterSetup() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
    examDate: "",
  });
  
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev);
  }

  function handleDateChange(event) {
    const { id, value } = event.target;
    setDates(prev => ({
       ...prev,
        [id]: value 
    }));

    setErrorMessage("");
  }

  function validateDates({ startDate, endDate, examDate }) {

    if (!startDate || !endDate || !examDate) {
      return "Please fill in all date fields.";
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return "End date must be after start date.";
    }

    const exam = new Date(examDate);

    if (exam < new Date(startDate) || exam > new Date(endDate)) {
      return "Exam date must be within the semester period.";
    }

    return "";
  }

  function handleSave(event) {
    event.preventDefault();
    const error = validateDates(dates);
    
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage("");

    localStorage.setItem("semesterDates", JSON.stringify(dates));

    setShowMessage(true);

    timeoutRef.current = setTimeout(() => {
      setShowMessage(false);
      navigate("/table");
    }, 2000);
  }

  return (
    <>
      <Header
        title="Semester Setup"
        subtitle="Step 1: set your academic dates"
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
        aria-label="Toggle sidebar"
        aria-expanded={isSidebarOpen}
      >
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      <SaveMessage showMessage={showMessage} />
      <div className="header-spacer"></div>

      <main className="setup-container">
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

        <form className="form-card" onSubmit={handleSave}>
          <div className="form-header">
            <h2>Academic Dates</h2>
            <p>Set your semester timeline</p>
          </div>

          {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}

          <div className="form-group">
            <label htmlFor="startDate">Semester Start Date</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">📅</span>
              <input
                className="date-input"
                type="date"
                id="startDate"
                value={dates.startDate}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Semester End Date</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">📅</span>
              <input
                className="date-input"
                type="date"
                id="endDate"
                value={dates.endDate}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="examDate">Examination Date</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">📝</span>
              <input
                className="date-input"
                type="date"
                id="examDate"
                value={dates.examDate}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>

          <SaveButton onSave={handleSave} />
        </form>

        <div className="info-tip">
          <span className="tip-icon" aria-hidden="true">💡</span>
          <p>You can edit these dates later from the settings menu.</p>
        </div>
      </main>
    </>
  );
}
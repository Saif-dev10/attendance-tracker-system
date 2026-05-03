import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import './Table.css';

export function TablePage() {
  return (
    <>
      <title>Timetable Setup</title>

      <SideBar />

      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      <button className="sidebar-toggle" id="sidebarToggle">
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </button>

      <div className="save-message js-save-message"></div>

      <Header />

      <div className="header-spacer"></div>

      <main className="timetable-container">

        {/* Progress indicator */}
        <div className="progress-bar">
          <div className="progress-step">
            <span className="step-number">1</span>
            <span className="step-label">Dates</span>
          </div>
          
          <div className="progress-line"></div>
          <div className="progress-step active">
            <span className="step-number">2</span>
            <span className="step-label">Timetable</span>
          </div>

          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-number">3</span>
            <span className="step-label">Attendance</span>
          </div>
        </div>

        {/* Add class form card */}
        <section className="form-section">
          <div className="section-header">
            <h2>Add New Class</h2>
            <p>Enter course details below</p>
          </div>

          <div className="input-grid">
            <div className="input-group">
              <label>Day of Week</label>
              <select className="modern-select js-select-day">
                <option value="" disabled selected>Select day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div className="input-group full-width">
              <label>Course Name</label>
              <input className="modern-input js-course-input" type="text" placeholder="e.g., Introduction to Computer Science" />
            </div>

            <div className="input-group">
              <label>Start Time</label>
              <select className="modern-select js-select-start-time">
                <option value="" disabled selected>Start</option>
                <option value="8:00">8:00 AM</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="1:00">1:00 PM</option>
                <option value="2:00">2:00 PM</option>
                <option value="3:00">3:00 PM</option>
                <option value="4:00">4:00 PM</option>
                <option value="5:00">5:00 PM</option>
              </select>
            </div>

            <div className="input-group">
              <label>End Time</label>
              <select className="modern-select js-select-end-time">
                <option value="" disabled selected>End</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="1:00">1:00 PM</option>
                <option value="2:00">2:00 PM</option>
                <option value="3:00">3:00 PM</option>
                <option value="4:00">4:00 PM</option>
                <option value="5:00">5:00 PM</option>
                <option value="6:00">6:00 PM</option>
              </select>
            </div>
          </div>

          <button className="add-button js-add-to-day">
            <span>+</span>
            Add to Schedule
          </button>
        </section>

        {/* Weekly schedule display */}
        <section className="schedule-section">
          <div className="section-header">
            <h2>Weekly Schedule</h2>
            <span className="course-count js-course-count">0 courses</span>
          </div>

          <div className="schedule-grid js-display-table">
            {/* Days will be generated here */}
          </div>
        </section>

        {/* Save button */}
        <div className="action-bar">
          <button className="save-schedule-btn js-save-button">
            <span>💾</span>
            Save Timetable
          </button>
        </div>

      </main>
    </>
  );
}
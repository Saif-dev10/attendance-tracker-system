import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import './Table.css';
import { SaveMessage } from "../components/SaveMessage";
import { useNavigate } from "react-router-dom";

export function TablePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [days, setDays] = useState("");
  const [courseName, setCourseName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("scheduleList");
    return savedSchedule ? JSON.parse(savedSchedule) : [];
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function selectDay(event) {
    setDays(event.target.value);
  }

  function handleCourseName(event) {
    setCourseName(event.target.value);
  }

  function handleTimeChange(event) {
    const { name, value } = event.target;
    if (name === "startTime") {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
  }

  function toMinutes(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  }

  function addToSchedule() {
    if (!days || !courseName || !startTime || !endTime) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    const start = toMinutes(startTime);
    const end = toMinutes(endTime);

    if (start >= end) {
      setErrorMessage("End time must be after start time.");
      return;
    }

    setErrorMessage("");

    const newClass = {
      id: crypto.randomUUID(),
      day: days,
      courseName: courseName,
      time: `${startTime} - ${endTime}`,
      start: startTime,
      end: endTime
    };

    setSchedule(prevSchedule => [...prevSchedule, newClass]);

    setDays("");
    setCourseName("");
    setStartTime("");
    setEndTime("");
  }

  const count = schedule.length;

  function deleteClass(idToDelete) {
    const updated = schedule.filter(item => item.id !== idToDelete);
    setSchedule(updated);
  }

  const displaySchedule = schedule.map((item) => {
    return (
      <div className="schedule" key={item.id}>
        <p className="table-header">{item.day}</p>
        <div className="course-section">
          <div className="course-display">
            <p className="course-name">{item.courseName}</p>
            <p className="course-time">
              {item.start} - {item.end}
            </p>
            <button 
              className="delete-btn course-divider"
              onClick={() => deleteClass(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  const navigate = useNavigate();

  function saveInfo() {
    if (schedule.length === 0) {
      setErrorMessage("Please add at least one course to the schedule before saving.");
      setShowMessage(false);
      return;
    }

    setErrorMessage("");
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
      navigate("/attendance");
    }, 2000);
  }

  useEffect(() => {
    localStorage.setItem("scheduleList", JSON.stringify(schedule));
  }, [schedule]);

  return (
    <>
      <title>Timetable Setup</title>

      <SideBar 
        isSidebarOpen={isSidebarOpen}
        sidebarClose={toggleSidebar} 
      />

      <SaveMessage showMessage={showMessage} />

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

      <div className="save-message js-save-message"></div>

      <Header />

      <div className="header-spacer"></div>

      <main className="timetable-container">
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

        <section className="form-section">
          <div className="section-header">
            <h2>Add New Class</h2>
            <p>Enter course details below</p>
          </div>

          <div className="input-grid">
            <div className="input-group">
              <label>Day of Week</label>
              <select 
                className="modern-select"
                value={days}
                onChange={selectDay}
              >
                <option value="" disabled>Select day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div className="input-group full-width">
              <label>Course Name</label>
              <input 
                className="modern-input" 
                type="text" 
                placeholder="e.g., Introduction to Computer Science"
                value={courseName}
                onChange={handleCourseName} 
              />
            </div>

            <div className="input-group">
              <label>Start Time</label>
              <select 
                className="modern-select"
                name="startTime"
                value={startTime}
                onChange={handleTimeChange}
              >
                <option value="" disabled>Start</option>
                <option value="8:00">8:00 AM</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>

            <div className="input-group">
              <label>End Time</label>
              <select 
                className="modern-select"
                name="endTime"
                value={endTime}
                onChange={handleTimeChange}
              >
                <option value="" disabled>End</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
              </select>
            </div>
          </div>

          {errorMessage && (
            <p className="errorMessage">{errorMessage}</p>
          )}

          <button 
            className="add-button"
            onClick={addToSchedule}
          >
            <span>+</span>
            Add to Schedule
          </button>
        </section>

        <section className="schedule-section">
          <div className="section-header">
            <h2>Weekly Schedule</h2>
            <span className="course-count">{count} courses</span>
          </div>

          <div className="schedule-grid">
            {displaySchedule}
          </div>
        </section>

        <div className="action-bar">
          <button 
            className="save-schedule-btn"
            onClick={saveInfo}
            disabled={schedule.length === 0}
          >
            <span>💾</span>
            Save Timetable
          </button>
        </div>
      </main>
    </>
  );
}
import { useState } from "react";
import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import './Table.css';

export function TablePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [days, setDays] = useState("");
  const [courseName, setCourseName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedule, setschedule] = useState([]);
  // const [displaySchedule, setDisplaySchedule] = useState([]);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  function addToSchedule() {
    const newClass = {
      day: days,
      course: courseName,
      start: startTime,
      end: endTime
    };
    // setschedule([...schedule, newClass]);
    setschedule(prevSchedule => [...prevSchedule, newClass]);
  }

  let count = 0;
  schedule.forEach(() => {
    return(count++);
  })

  const displaySchedule = schedule.map((item, index) => {
    return (
      <div className="schedule" key={index}>
        <p className="table-header ">{item.day}</p>
        <div className="course-section">
          <div className="course-display">
            <p className="course-name">{item.course}</p>
            <p className="course-time">{item.start} - {item.end}</p>
            <button className="delete-btn course-divider">Delete</button>
          </div>
        </div>
        
      </div>
    );
  });

  return (
    <>
      <title>Timetable Setup</title>

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
                onChange={handleCourseName} />
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
                <option value="1:00">1:00 PM</option>
                <option value="2:00">2:00 PM</option>
                <option value="3:00">3:00 PM</option>
                <option value="4:00">4:00 PM</option>
                <option value="5:00">5:00 PM</option>
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
                <option value="1:00">1:00 PM</option>
                <option value="2:00">2:00 PM</option>
                <option value="3:00">3:00 PM</option>
                <option value="4:00">4:00 PM</option>
                <option value="5:00">5:00 PM</option>
                <option value="6:00">6:00 PM</option>
              </select>
            </div>
          </div>

          <button 
            className="add-button"
            onClick={addToSchedule}>
            <span>+</span>
            Add to Schedule
          </button>
        </section>

        {/* Weekly schedule display */}
        <section className="schedule-section">
          <div className="section-header">
            <h2>Weekly Schedule</h2>
            <span className="course-count">{count} courses</span>
          </div>

          <div 
            className="schedule-grid">
            {/* Days will be generated here */}
            {displaySchedule}
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
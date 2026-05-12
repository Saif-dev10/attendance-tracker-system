import { useNavigate } from "react-router-dom";
import globe from "../../../public/globe.png"
import "./LandingPage.css";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page loaded">

      <link rel="icon" type="image/svg+xml" href={globe} />

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="logo-mark">A</div>
            <span className="logo-text">Attendance Tracker</span>
          </div>
          <div className="nav-menu">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
          </div>
          <button className="nav-cta" onClick={() => navigate("/form")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="tag-dot"></span>
              Free for students
            </div>
            <h1 className="hero-title">
              Attendance tracking
              <br />
              that just works
            </h1>
            <p className="hero-desc">
              Know exactly where you stand. No spreadsheets, no guesswork, 
              no surprises before exams.
            </p>
            <div className="hero-buttons">
              <button className="btn-main" onClick={() => navigate("/form")}>
                Start Tracking
              </button>
              <button 
                className="btn-sub" 
                onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
              >
                Learn more
              </button>
            </div>
          </div>

          <div className="hero-demo">
            <div className="demo-card">
              <div className="demo-header">
                <div className="demo-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="demo-title">Today — Monday</div>
              </div>
              <div className="demo-body">
                <div className="demo-item done">
                  <div className="item-check">✓</div>
                  <div className="item-info">
                    <div className="item-name">Calculus II</div>
                    <div className="item-meta">9:00 AM · Present</div>
                  </div>
                  <div className="item-badge green">92%</div>
                </div>
                <div className="demo-item done">
                  <div className="item-check">✓</div>
                  <div className="item-info">
                    <div className="item-name">Physics Lab</div>
                    <div className="item-meta">11:00 AM · Present</div>
                  </div>
                  <div className="item-badge green">88%</div>
                </div>
                <div className="demo-item active">
                  <div className="item-check">○</div>
                  <div className="item-info">
                    <div className="item-name">Organic Chemistry</div>
                    <div className="item-meta">2:00 PM · Pending</div>
                  </div>
                  <div className="item-badge red">71%</div>
                </div>
              </div>
              <div className="demo-footer">
                <div className="footer-stat">
                  <span className="stat-num">2/3</span>
                  <span className="stat-label">Marked</span>
                </div>
                <div className="footer-bar">
                  <div className="bar-fill" style={{ width: "66%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="section-inner">
          <div className="section-head">
            <h2>Everything you need</h2>
            <p>Built for students who take their attendance seriously.</p>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-num">01</div>
              <h3>Set once, track forever</h3>
              <p>Enter your semester dates and timetable once. We handle the rest — daily class lists, progress tracking, and deadline warnings.</p>
            </div>
            <div className="feature-item">
              <div className="feature-num">02</div>
              <h3>One tap attendance</h3>
              <p>Mark present or absent in under a second. No forms, no friction. Just tap and you're done.</p>
            </div>
            <div className="feature-item">
              <div className="feature-num">03</div>
              <h3>Know your status</h3>
              <p>Real-time percentages for every course. Green means safe, red means act now. No surprises at exam time.</p>
            </div>
            <div className="feature-item">
              <div className="feature-num">04</div>
              <h3>Smart reminders</h3>
              <p>Missed a class? Dropping below 75? We notify you before it becomes a problem, not after.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="process">
        <div className="section-inner">
          <div className="section-head">
            <h2>How it works</h2>
            <p>Three steps. Two minutes. Zero complexity.</p>
          </div>

          <div className="process-steps">
            <div className="step-card">
              <div className="step-icon">1</div>
              <h4>Set your semester</h4>
              <p>Start date, end date, exam date. That's all we need.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-icon">2</div>
              <h4>Add your courses</h4>
              <p>Name, day, time. Build your weekly schedule in seconds.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-icon">3</div>
              <h4>Track daily</h4>
              <p>Open, tap, done. We'll do the math and keep you informed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stats-inner">
          <div className="stat-block">
            <div className="stat-number">10,000+</div>
            <div className="stat-desc">Students tracking</div>
          </div>
          <div className="stat-block">
            <div className="stat-number">98%</div>
            <div className="stat-desc">Say it helped</div>
          </div>
          <div className="stat-block">
            <div className="stat-number">0</div>
            <div className="stat-desc">Data collected</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta">
        <div className="cta-inner">
          <h2>Stop guessing. Start knowing.</h2>
          <p>Your attendance data stays on your device. No accounts, no cloud, no tracking.</p>
          <button className="btn-main large" onClick={() => navigate("/form")}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-logo">
              <div className="logo-mark">A</div>
              <span>Attendance Tracker</span>
            </div>
            <p className="footer-tag">Student attendance tracking, simplified.</p>
          </div>
          <div className="footer-right">
            <span>© {new Date().getFullYear()} Attendance Tracker</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
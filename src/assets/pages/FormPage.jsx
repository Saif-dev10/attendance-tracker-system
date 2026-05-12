import { useState } from 'react';
import './FormPage.css';

export function FormPage() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  function handleChange(setter) {
    return (event) => {
      setter(event.target.value);
      console.log(event.target.value);
    };
  }

  function togglePasswordVisibility() {
    setPasswordVisible(prev => !prev);
  }

  function toggleSignInSignUp() {
    setIsSignIn(prev => {
      const newState = !prev;

      if (newState) {
        setName("");
      }

      return newState;
    });
  }

  return (
    <div className="form-page">

      <h1 className="form-title">
        Login or Sign Up
      </h1>

      <p id="popUp" className="popup">
        ✅ Login Successful!
      </p>

      <section className="form-section">

        <form className="form-card">

          <p className="error-message"></p>

          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange(setEmail)}
          />

          {!isSignIn && (
            <input
              className="form-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange(setName)}
            />
          )}

          <div className="password-wrapper">

            <input
              type={passwordVisible ? "text" : "password"}
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange(setPassword)}
              required
            />

            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible
                ? "🤫 Hide Password"
                : "👀 Show Password"}
            </button>

          </div>

          <p className="switch-mode">
            Click here to

            <span
              className="switch-link"
              onClick={toggleSignInSignUp}
            >
              {isSignIn ? " Sign up" : " Sign in"}
            </span>
          </p>

          <button
            type="submit"
            className="submit-btn"
          >
            Submit
          </button>

        </form>

      </section>

    </div>
  );
}
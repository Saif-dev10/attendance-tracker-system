import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './FormPage.css';

export function FormPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function handleChange(setter) {
    return (event) => {
      setter(event.target.value);
    };
  }

  function togglePasswordVisibility() {
    setPasswordVisible(prev => !prev);
  }

  function toggleSignInSignUp() {

    setErrorMessage("");

    setIsSignIn(prev => {

      const newState = !prev;

      if (newState) {
        setName("");
      }

      return newState;
    });
  }

  useEffect(() => {

    let timer;

    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }

    return () => clearTimeout(timer);

  }, [showMessage]);

  function validateForm() {

    if (!email.trim()) {
      return "Email is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email.";
    }

    if (!isSignIn && !name.trim()) {
      return "Name is required.";
    }

    if (!password) {
      return "Password is required.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character.";
    }

    return null;
  }

  function handleSubmit(e) {

    e.preventDefault();

    const error = validateForm();

    if (error) {
      setErrorMessage(error);
      return;
    }

    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    if (!isSignIn) {

      // SIGN UP

      const existingUser = storedUsers.find(
        (user) => user.email === email
      );

      if (existingUser) {
        setErrorMessage("Account already exists.");
        return;
      }

      const newUser = {
        name,
        email,
        password
      };

      storedUsers.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(storedUsers)
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(newUser)
      );

      setShowMessage(true);

      setTimeout(() => {
        navigate("/semesterSetup");
      }, 1500);

    } else {

      // SIGN IN

      const existingUser = storedUsers.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      if (!existingUser) {
        setErrorMessage("Invalid email or password.");
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(existingUser)
      );

      setShowMessage(true);

      setTimeout(() => {
        navigate("/semesterSetup");
      }, 1500);
    }

    setErrorMessage("");
  }

  return (

    <section className="form-container">

      <div className="form-page">

        <h1 className="form-title">
          {isSignIn ? "Login" : "Create Account"}
        </h1>

        {showMessage && (
          <p
            id="popUp"
            className="popup"
          >
            ✅ {isSignIn
              ? "Login Successful!"
              : "Account Created Successfully!"}
          </p>
        )}

        <section className="form-section">

          <form
            className="form-card"
            onSubmit={handleSubmit}
          >

            <p className="error-message">
              {errorMessage}
            </p>

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
                {isSignIn
                  ? " Sign up"
                  : " Sign in"}
              </span>

            </p>

            <button
              type="submit"
              className="submit-btn"
            >
              {isSignIn ? "Login" : "Create Account"}
            </button>

          </form>

        </section>

      </div>

    </section>
  );
}
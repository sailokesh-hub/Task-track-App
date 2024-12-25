import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../LoginPage/index.css";

const UserRegistration = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fetchTrue, setFetchTrue] = useState(false);
  const [errorMsg, setErrorMsg] = useState("please enter correct details");
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    alert("Registration Successful!");
    navigate("/login"); // redirect to login page after successful registration
  };

  const onSubmitFailure = (errorMsg) => {
    setFetchTrue(true);
    setErrorMsg(errorMsg);
    console.log(errorMsg);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      onSubmitFailure("Passwords do not match!");
      return;
    }

    const apiUrl = "https://task-track-app.onrender.com/register"; // replace with your API URL for registration
    const userDetails = { username, password, email };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        onSubmitSuccess();
      } else {
        onSubmitFailure(data.message || "Registration failed");
      }
    } catch (error) {
      onSubmitFailure("An error occurred during registration");
      console.error(error);
    }
  };

  const userNameInput = (event) => {
    setUsername(event.target.value);
  };

  const passwordInput = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordInput = (event) => {
    setConfirmPassword(event.target.value);
  };

  const emailInput = (event) => {
    setEmail(event.target.value);
  };

  const renderUsername = () => {
    return (
      <div className="username-container">
        {/* <label htmlFor="username" className="username-label">
          USERNAME
        </label> */}
        <br />
        <input
          placeholder="username"
          type="text"
          id="username"
          className="user-name"
          onChange={userNameInput}
          value={username}
        />
      </div>
    );
  };

  const renderPassword = () => {
    return (
      <div className="username-container">
        {/* <label htmlFor="password" className="username-label">
          PASSWORD
        </label> */}
        <br />
        <input
          placeholder="password"
          type="password"
          id="password"
          className="user-name"
          onChange={passwordInput}
          value={password}
        />
      </div>
    );
  };

  const renderConfirmPassword = () => {
    return (
      <div className="username-container">
        {/* <label htmlFor="confirmPassword" className="username-label">
          CONFIRM PASSWORD
        </label> */}
        <br />
        <input
          placeholder="confirm password"
          type="password"
          id="confirmPassword"
          className="user-name"
          onChange={confirmPasswordInput}
          value={confirmPassword}
        />
      </div>
    );
  };

  const renderEmail = () => {
    return (
      <div className="username-container">
        {/* <label htmlFor="email" className="username-label">
          EMAIL
        </label> */}
        <br />
        <input
          placeholder="email"
          type="email"
          id="email"
          className="user-name"
          onChange={emailInput}
          value={email}
        />
      </div>
    );
  };

  return (
    <div className="login-bg-container">
      <div className="form-container">
        <form className="login-form" onSubmit={onSubmit}>
          <h1 className="login-heading">Register</h1>
          {renderUsername()}
          {renderPassword()}
          {renderConfirmPassword()}
          {renderEmail()}
          {fetchTrue && <p className="error-msg">{errorMsg}</p>}
          <div>
            <button type="submit" className="login-btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fetchTrue, setFetchTrue] = useState(false);
  const [errorMsg, setErrorMsg] = useState("please enter correct details");

  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 1,
      path: "/",
    });
    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setFetchTrue(true);
    setErrorMsg(errorMsg);
    console.log(errorMsg);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Check for empty username or password before sending the request
    if (!username || !password) {
      onSubmitFailure("Please enter username and password");
      return;
    }

    const apiUrl = "https://task-track-app.onrender.com/login";
    const userDetails = { username, password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        onSubmitSuccess(data.jwt_token);
      } else {
        onSubmitFailure(data.message || "Login failed");
      }
    } catch (error) {
      onSubmitFailure("An error occurred during login");
      console.error(error);
    }
  };

  const userNameInput = (event) => {
    setUsername(event.target.value);
  };

  const passwordInput = (event) => {
    setPassword(event.target.value);
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

  return (
    <div className="login-bg-container">
      <div className="form-container">
        <form className="login-form" onSubmit={onSubmit}>
          <h1 className="login-heading">Login</h1>
          {renderUsername()}
          {renderPassword()}
          {fetchTrue && <p className="error-msg">{errorMsg}</p>}
          <div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

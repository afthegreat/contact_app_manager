import React, { useState } from "react";
import "./AuthPage.css"; // To apply the styling

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5001/api/users/login"
      : "http://localhost:5001/api/users/register";

    const payload = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          alert("Login successful!");
          localStorage.setItem("token", data.accessToken); // Save token
        } else {
          alert("Registration successful!");
          localStorage.setItem("token", data.accessToken); // Save token for new users
        }
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Error connecting to the server");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-password">
            {isLogin && <a href="#">Forgot password?</a>}
          </div>

          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

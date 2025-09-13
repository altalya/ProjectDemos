import React, { useState } from "react";
import "./AuthForm.css"; 
import cookies from 'js-cookie';
import { apiCall } from "../utils/APIHandler";


export default function AuthForm({auth}) {
  const [activeTab, setActiveTab] = useState("signin");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
     apiCall('/auth/register', 'POST', { name: formData.name, password: formData.password }, false);
    setFormData({
      name: "",
      password: "",
    }); 
   
  };

  async function handleSignIn(e) {
    e.preventDefault();
    console.log("Sign In Data:", formData);

    apiCall('/auth/login', 'POST', { name: formData.name, password: formData.password })
    .then(data => {
      console.log("API data",data);
      if (data.token) {
        cookies.set('token', data.token);
        cookies.set('userId', data.userId);
        auth(data.userId);
        console.log("Login successful, token stored in cookies.");
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
    });

    setFormData({
      name: "",
      password: "",
    });

  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Property Tenant Management</h2>

        <div className="tabs">
          <button
            className={activeTab === "signin" ? "active" : ""}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {activeTab === "signin" && (
          <form onSubmit={handleSignIn} className="auth-form">
            <input
              type="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        )}

        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="auth-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

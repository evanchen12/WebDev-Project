import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import "./UsersCSS/signin.css";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      alert("Username already taken");
    }
  };

  return (
    <div className="sign">
      <h1>Sign up</h1>
      {error && <div>{error}</div>}
      <h5>Username</h5>
      <input value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <br />
      <h5>Password</h5>
      <input value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <br />
      <button onClick={signup}> Sign up </button>
    </div>
  );
}

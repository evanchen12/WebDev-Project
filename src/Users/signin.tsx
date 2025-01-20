import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import Signup from "./signup";
import "./UsersCSS/signin.css";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signin({...credentials, username: credentials.username.toLowerCase()});
    navigate("/Kanbas/Account/Profile");
    } catch (err) {
      alert("Either the Username or Password is incorrect");
    }
  };

  return (
    <div>
      <div className="sign">
        <h1>Sign in</h1>
        <h5>Username</h5>
        <input value={credentials.username} onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })}/>
        <br />
        <h5>Password</h5>
        <input value={credentials.password} onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })}/>
        <br />
        <button onClick={signin}> Sign in </button>
      </div>
      <Signup/>
    </div>
  );
}

import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UsersCSS/profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container-fluid profile">
      <h1>{(profile.firstName !== "" && profile.lastName !== "") ? 
          `${ profile.firstName } ${ profile.lastName }'s  Profile` : 
          `${profile.firstName + profile.lastName}'s Profile`}
      </h1>
      <hr/>
      {profile && (
        <div className="bio">
          <div>
            <h3> Bio </h3>
            <h5> Name </h5>
            <input value={profile.firstName} placeholder="First name" onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })}/>
            <input value={profile.lastName} placeholder="Last name" onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })}/>
            <h5> Birth Date </h5>
            <input value={profile.dob} type="date" onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })}/>
          </div>
          <div>
            <h3> Account </h3>
            <h5> Username </h5>
            <input value={profile.username} onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })}/>
            <br/>
            <h5> Password </h5>
            <input value={profile.password} onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })}/>
            <br/>
            <h5> Email </h5>
            <input value={profile.email} onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })}/>
          </div>
        </div>
      )}
      {profile.role === "ADMIN" && 
        <Link to="/Kanbas/Account/Admin/Users"
          className="btn btn-warning w-100">
          Users
        </Link>
      }
      
      <button className="big-green" onClick={save}> Save </button>
      <button className="big-red" onClick={signout}> Sign out </button>
    </div>
  );
}

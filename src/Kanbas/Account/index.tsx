import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Signin from "../../Users/signin";
import Profile from "../../Users/profile";
import UserTable from "../../Users/table";
import * as client from "../../Users/client";

export default function Account() {
  const [profile, setProfile] = useState({ username: "", password: "", 
      firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const [loading, setLoading] = useState(true);
  
  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={
          profile.username === "" ? <Navigate to="/Kanbas/Account/Signin" /> : <Navigate to="/Kanbas/Account/Profile" />
        } />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />}/>
        <Route path="/Admin/Users" element={<UserTable />}/>
      </Routes>
    </div>
  );
}
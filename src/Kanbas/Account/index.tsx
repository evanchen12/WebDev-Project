import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "../../Users/signin";
import Profile from "../../Users/profile";
import UserTable from "../../Users/table";

export default function Account() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />}/>
        <Route path="/Admin/Users" element={<UserTable />}/>
      </Routes>
    </div>
  );
}
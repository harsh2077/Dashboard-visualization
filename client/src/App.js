import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Dashboard/Main";
import Login from "./components/Login/Login";
import Tasks from "./components/Dashboard/Tasks"
import Users from "./components/Dashboard/Users"
import CalendarComponent from './components/Dashboard/Calendar';
import FilesList from './components/Dashboard/Files';
import Analytics from './components/Dashboard/Analytics';
import Settings from './components/Dashboard/Settings';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/users" element={<Users />} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/files" element={<FilesList />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
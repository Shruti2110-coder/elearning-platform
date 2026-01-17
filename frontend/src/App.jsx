import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Courses from './pages/Courses';
import Register from './pages/Register';
import Login from './pages/Login';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import Navbar from './components/Navbar';
import ProtectRoute from './components/ProtectRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectRoute>
              <Courses />
            </ProtectRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <ProtectRoute>
              <CourseDetails />
            </ProtectRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <ProtectRoute>
              <MyCourses />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

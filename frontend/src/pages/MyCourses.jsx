import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/api/enrollments/my`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setEnrollments(res.data))
      .catch(err => console.error(err));
  }, [token, navigate]);

  if (!enrollments.length) return <p className="p-6 text-center">No enrolled courses yet.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrollments.map(enroll => (
          <div key={enroll._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{enroll.course.title}</h3>
            <p className="text-gray-600">Completed Lessons: {enroll.completedLessons.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

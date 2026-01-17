import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  if (!courses.length) return <p className="p-6 text-center">Loading courses...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Courses</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition">
            <div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-indigo-600 font-bold">{course.price || "Free"}</p>
              <Link
                to={`/course/${course._id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

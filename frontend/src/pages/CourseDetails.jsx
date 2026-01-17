import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5001/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const enroll = async () => {
    if (!token) {
      alert("You are not logged in. Please login to enroll.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/enrollments",
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("You are successfully enrolled!");
    } catch (err) {
      console.error(err);
      alert("You are already enrolled or something went wrong.");
    }
  };

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>

        <button
          onClick={enroll}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
        >
          Enroll Now
        </button>

        <h3 className="text-2xl font-semibold mb-4">Lessons</h3>

        {!token ? (
          <p className="text-red-600">
            Please login to watch videos and read notes.
          </p>
        ) : (
          <div className="space-y-4">
            {course.lessons.map((lesson, index) => (
              <div key={index} className="border p-4 rounded">
                <h4 className="font-bold mb-2">{lesson.title}</h4>
                <video src={lesson.videoUrl} controls className="w-full mb-2 rounded" />
                <a
                  href={lesson.notesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline"
                >
                  Read Notes
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

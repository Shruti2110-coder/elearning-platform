import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post("http://localhost:5001/api/auth/register", form);
      setMessage("✅ Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("❌ User already exists or something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {message && <p className="text-green-600 mb-3 text-center">{message}</p>}
        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Register
        </button>
      </form>
    </div>
  );
}

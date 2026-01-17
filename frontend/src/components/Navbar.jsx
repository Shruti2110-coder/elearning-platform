import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold text-lg">EduLearn</Link>
      <div className="space-x-4">
        <Link to="/">Courses</Link>
        {token ? (
          <>
            <Link to="/my-courses">My Courses</Link>
            <button onClick={logout} className="ml-3 bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

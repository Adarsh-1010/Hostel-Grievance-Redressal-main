import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('Student'); // Default to Student
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email, role) => {
    if (role === "Admin" && email !== "wardens@iiitranchi.ac.in") {
      return false;
    }
    if (role === "Student" && email === "wardens@iiitranchi.ac.in") {
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate email based on role
    if (!validateEmail(email, role)) {
      setErrorMessage(
        role === "Admin" 
          ? "Only Wardens can login as Admin" 
          : "Admin email cannot be used for Student login"
      );
      setShowErrorModal(true);
      return;
    }

    try {
      const body = { email, password, role };
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (data.jwtToken) {
        localStorage.setItem("jwtToken", data.jwtToken);
        navigate("/");
      } else {
        setErrorMessage("Invalid credentials. Please check your email and password.");
        setShowErrorModal(true);
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
      setShowErrorModal(true);
      console.log(err.message);
    }
  };

  // Clear email when role changes
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setEmail("");
  };

  return (
    <div className="w-full h-screen justify-center flex flex-col items-center align-middle">
      <div className=" flex w-[90%] max-w-[1200px] h-[80vh] bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="left-section">
          <img
            src="https://iiitranchi.ac.in/images/dirbg.jpg" /* Replace this URL with the image you want */
            alt="Background"
            className="background-image"
          />
          <div className="university-info">
            <h2>IIIT Ranchi</h2>
            <p>An Institution of National Importance under MoE, Govt. of India</p>
            <p className="highlighted-text">
            Ministry of Education
            </p>
          </div>
        </div>
        <div className="right-section">
          <div className="login-form">
            <div className="flex justify-center mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/b/ba/Indian_Institute_of_Information_Technology%2C_Ranchi_Logo.png"
                alt="Logo"
                className="logo w-32 h-32 object-contain"
              />
            </div>
            <div className="tabs">
              <button
                className={`tab ${role === "Student" ? "active-tab" : ""}`}
                onClick={() => handleRoleChange("Student")}
              >
                Student Login
              </button>
              <button
                className={`tab ${role === "Admin" ? "active-tab" : ""}`}
                onClick={() => handleRoleChange("Admin")}
              >
                Admin Login
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder={role === "Admin" ? "Enter warden email" : "Enter student email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
              <a href="/forgot-password" className="forgot-password">
                Forgotten password?
              </a>
              <button type="submit" className="login-button">
                Sign in
              </button>
              <p className="toggle-form-text">
                Don't have an account?{" "}
                <Link to="/signup" className="toggle-link text-blue-400 underline">
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>{" "}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full p-3 bg-red-100">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-2 text-red-800">
              Login Failed
            </h3>
            <p className="text-gray-600 text-center mb-4">{errorMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  setErrorMessage("");
                }}
                className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

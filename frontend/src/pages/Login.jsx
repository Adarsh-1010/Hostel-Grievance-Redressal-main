import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('Student'); // Default to Student

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
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
        alert("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      console.log(err.message);
    }
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
            <p>Old College, South Bridge, Edinburgh EH8 9YL, UK</p>
            <p className="highlighted-text">
              Accounting, Economics, Engineering
            </p>
          </div>
        </div>
        <div className="right-section">
          <div className="login-form">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/ba/Indian_Institute_of_Information_Technology%2C_Ranchi_Logo.png" /* Replace with your logo URL */
              alt="Logo"
              className="logo"
            />
            <div className="tabs">
              <button
                className={`tab ${role === "Student" ? "active-tab" : ""}`}
                onClick={() => setRole("Student")}
              >
                Student Login
              </button>
              <button
                className={`tab ${role === "Admin" ? "active-tab" : ""}`}
                onClick={() => setRole("Admin")}
              >
                Admin Login
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Email"
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
    </div>
  );
}

export default Login;

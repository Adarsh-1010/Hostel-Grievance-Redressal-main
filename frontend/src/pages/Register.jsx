import { useNavigate, Link } from "react-router-dom";
import { Roles } from "../constants";
import { useState } from "react";

function Register() {
  const navigate = useNavigate()
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(Roles.STUDENT);
  const [block_id, setBlock_id] = useState("");
  const [usn, setUsn] = useState("");
  const [room, setRoom] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    try {
      let body;
      if (role === Roles.WARDEN) {
        body = {
          full_name: fullname,
          email,
          password,
          phone,
          type: role,
          block_id,
        };
      } else {
        body = {
          full_name: fullname,
          email,
          password,
          phone,
          type: role,
          block_id,
          usn,
          room,
        };
      }
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "content-type": "application/json " },
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.jwtToken) {
        alert("User registered successfully,login to proceed");
        navigate('/login')
      } else {
        alert("user already exists");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">Welcome to Hostel Grievance Portal</h1>
            <p className="text-base text-gray-600">Create your account to get started</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white p-2 rounded-full">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/en/b/ba/Indian_Institute_of_Information_Technology%2C_Ranchi_Logo.png"
                    alt="IIIT Ranchi Logo"
                    className="w-32 h-24 object-contain"
                  />
                </div>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="flex justify-center mb-4">
                  <div className="bg-indigo-50 p-1 rounded-lg inline-flex">
                    <button
                      type="button"
                      onClick={() => setRole(Roles.WARDEN)}
                      className={`px-4 py-1.5 rounded-md transition-all duration-200 ${
                        role === Roles.WARDEN 
                          ? "bg-indigo-600 text-white shadow-md" 
                          : "text-indigo-600 hover:bg-indigo-100"
                      }`}
                    >
                      Warden
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole(Roles.STUDENT)}
                      className={`px-4 py-1.5 rounded-md transition-all duration-200 ${
                        role === Roles.STUDENT 
                          ? "bg-indigo-600 text-white shadow-md" 
                          : "text-indigo-600 hover:bg-indigo-100"
                      }`}
                    >
                      Student
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Block ID</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your Block ID"
                      onChange={(e) => setBlock_id(e.target.value)}
                      required
                    />
                  </div>

                  {role === Roles.STUDENT && (
                    <>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Room Number</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your room number"
                          onChange={(e) => setRoom(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Roll Number</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your roll number"
                          onChange={(e) => setUsn(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Create a strong password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        passwordError ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Confirm your password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (e.target.value !== password) {
                          setPasswordError("Passwords do not match");
                        } else {
                          setPasswordError("");
                        }
                      }}
                      required
                    />
                    {passwordError && (
                      <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Create Account
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

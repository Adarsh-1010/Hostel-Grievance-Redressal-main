import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/Auth";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const formatTimestamp1 = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const ComplaintForm = () => {
  const { authToken, headers } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sendEmailNotification = async (subject, message) => {
    try {
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toEmail: "adarshpathak181210@gmail.com",
          subject: subject,
          message: message,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send email notification");
      }
    } catch (err) {
      console.error("Error sending email notification:", err);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || name.trim() === "") {
      setSuccessMessage("Please enter a valid name.");
      setShowSuccessModal(true);
      setIsLoading(false);
      return;
    }
    if (!room || room.trim() === "") {
      setSuccessMessage("Please enter Room No.");
      setShowSuccessModal(true);
      setIsLoading(false);
      return;
    }
    if (!description || description.trim() === "") {
      setSuccessMessage("Please enter a valid complaint.");
      setShowSuccessModal(true);
      setIsLoading(false);
      return;
    }

    try {
      const body = { name, description, room };
      const response = await fetch("http://localhost:3000/complaints", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Send email notification
        const emailSubject = `New Complaint: ${name} - Room ${room}`;
        const emailMessage = `A new complaint has been registered:\n\nType: ${name}\nRoom: ${room}\nDescription: ${description}`;
        await sendEmailNotification(emailSubject, emailMessage);

        setSuccessMessage("Complaint registered successfully!");
        setShowSuccessModal(true);
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      } else {
        setSuccessMessage("Failed to register complaint. Please try again.");
        setShowSuccessModal(true);
      }
    } catch (err) {
      setSuccessMessage("An error occurred. Please try again.");
      setShowSuccessModal(true);
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className={`${isDarkMode ? 'bg-[#000435]' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'} py-12 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} sm:py-24 min-h-screen transition-colors duration-300`}>
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row gap-8">
          <div className="max-w-2xl px-4 lg:pr-24">
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleDarkMode}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'} backdrop-blur-sm border ${isDarkMode ? 'border-white/20' : 'border-gray-200'} hover:bg-opacity-20 transition-all duration-300`}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="mb-8 transform hover:scale-[1.02] transition-transform duration-300">
              <p className={`mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold tracking-wide`}>Hostel Grievance Redressal</p>
              <h3 className={`mb-5 text-4xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}>
                Submit Your Grievance
              </h3>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Hostel Grievance Redressal ensures a swift and confidential
                resolution of student concerns. We guarantee a quick response to
                submitted complaints, fostering a secure and comfortable living
                environment for all hostel residents.
              </p>
            </div>
            <div className="space-y-6">
              <div className={`flex font-medium ${isDarkMode ? 'bg-white/10' : 'bg-white'} p-6 rounded-xl hover:shadow-lg transition-all duration-300 ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'} transform hover:-translate-y-1`}>
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className={`mb-2 text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Swift Grievance Resolution</p>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Swift grievance resolution prioritizes timely and effective
                    solutions, ensuring students' concerns are promptly addressed
                    and resolved.
                  </span>
                </div>
              </div>
              <div className={`flex font-medium ${isDarkMode ? 'bg-white/10' : 'bg-white'} p-6 rounded-xl hover:shadow-lg transition-all duration-300 ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'} transform hover:-translate-y-1`}>
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                <div>
                  <p className={`mb-2 text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Confidentiality Assured</p>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Your grievances are handled with utmost confidentiality,
                    ensuring privacy and trust throughout the hostel grievance
                    redressal process.
                  </span>
                </div>
              </div>
              <div className={`flex font-medium ${isDarkMode ? 'bg-white/10' : 'bg-white'} p-6 rounded-xl hover:shadow-lg transition-all duration-300 ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'} transform hover:-translate-y-1`}>
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
                <div>
                  <p className={`mb-2 text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Easy Communication</p>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Effortless communication is facilitated, providing a smooth
                    and accessible channel for expressing and resolving grievances
                    within the hostel community.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-8 mb-8 max-w-md ${isDarkMode ? 'bg-white/10' : 'bg-white'} rounded-xl shadow-xl lg:mt-0 ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'} transform hover:scale-[1.02] transition-transform duration-300`}>
            <div className={`relative border-b ${isDarkMode ? 'border-white/20' : 'border-gray-200'} p-6 sm:px-8`}>
              <h3 className={`mb-1 inline-block text-3xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <span className="mr-4">Submit Complaint</span>
                <span className={`inline-block rounded-md ${isDarkMode ? 'bg-blue-400/20 text-blue-300' : 'bg-blue-100 text-blue-700'} px-3 py-1 text-sm font-medium`}>
                  Quick Response
                </span>
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Contact us for hostel grievance redressal
              </p>
            </div>
            <div className="p-6 sm:p-8">
              <select
                className={`w-full p-3 mb-4 border ${isDarkMode ? 'border-white/20 bg-white/5 text-gray-200' : 'border-gray-300 text-gray-700'} rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-400`}
                id="complaintType"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              >
                <option value="" disabled>Select a complaint type</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Other">Other</option>
              </select>
              <input
                id="email"
                type="text"
                className={`w-full p-3 mb-4 border ${isDarkMode ? 'border-white/20 bg-white/5 text-gray-200' : 'border-gray-300 text-gray-700'} rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-400`}
                placeholder="Enter your room number(and block) in this format"
                onChange={(e) => setRoom(e.target.value)}
              />
              <label className={`mt-5 mb-2 inline-block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                Tell us about your grievance
              </label>
              <textarea
                id="about"
                className={`w-full p-3 mb-8 border ${isDarkMode ? 'border-white/20 bg-white/5 text-gray-200' : 'border-gray-300 text-gray-700'} rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-400 min-h-[120px]`}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button
                className={`w-full rounded-lg bg-gradient-to-r ${isDarkMode ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} p-3 text-center font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5 relative`}
                onClick={onSubmitForm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Complaint"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 transform transition-all animate-scaleIn shadow-2xl">
            <div className="flex flex-col items-center justify-center">
              <div className={`rounded-full p-4 mb-4 ${successMessage.includes("successfully") ? "bg-green-100" : "bg-red-100"} animate-bounce`}>
                {successMessage.includes("successfully") ? (
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <h3 className={`text-2xl font-bold text-center mb-3 ${successMessage.includes("successfully") ? "text-green-800" : "text-red-800"}`}>
                {successMessage.includes("successfully") ? "Complaint Registered!" : "Error"}
              </h3>
              <p className="text-gray-600 text-center mb-6 text-lg">{successMessage}</p>
              <div className="flex justify-center w-full">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    if (!successMessage.includes("successfully")) {
                      setSuccessMessage("");
                    }
                  }}
                  className={`w-full px-6 py-3 rounded-xl text-white font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    successMessage.includes("successfully") 
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  }`}
                >
                  {successMessage.includes("successfully") ? "Redirecting..." : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 transform transition-all animate-scaleIn shadow-2xl">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Your Complaint</h3>
              <p className="text-gray-600 text-center">
                Please wait while we submit your complaint and send notifications...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Complaint = () => {
  const { authToken, headers } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    try {
      const response = await fetch("http://localhost:3000/complaints", {
        method: "GET",
        headers: headers,
      });

      const jsonData = await response.json();

      // Ensure complaints is always an array
      setComplaints(Array.isArray(jsonData) ? jsonData : []);
    } catch (err) {
      console.error(err.message);
      setComplaints([]);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <>
      <section className="w-full px-10 py-10">
        <div className="container mx-auto flex flex-col gap-8">
          {Array.isArray(complaints) && complaints.length === 0 ? (
            <p className="ml-4 mt-2 text-gray-600 text-xl"></p>
          ) : (
            <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
              {complaints.map((complaint) => (
                <div
                  key={complaint.complaint_id}
                  className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
                >
                  <div className="text-lg mb-2 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-2xl">
                    {complaint.name}
                  </div>
                  <p className="text-sm">
                    Created on {formatTimestamp1(complaint.created_at)}
                  </p>
                  <p className="mb-4 text-sm">
                    {complaint.assigned_at
                      ? `Completed on ${formatTimestamp(complaint.assigned_at)}`
                      : null}
                  </p>
                  <div
                    className="text-md leading-normal text-gray-400 sm:block overflow-hidden"
                    style={{ maxHeight: "100px" }}
                  >
                    {complaint.description}
                  </div>
                  <button
                    className={`group flex w-1/3 mt-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm ${
                      complaint.is_completed ? "bg-green-500" : "bg-red-600"
                    }`}
                  >
                    <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                      {complaint.is_completed ? "Completed" : "Not Completed"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export { ComplaintForm, Complaint };

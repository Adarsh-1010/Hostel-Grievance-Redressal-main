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

const WardenComplaints = () => {
  const { headers } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getComplaints = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/complaints", {
        method: "GET",
        headers: headers,
      });
      const jsonData = await response.json();
      setComplaints(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApproval = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/complaints/${id}`, {
        method: "POST",
        headers: headers,
      });
      if (response.ok) {
        getComplaints();
        setShowConfirmModal(false);
        setSelectedComplaint(null);
        setIsChecked(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  const deleteComplaint = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/complaints/${id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        setComplaints(complaints.filter((complaint) => complaint.id !== id));
        setShowDeleteModal(false);
        setSelectedComplaint(null);
        setIsDeleteChecked(false);
      } else {
        console.error("Failed to delete complaint");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === 'all') return true;
    if (filter === 'completed') return complaint.is_completed;
    if (filter === 'pending') return !complaint.is_completed;
    return true;
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#000435]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mt-20 mb-12 text-center">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
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
          <div className="inline-block">
            <h1 className={`text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-blue-400 via-purple-400 to-indigo-400' : 'from-blue-600 via-purple-600 to-indigo-600'} mb-4`}>
              Complaints Dashboard
            </h1>
            <div className={`h-1 w-24 bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} mx-auto rounded-full`}></div>
          </div>
          <p className={`mt-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Manage and track student complaints efficiently. Stay updated with the latest submissions and their status.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className={`flex items-center ${isDarkMode ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-sm px-4 py-2 rounded-full shadow-sm ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>Total Complaints: {complaints.length}</span>
            </div>
            <div className={`flex items-center ${isDarkMode ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-sm px-4 py-2 rounded-full shadow-sm ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>
                Completed: {complaints.filter(c => c.is_completed).length}
              </span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'all'
                  ? `${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`
                  : `${isDarkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-white text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              All Complaints
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'pending'
                  ? `${isDarkMode ? 'bg-yellow-500 text-white' : 'bg-yellow-600 text-white'}`
                  : `${isDarkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-white text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'completed'
                  ? `${isDarkMode ? 'bg-green-500 text-white' : 'bg-green-600 text-white'}`
                  : `${isDarkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-white text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <div className={`flex flex-col items-center justify-center p-8 ${isDarkMode ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-sm rounded-xl shadow-lg ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {filter === 'all' 
                ? 'No complaints registered yet.'
                : filter === 'completed'
                ? 'No completed complaints.'
                : 'No pending complaints.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.complaint_id}
                className={`${isDarkMode ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-sm rounded-xl shadow-lg ${isDarkMode ? 'border border-white/20' : 'border border-gray-100'} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {complaint.name}
                    </h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${isDarkMode ? 'bg-blue-400/20 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                      Room {complaint.room}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Created on {formatTimestamp1(complaint.created_at)}
                    </div>
                    {complaint.assigned_at && (
                      <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed on {formatTimestamp(complaint.assigned_at)}
                      </div>
                    )}
                  </div>

                  <div className={`${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg p-4 mb-4`}>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{complaint.description}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (!complaint.is_completed) {
                          setSelectedComplaint(complaint);
                          setShowConfirmModal(true);
                        }
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                        complaint.is_completed
                          ? "bg-green-500/80 hover:bg-green-500"
                          : "bg-blue-500/80 hover:bg-blue-500"
                      }`}
                    >
                      {complaint.is_completed ? "Completed" : "Mark Complete"}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setShowDeleteModal(true);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className={`${isDarkMode ? 'bg-[#000435]' : 'bg-white'} rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all animate-scaleIn shadow-2xl border ${isDarkMode ? 'border-white/20' : 'border-gray-100'}`}>
            <div className="flex flex-col items-center justify-center">
              <div className={`rounded-full p-4 mb-4 ${isDarkMode ? 'bg-yellow-400/20' : 'bg-yellow-100'} animate-bounce`}>
                <svg className={`w-12 h-12 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold text-center mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Confirm Action
              </h3>
              <p className={`text-center mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Are you sure you want to mark this complaint as completed?
              </p>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="confirmCheckbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className={`w-5 h-5 ${isDarkMode ? 'text-blue-400 border-gray-600' : 'text-blue-600 border-gray-300'} rounded focus:ring-blue-500 bg-transparent`}
                />
                <label htmlFor="confirmCheckbox" className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I confirm that this complaint has been resolved
                </label>
              </div>

              <div className="flex justify-center gap-4 w-full">
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setSelectedComplaint(null);
                    setIsChecked(false);
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/20' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (isChecked && selectedComplaint) {
                      handleApproval(selectedComplaint.id);
                    }
                  }}
                  disabled={!isChecked}
                  className={`px-6 py-3 rounded-xl text-white font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    isChecked 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className={`${isDarkMode ? 'bg-[#000435]' : 'bg-white'} rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all animate-scaleIn shadow-2xl border ${isDarkMode ? 'border-white/20' : 'border-gray-100'}`}>
            <div className="flex flex-col items-center justify-center">
              <div className={`rounded-full p-4 mb-4 ${isDarkMode ? 'bg-red-400/20' : 'bg-red-100'} animate-bounce`}>
                <svg className={`w-12 h-12 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold text-center mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Delete Complaint
              </h3>
              <p className={`text-center mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Are you sure you want to delete this complaint?
              </p>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="deleteCheckbox"
                  checked={isDeleteChecked}
                  onChange={(e) => setIsDeleteChecked(e.target.checked)}
                  className={`w-5 h-5 ${isDarkMode ? 'text-red-400 border-gray-600' : 'text-red-600 border-gray-300'} rounded focus:ring-red-500 bg-transparent`}
                />
                <label htmlFor="deleteCheckbox" className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I understand this action cannot be undone
                </label>
              </div>

              <div className="flex justify-center gap-4 w-full">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedComplaint(null);
                    setIsDeleteChecked(false);
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-white/10 text-gray-200 hover:bg-white/20 border border-white/20' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (isDeleteChecked && selectedComplaint) {
                      deleteComplaint(selectedComplaint.id);
                    }
                  }}
                  disabled={!isDeleteChecked}
                  className={`px-6 py-3 rounded-xl text-white font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    isDeleteChecked 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardenComplaints;

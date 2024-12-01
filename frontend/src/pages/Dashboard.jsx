import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
// import Complaint from "./Complaint";  // Default import if Complaint is a default export
import { ComplaintForm, Complaint } from './Complaint';

import WardenComplaints from "./WardenComplaint";  // Default import if WardenComplaints is a default export
import { GetAuthHeader } from "../testing/Headers";  // Assuming you have a function to get auth headers

function Dashboard() {
  const [userType, setUserType] = useState(null);  // state to store the user type
  const [loading, setLoading] = useState(true);  // state to manage loading state

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:3000/userType", {
          method: "GET",
          headers: GetAuthHeader(),
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.userType);  // Set userType after fetching
        } else {
          console.error('Failed to fetch user type');
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);  // Stop loading after the request is complete
      }
    };

    fetchUserType();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading text or component while fetching userType
  }

  return (
    <>
      <Navbar />
      {userType === "student" && <div className="mt-8"><Complaint /> <ComplaintForm/></div>}  {/* Render Complaint for student */}
      {userType === "warden" && <WardenComplaints />}  {/* Render WardenComplaints for warden */}
    </>
  );
}

export default Dashboard;

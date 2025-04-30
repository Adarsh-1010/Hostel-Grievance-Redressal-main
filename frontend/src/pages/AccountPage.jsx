import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/Auth";
import { Link } from "react-router-dom";

function AccountPage() {
  const { headers } = useAuth();
  const [userName, setUserName] = useState("");
  const [useremail, setemail] = useState("");
  const [userphone, setphone] = useState("");
  const [userUsn, setUsn] = useState("");
  const [userRoom, setRoom] = useState("");
  const [userblockID, setblockID] = useState("");
  const [userblockname, setblockname] = useState("");
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:3000/userType", {
          method: "GET",
          headers: headers,
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.userType);
          console.log(data.userType);
        } else {
          console.error("Failed to fetch user type");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserType();
  }, []);

  const getuserDetails = async (user_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/userDetails/${user_id}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      console.log(data);
      setUserName(data[0].full_name);
      setemail(data[0].email);
      setphone(data[0].phone);
      setUsn(data[0].usn);
      setRoom(data[0].room);
      setblockID(data[0].block_id);
      setblockname(data[0].block_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getuserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-28 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-5 border border-gray-100">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center">Profile</h2>

            <ul className="space-y-3">
              <li className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Name</span>
                  <span className="text-gray-800 font-semibold">{userName}</span>
                </div>
              </li>
              <li className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Email</span>
                  <span className="text-gray-800 font-semibold">{useremail}</span>
                </div>
              </li>
              <li className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Phone</span>
                  <span className="text-gray-800 font-semibold">{userphone}</span>
                </div>
              </li>
              {userType !== "warden" && (
                <>
                  <li className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">USN</span>
                      <span className="text-gray-800 font-semibold">{userUsn}</span>
                    </div>
                  </li>
                  <li className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Block ID</span>
                      <span className="text-gray-800 font-semibold">{userblockID}</span>
                    </div>
                  </li>
                  <li className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Block Name</span>
                      <span className="text-gray-800 font-semibold">{userblockname}</span>
                    </div>
                  </li>
                  <li className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Room</span>
                      <span className="text-gray-800 font-semibold">{userRoom}</span>
                    </div>
                  </li>
                </>
              )}
            </ul>

            <div className="mt-6 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;

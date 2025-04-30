import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white shadow-lg fixed w-full z-10 top-0 border-b border-gray-100">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <a href="/" className="flex items-center whitespace-nowrap text-2xl font-black">
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent font-extrabold tracking-wide hover:from-gray-900 hover:to-black transition-all duration-300">
              IIIT Ranchi Complaints
            </span>
          </a>
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label className="absolute top-5 right-7 cursor-pointer md:hidden" htmlFor="navbar-open">
            <span className="sr-only">Toggle Navigation</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className={`peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start`}
          >
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="md:mr-12">
                <Link to="/account" className="flex items-center space-x-2 rounded-lg bg-gray-100 px-6 py-2 font-medium text-gray-800 shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Account</span>
                </Link>
              </li>
              <li className="md:mr-12">
                <button
                  className="flex items-center space-x-2 rounded-lg bg-gray-800 px-6 py-2 font-medium text-white shadow-md hover:bg-gray-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={logout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;

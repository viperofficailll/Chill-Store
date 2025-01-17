import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const  navigate= useNavigate()
    return (
         
      <nav className="bg-black bg-opacity-80 text-white fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-wide text-teal-400" onClick={()=>navigate('/home')}>
                Chill Store
              </h1>
            </div>
  
            {/* Links */}
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/home"
                className="text-sm font-medium hover:text-teal-400 transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-sm font-medium hover:text-teal-400 transition-colors"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="text-sm font-medium hover:text-teal-400 transition-colors"
              >
                Contact
              </NavLink>
              <NavLink
                to="/help"
                className="text-sm font-medium hover:text-teal-400 transition-colors">
             
                Help
              </NavLink>
            </div>
  
            {/* Profile and Cart Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart Button */}
              <button className="px-4 py-2 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition" onClick={()=>navigate('/cart')}>
                Cart (3)
              </button>
  
              {/* Profile Button */}
              <button className="px-4 py-2 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition" onClick={()=>navigate('/profile')}>
                Profile
              </button>
            </div>
  
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-white hover:text-teal-400 focus:outline-none"
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  
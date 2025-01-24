import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for Hamburger Menu
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai"; // Icons for Profile and Logout
import logo from "../../assets/llg.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white/70 backdrop-blur-xl px-4 md:px-16 py-4 fixed top-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="K-Tech" className="w-10 md:w-14" />
          <h2 className="text-2xl md:text-4xl">K-Tech</h2>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/products" className="hover:text-gray-400">
            Products
          </a>

          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
            >
              Login 
            </button>
          ) : (
            <div className="relative">
              <img src="https://i.ibb.co.com/7bHZFKf/my.png" 
                className="border-gray-300 border-2 w-14 rounded-full cursor-pointer hover:border-gray-600"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              />
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-red-200 text-black rounded shadow-lg"
                  role="menu"
                >
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">
                    <AiOutlineUser className="text-lg" /> John Doe
                  </div>
                  <a
                    href="/dashboard"
                    className=" px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    role="menuitem"
                  >
                    <AiOutlineUser className="text-lg" /> Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 md:flex items-center gap-2"
                    role="menuitem"
                  >
                    <AiOutlineLogout className="text-lg" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <a href="/" className="block hover:text-gray-400">
            Home
          </a>
          <a href="/products" className="block hover:text-gray-400">
            Products
          </a>

          {!isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setIsMenuOpen(false);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition block w-full text-center"
            >
              Login / Register
            </button>
          ) : (
            <div className="space-y-2">
              <div className="px-4 py-2 font-semibold flex items-center gap-2">
                <AiOutlineUser className="text-lg" /> John Doe
              </div>
              <a
                href="/dashboard"
                className=" px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <AiOutlineUser className="text-lg" /> Dashboard
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <AiOutlineLogout className="text-lg" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

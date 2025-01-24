import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for Hamburger Menu
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai"; // Icons for Profile and Logout
import logo from "../../assets/llg.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Auth/Providers/AuthProvider";
import { BiMenu } from "react-icons/bi";
import "./Active.css"

const navLinks = <>
  <NavLink className={`hover:bg-blue-100 hover:text-black rounded px-1`} to={'/'}>Home</NavLink>
  <NavLink className={`hover:bg-blue-100 hover:text-black rounded px-1`} to={'/products'}>Products</NavLink>
  <NavLink className={`hover:bg-blue-100 hover:text-black rounded px-1`} to={'/contact'}>Contact Us</NavLink>
  <NavLink className={`hover:bg-blue-100 hover:text-black rounded px-1`} to={'/about'}>About Us</NavLink>
</>

const Navbar = () => {
  const { user, UserSignOut } = useContext(AuthContext)
  // console.log(user)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


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

          <div className="flex items-center justify-center gap-4 bg-blue-200 rounded-full px-8 py-1 font-serif font-semibold">
            {navLinks}
          </div>


          {!user ?
            <Link to={'/login'}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
              >
                Login
              </button>
            </Link> :
            <div className="relative">
              <img src={user.photoURL ? `${user.photoURL}` : "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"}
                className="border-gray-300 border-2 w-14 h-14 rounded-full cursor-pointer hover:border-gray-600"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              />
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-56 bg-red-200 text-black rounded shadow-lg"
                  role="menu"
                >
                  <div className="px-4 py-2 font-semibold flex items-center gap-2">
                    <AiOutlineUser className="text-lg" />{user?.displayName}
                  </div>
                  <a
                    href="/dashboard"
                    className=" px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    role="menuitem"
                  >
                    <BiMenu className="text-lg" /> Dashboard
                  </a>
                  <button
                    onClick={UserSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 md:flex items-center gap-2"
                    role="menuitem"
                  >
                    <AiOutlineLogout className="text-lg" /> Logout
                  </button>
                </div>
              )}
            </div>}


        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {
        isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">

            <div className="flex  flex-col gap-2">
              {navLinks}
            </div>

            {!user ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="btn btn-info btn-xs"
              >
                Login
              </button>
            ) : (
              <div className="space-y-2">

                <div className="px-4 py-2 font-semibold flex items-center justify-center gap-2">
                  <AiOutlineUser className="text-lg" /> {user?.displayName}
                </div>

                <Link to={"/dashboard"}>
                  <button className="btn btn-outline btn-sm w-full text-left">
                    <BiMenu className="text-lg" />
                    Dashboard
                  </button>
                </Link>

                <button
                  onClick={UserSignOut}
                  className="btn btn-outline btn-sm w-full text-left"
                >
                  <AiOutlineLogout className="text-lg" /> Logout
                </button>
              </div>
            )}
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;

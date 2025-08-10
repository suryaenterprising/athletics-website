import React, { useRef, useEffect } from 'react';
import useScrollNav from '../hooks/useScrollNav';

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#competitions", label: "Competitions" },
  { href: "#achievements", label: "Achievements" },
  { href: "#records", label: "Records" },
  { href: "#athletes", label: "Athletes" },
];

const Navbar = ({ onSignIn }) => {
  useScrollNav('navbar');
  const dropdownRef = useRef();

  // Dropdown accessibility on click (for mobile/support)
  useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        const menu = dropdownRef.current.querySelector('.dropdown-menu');
        if (menu) menu.style.display = 'none';
      }
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 glass transition-all duration-300 py-4 px-8 flex justify-between items-center"
    >
      {/* Logo & Title */}
      <div className="flex items-center">
        <img
          src="logo1.png"
          alt="IIT Indore Athletics Club Logo"
          className="h-12 w-12 mr-3"
        />
        <h1 className="text-xl font-bold text-white">
          Athletics Club IIT Indore
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link text-white hover:text-blue-300 transition"
          >
            {link.label}
          </a>
        ))}

        {/* Dropdown */}
        <div ref={dropdownRef} className="dropdown relative">
          <button
            className="flex items-center text-white hover:text-blue-300 transition"
            onClick={(e) => {
              e.preventDefault();
              const m = dropdownRef.current.querySelector('.dropdown-menu');
              if (m) {
                m.style.display = m.style.display === 'block' ? 'none' : 'block';
              }
            }}
          >
            Sign In <i className="fas fa-chevron-down ml-1 text-xs"></i>
          </button>
          <div className="dropdown-menu absolute hidden right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left"
              onClick={() => onSignIn('user')}
            >
              User
            </button>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left"
              onClick={() => onSignIn('admin')}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white text-2xl">
        <i className="fas fa-bars"></i>
      </button>
    </nav>
  );
};

export default Navbar;

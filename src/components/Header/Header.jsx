import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="md:py-4 shadow-md bg-white rounded-b-xl z-50">
      <Container>
        <nav className="flex items-center justify-between relative">
          
          <Link to="/">
            <Logo width="90px" fetchpriority="high"/>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
          </button>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-x-4">
            {navItems.map((item) =>
              item.active && (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `px-6 py-2 rounded-full border font-medium transition duration-300 hover:scale-105 hover:shadow-lg active:scale-105 
                      ${isActive ? "bg-gray-500 text-white border-gray-500" : "border-gray-700 text-gray-700"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-md rounded-b-xl md:hidden z-50">
              <ul className="flex flex-col items-center py-4 gap-y-4">
                {navItems.map((item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `block w-full text-center px-4 py-2 rounded-full border font-medium transition duration-300 
                          hover:bg-gray-100 active:scale-95 
                          ${isActive ? "bg-gray-500 text-white border-gray-500" : "border-gray-700 text-gray-700"}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
                )}

                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;

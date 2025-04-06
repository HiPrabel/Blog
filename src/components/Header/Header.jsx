import React, { useState, useEffect } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    localStorage.theme = isDark ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', isDark);
  };

  return (
    <header className="md:py-4 shadow-md bg-gray-100 dark:bg-gray-950 dark:text-white rounded-xl z-50">
      <Container>
        <nav className="flex items-center justify-between relative">
          <Link to="/">
            <Logo width="90px" className="dark:invert" fetchpriority="high" />
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
          </button>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `px-6 py-2 rounded-full border font-medium transition duration-300 hover:scale-105 hover:shadow-lg active:scale-105 
                         ${isActive
                            ? "bg-gray-500 text-white border-gray-500"
                            : "border-gray-700 text-gray-700 dark:border-white dark:text-white"}`
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

            <li>
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-full border border-gray-300 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </li>
          </ul>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-900 shadow-md rounded-b-xl md:hidden z-50">
              <ul className="flex flex-col items-center py-4 gap-y-4">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name}>
                        <NavLink
                          to={item.slug}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `block w-full text-center px-4 py-2 rounded-full border font-medium transition duration-300 
                             hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 
                             ${isActive
                                ? "bg-gray-500 text-white border-gray-500"
                                : "border-gray-700 text-gray-700 dark:border-white dark:text-white"}`
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

                <li>
                  <button
                    onClick={() => {
                      toggleDarkMode();
                      setMenuOpen(false);
                    }}
                    className="p-2 rounded-full border border-gray-300 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;

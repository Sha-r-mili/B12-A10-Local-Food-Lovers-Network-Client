import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('Logged out successfully!');
        setShowDropdown(false);
      })
      .catch((error) => {
        toast.error('Logout failed');
        console.error(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-3 rounded ${
              isActive
                ? 'text-orange-500 font-semibold'
                : 'text-gray-700 hover:text-orange-500'
            }`
          }
          onClick={() => setShowMobileMenu(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-reviews"
          className={({ isActive }) =>
            `block py-2 px-3 rounded ${
              isActive
                ? 'text-orange-500 font-semibold'
                : 'text-gray-700 hover:text-orange-500'
            }`
          }
          onClick={() => setShowMobileMenu(false)}
        >
          All Reviews
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-review"
              className={({ isActive }) =>
                `block py-2 px-3 rounded ${
                  isActive
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-reviews"
              className={({ isActive }) =>
                `block py-2 px-3 rounded ${
                  isActive
                    ? 'text-orange-500 font-semibold'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
              onClick={() => setShowMobileMenu(false)}
            >
              My Reviews
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍕</span>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              Local Food Lovers
            </span>
            <span className="text-xl font-bold text-gray-800 sm:hidden">
              Food Lovers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">{navLinks}</ul>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none"
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-orange-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/40';
                    }}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/my-favorites"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      My Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-orange-500 font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center"
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-orange-500"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/my-favorites"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      My Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-700 hover:text-orange-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMobileMenu ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4">
            <ul className="space-y-2">{navLinks}</ul>
            {!user && (
              <div className="mt-4 space-y-2">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2 text-gray-700 hover:text-orange-500 font-semibold"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
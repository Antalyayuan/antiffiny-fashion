import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "../types";
import { COLORS } from "../constants";
import { MenuIcon, XIcon } from "./IconComponents";
import logo from "../assets/images/logo.png";
import { useCart } from "../context/CartContext"; // ✅ 购物车上下文

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const token = localStorage.getItem("auth_token");
  const userFirstName = localStorage.getItem("user_firstname");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`bg-${COLORS.bgWhite} shadow-md fixed w-full z-50 top-0 left-0`}
    >
      <div className="w-full px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 w-full">
          {/* ✅ Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold flex items-center"
          >
            <img
              src={logo}
              alt="Antiffany Logo"
              className="h-14 md:h-20 w-auto"
            />
          </Link>

          {/* ✅ Desktop Menu */}
          <div className="hidden lg:flex items-center justify-end min-w-0 space-x-6">
            <div className="flex flex-wrap items-baseline space-x-2 sm:space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    location.pathname === item.path
                      ? `bg-${COLORS.brandGreen} text-white`
                      : `text-${COLORS.textPrimary} hover:bg-gray-200`
                  } transition-colors duration-150`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* ✅ Cart icon + badge */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-[#81D8D0] transition"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#81D8D0] text-white text-xs rounded-full px-2 py-[1px]">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ✅ Welcome + Logout */}
            <div className="flex items-center space-x-3 ml-6">
              {token ? (
                <>
                  <span className="text-sm text-gray-700">
                    👋 Welcome,&nbsp;
                    <span className="font-semibold text-[#0d9488]">
                      {userFirstName || "Guest"}
                    </span>
                  </span>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/user"
                  className="text-sm text-gray-700 hover:text-[#81D8D0] transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* ✅ Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md text-${COLORS.textPrimary} hover:text-white hover:bg-${COLORS.brandGreen} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="h-7 w-7" />
              ) : (
                <MenuIcon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile menu overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>

          <div
            className={`fixed top-20 md:top-24 left-0 w-full shadow-lg z-50 lg:hidden animate-slide-down bg-${COLORS.bgWhite}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`block w-full px-4 py-3 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? `bg-${COLORS.brandGreen} text-white`
                      : `text-${COLORS.textPrimary} hover:bg-gray-200 hover:text-${COLORS.brandBlue}`
                  } transition-colors duration-150`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* ✅ Mobile Cart */}
              <Link
                to="/cart"
                className="block w-full px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                🛒 Cart ({totalItems})
              </Link>

              {/* ✅ Mobile Sign in / Welcome */}
              <div className="pt-2 border-t text-center">
                {token ? (
                  <>
                    <p className="text-sm text-gray-700 mb-2">
                      👋 Welcome,{" "}
                      <span className="font-semibold text-[#0d9488]">
                        {userFirstName}
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="text-sm text-gray-500 hover:text-black"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/user"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-700 hover:text-[#81D8D0]"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { COMPANY_INFO, NAV_ITEMS, COLORS } from "../constants";
import logo from "../assets/images/logo.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-${COLORS.footerBg} text-gray-300 pt-12 pb-8`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo */}
          <div>
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="mb-4">
                <img src={logo} alt="Logo" className="h-30 w-auto" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`hover:text-${COLORS.brandAccentGreen} transition-colors duration-150 text-sm`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-400 pt-8 mt-8 text-sm text-gray-400 flex justify-between items-center flex-wrap">
          {/* 左边版权信息 */}
          <p className="text-left">
            &copy; {currentYear} {COMPANY_INFO.name}
          </p>

          {/* 右边社交链接 */}
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all duration-300"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all duration-300"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-purple-900 to-black text-white py-6 px-8 flex flex-col md:flex-row items-center justify-between border-t border-pink-600">
      {/* Left section: Project name */}
      <div className="text-xl font-bold tracking-wider mb-4 md:mb-0">
        Moodstory
      </div>

      {/* Center section: Links */}
      <div className="flex gap-6 items-center">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-pink-500 transition-colors"
        >
          <FaGithub className="w-5 h-5" /> GitHub
        </a>
        {/* <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-pink-500 transition-colors"
        >
          <FaLinkedin className="w-5 h-5" /> LinkedIn
        </a> */}
      </div>

      {/* Right section: Copyright */}
      <div className="text-sm text-gray-400 mt-4 md:mt-0">
        &copy; {new Date().getFullYear()} Moodstory. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

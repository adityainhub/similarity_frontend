import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import favIcon from "/fav-Icon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (target: string) => {
    // Check if we're on the home page
    if (location.pathname === '/') {
      // On home page, scroll to the section
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to the home page with section hash
      navigate(`/#${target}`);
    }
  };

  return (
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <div className="bg-black/60 rounded-full py-2.5 px-8 max-w-4xl w-full mx-auto flex justify-between items-center shadow-lg backdrop-blur-sm">
          <a href="/" className="text-[#f59f00] text-2xl font-bold flex items-center gap-2">
            <img src={favIcon} alt="Similarity Icon" className="w-9 h-9" />
            Similarity
          </a>

          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => handleNavigation('why-us')} className="text-white hover:text-gray-300 transition-colors">Why Us</button>
            <button onClick={() => handleNavigation('mission')} className="text-white hover:text-gray-300 transition-colors">Mission</button>
            <button onClick={() => handleNavigation('about-us')} className="text-white hover:text-gray-300 transition-colors">About Us</button>
            <button onClick={() => handleNavigation('faq')} className="text-white hover:text-gray-300 transition-colors">FAQ</button>
            <button onClick={() => handleNavigation('contact')} className="text-white hover:text-gray-300 transition-colors">Contact Us</button>
          </div>

          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-r rounded-lg opacity-30 blur-sm"></div>
            <button
                className="relative bg-[#2a2417] text-[#ff9d00] px-4 py-2 rounded-md hover:bg-[#352c1d] transition-colors"
                onClick={() => navigate('/search')}
            >
                Explore
            </button>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
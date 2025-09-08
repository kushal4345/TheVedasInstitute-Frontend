import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import vedasLogo from '../assets/vedas-logo.jpg';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-gray-800/30 shadow-2xl">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          
          {/* Revolutionary Logo Section */}
          <div className="flex items-center space-x-3 sm:space-x-4 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src={vedasLogo} alt="The Vedas Institute Logo" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-base sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                The Vedas Institute
              </span>
              <span className="text-gray-400 text-xs font-medium">Academic Excellence</span>
            </div>
          </div>

          {/* Revolutionary Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 font-medium group ${
                  location.pathname === item.path 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Advanced Hover Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animated Underline */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
                
                {/* Floating Particles on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-1 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-ping"></div>
                  <div className="absolute top-2 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping delay-300"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Revolutionary Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Join Now Button */}
            <Button asChild className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30 border-0">
              <Link to="/signup">
                <span className="relative z-10 text-sm sm:text-base">Join Now</span>
                
                {/* Advanced Button Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0.5 rounded-xl bg-black"></div>
                </div>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <button className="md:hidden relative p-2.5 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="w-5 h-5 flex flex-col justify-center items-center space-y-1">
                <span className="w-4 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-indigo-400"></span>
                <span className="w-4 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-purple-400"></span>
                <span className="w-4 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-pink-400"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

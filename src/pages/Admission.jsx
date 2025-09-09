import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  School, 
  Users, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Send
} from 'lucide-react';

const Admission = () => {
  const [formData, setFormData] = useState({
    // Student Details
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    
    // School Details
    schoolName: '',
    board: '',
    currentClass: '',
    previousClass: '',
    
    // Contact Details
    email: '',
    mobile: '',
    alternateMobile: '',
    
    // Parent Details
    fatherName: '',
    fatherMobile: '',
    
    // Address Details
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Course Selection
    selectedCourse: '',
    preferredBatch: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'dateOfBirth', 'gender',
      'schoolName', 'board', 'currentClass',
      'email', 'mobile', 'fatherName', 'fatherMobile',
      'address', 'city', 'state', 'pincode', 'selectedCourse'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Mobile validation
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (formData.fatherMobile && !/^\d{10}$/.test(formData.fatherMobile)) {
      newErrors.fatherMobile = 'Please enter a valid 10-digit mobile number';
    }
    
    
    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <Navigation />
        
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="max-w-md w-full">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">
                Application Submitted!
              </h2>
              
              <p className="text-gray-300 mb-6">
                Thank you for your interest in The Vedas Institute. We will contact you soon with further details.
              </p>
              
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: '', lastName: '', dateOfBirth: '', gender: '',
                    schoolName: '', board: '', currentClass: '', previousClass: '',
                    email: '', mobile: '', alternateMobile: '',
                    fatherName: '', fatherOccupation: '', fatherMobile: '',
                    motherName: '', motherOccupation: '', motherMobile: '',
                    address: '', city: '', state: '', pincode: '',
                    selectedCourse: '', preferredBatch: '',
                    previousCoaching: '', medicalConditions: '', emergencyContact: '', additionalInfo: ''
                  });
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <Navigation />


      {/* Admission Form */}
      <section className="relative py-8 sm:py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="text-white">Join</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                The Vedas Institute
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Fill out the form below to begin your journey with us. All fields marked with * are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Details */}
            <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Student Details</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.firstName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.lastName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.dateOfBirth 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.gender 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* School Details */}
            <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                  <School className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">School Details</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.schoolName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your school name"
                  />
                  {errors.schoolName && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.schoolName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Board *
                  </label>
                  <select
                    name="board"
                    value={formData.board}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.board 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select Board</option>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                    <option value="state">State Board</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.board && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.board}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Class *
                  </label>
                  <select
                    name="currentClass"
                    value={formData.currentClass}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.currentClass 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select Current Class</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                  {errors.currentClass && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.currentClass}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Previous Class
                  </label>
                  <select
                    name="previousClass"
                    value={formData.previousClass}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                  >
                    <option value="">Select Previous Class</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Contact Details</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.mobile 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobile && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.mobile}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Alternate Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Enter alternate mobile number"
                  />
                </div>
              </div>
            </div>

            {/* Parent Details */}
            <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Parent Details</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.fatherName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter father's name"
                  />
                  {errors.fatherName && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.fatherName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Father's Mobile *
                  </label>
                  <input
                    type="tel"
                    name="fatherMobile"
                    value={formData.fatherMobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.fatherMobile 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter father's mobile number"
                  />
                  {errors.fatherMobile && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.fatherMobile}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Address Details</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                      errors.address 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your complete address"
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.city 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.state 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                      }`}
                      placeholder="Enter state"
                    />
                    {errors.state && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.state}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.pincode 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                      }`}
                      placeholder="Enter pincode"
                    />
                    {errors.pincode && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Selection */}
            <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Course Selection</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Course *
                  </label>
                  <select
                    name="selectedCourse"
                    value={formData.selectedCourse}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.selectedCourse 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Select Course</option>
                    <option value="class-9">Class 9 CBSE</option>
                    <option value="class-10">Class 10 CBSE</option>
                    <option value="class-11">Class 11 CBSE</option>
                    <option value="class-12">Class 12 CBSE</option>
                    <option value="jee-mains">JEE Mains</option>
                    <option value="jee-advanced">JEE Advanced</option>
                    <option value="neet">NEET</option>
                  </select>
                  {errors.selectedCourse && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.selectedCourse}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Batch
                  </label>
                  <select
                    name="preferredBatch"
                    value={formData.preferredBatch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                  >
                    <option value="">Select Batch</option>
                    <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
                    <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                    <option value="weekend">Weekend Only</option>
                  </select>
                </div>
              </div>
            </div>


            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Admission;

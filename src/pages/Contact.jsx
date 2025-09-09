import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Send,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
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
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.message) {
      newErrors.message = 'Message is required';
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      console.log('Inquiry submitted:', formData);
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
                Inquiry Sent!
              </h2>
              
              <p className="text-gray-300 mb-6">
                Thank you for your inquiry. We will contact you soon with more information.
              </p>
              
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', message: '' });
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Send Another Inquiry
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

      {/* Main Content */}
      <section className="relative py-8 sm:py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Inquiry Form */}
            <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Send Inquiry</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
                
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
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
                    }`}
                    placeholder="Tell us about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">info@vedasinstitute.com</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  {/* WhatsApp */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">WhatsApp</p>
                      <p className="text-white font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  {/* Twitter */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Twitter</p>
                      <p className="text-white font-medium">@vedasinstitute</p>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Address</p>
                      <p className="text-white font-medium">123 Education Street,<br />Learning City, LC 123456</p>
                    </div>
                  </div>
                  
                  {/* Hours */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Office Hours</p>
                      <p className="text-white font-medium">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

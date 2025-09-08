import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Phone, User, AlertCircle, ArrowLeft, Lock, Eye, EyeOff, CheckCircle, Star, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import vedasLogo from '@/assets/vedas-logo.jpg';

const VedasLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 flex items-center justify-center">
      <img src={vedasLogo} alt="The Vedas Institute Logo" className="w-full h-full object-contain rounded-lg" />
    </div>
    <div className="flex flex-col">
      <span className="text-white text-lg font-bold">The Vedas Institute</span>
      <span className="text-gray-400 text-xs">Academic Excellence</span>
    </div>
  </div>
);

const Signup = () => {
  const [authMethod, setAuthMethod] = useState('phone');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (!agreedToTerms) {
      return setError('Please agree to the terms and conditions');
    }

    try {
      setError('');
      setLoading(true);
      
      if (authMethod === 'email') {
        await signup(formData.email, formData.password);
      } else {
        setError('Phone signup requires OTP verification. Please implement OTP flow.');
        setLoading(false);
        return;
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password (at least 6 characters).');
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('Email/password sign up is not enabled. Please contact support.');
      } else {
        setError(`Account creation failed: ${error.message}`);
      }
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to sign up with Google. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Revolutionary Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Matrix Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>

      {/* Premium Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        <Button asChild variant="ghost" className="text-white hover:bg-gray-800/50 backdrop-blur-sm rounded-xl transition-all duration-300 group">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <span className="font-medium text-sm sm:text-base">Back to Home</span>
          </Link>
        </Button>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            <img src={vedasLogo} alt="The Vedas Institute Logo" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm sm:text-lg font-bold">The Vedas Institute</span>
            <span className="text-gray-400 text-xs">Academic Excellence</span>
          </div>
        </div>
        </nav>

      {/* Main Content */}
      <main className="relative z-20 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 py-4">
        <div className="w-full max-w-sm sm:max-w-lg">
          {/* Revolutionary Card Design */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <Card className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50 p-4 sm:p-5 rounded-3xl">
              {/* Header with Animated Badge */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-2 sm:px-3 py-1 backdrop-blur-sm mb-3 animate-pulse">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping"></div>
                  <span className="text-xs font-medium text-gray-300">Join the Elite</span>
          </div>

                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Create Account
                  </span>
                </h1>
                <p className="text-gray-300 text-xs sm:text-sm">Begin your journey to academic excellence</p>
              </div>

              {/* Auth Method Toggle - Revolutionary Design */}
              <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-1 mb-4 border border-gray-600/30">
                <div className="flex relative">
            <button
              onClick={() => setAuthMethod('phone')}
                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 relative z-10 ${
                authMethod === 'phone'
                        ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Phone</span>
                    </div>
            </button>
            <button
              onClick={() => setAuthMethod('email')}
                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 relative z-10 ${
                authMethod === 'email'
                        ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Email</span>
                    </div>
            </button>
                  
                  {/* Animated Slider */}
                  <div 
                    className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl transition-all duration-300 ${
                      authMethod === 'email' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
          </div>

              {/* Error Display */}
          {error && (
                <div className="p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl flex items-center gap-3 mb-6 backdrop-blur-sm">
                  <AlertCircle className="h-5 w-5 text-red-400 animate-pulse" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

              {/* Revolutionary Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Full Name */}
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="fullName" className="text-gray-200 font-semibold text-xs sm:text-sm">
                Full Name *
              </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                        className="pl-10 sm:pl-12 h-12 sm:h-14 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500/20 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                  required
                />
                    </div>
              </div>
            </div>

            {/* Phone/Email Input */}
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="input" className="text-gray-200 font-semibold text-xs sm:text-sm">
                {authMethod === 'phone' ? 'Mobile Number *' : 'Email Address *'}
              </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                {authMethod === 'phone' ? (
                        <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                ) : (
                        <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                )}
                <Input
                  id="input"
                  name={authMethod === 'phone' ? 'phoneNumber' : 'email'}
                  type={authMethod === 'phone' ? 'tel' : 'email'}
                  placeholder={authMethod === 'phone' ? 'Enter Your Mobile Number' : 'Enter your email address'}
                  value={authMethod === 'phone' ? formData.phoneNumber : formData.email}
                  onChange={handleChange}
                        className="pl-10 sm:pl-12 h-12 sm:h-14 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-2xl focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                  required
                />
                    </div>
              </div>
            </div>

                {/* Password Fields */}
            {authMethod === 'email' && (
              <>
                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-gray-200 font-semibold text-sm">
                    Password *
                  </Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                  <Input
                    id="password"
                    name="password"
                            type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                            className="pl-12 pr-12 h-14 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-2xl focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300"
                    required
                  />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                </div>

                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword" className="text-gray-200 font-semibold text-sm">
                    Confirm Password *
                  </Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors duration-300" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                            className="pl-12 pr-12 h-14 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-2xl focus:border-green-500 focus:ring-green-500/20 backdrop-blur-sm transition-all duration-300"
                    required
                  />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                </div>
              </>
            )}

                {/* Terms with Revolutionary Design */}
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-2xl backdrop-blur-sm border border-gray-600/30">
                  <div className="relative">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500 mt-1 bg-gray-800/50 checked:bg-gradient-to-r checked:from-indigo-500 checked:to-purple-500"
                    />
                    {agreedToTerms && (
                      <CheckCircle className="absolute -top-1 -right-1 h-6 w-6 text-green-400 animate-pulse" />
                    )}
                  </div>
                  <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                I agree to the{" "}
                    <Link to="/terms" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Terms & Conditions</Link>{" "}
                and{" "}
                    <Link to="/privacy" className="text-purple-400 hover:text-purple-300 underline font-medium">Privacy Policy</Link>
              </Label>
            </div>

                {/* Revolutionary Submit Button */}
            <Button 
              type="submit" 
                  className="w-full h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-indigo-500/30 group relative overflow-hidden"
              disabled={loading}
            >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <Star className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Create Account</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </form>

              {/* Revolutionary Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/90 text-gray-400 backdrop-blur-sm rounded-full">Or continue with</span>
            </div>
          </div>

              {/* Revolutionary Google Button */}
          <Button
            variant="outline"
            onClick={handleGoogleSignUp}
            disabled={loading}
                className="w-full h-10 border-gray-600/50 text-white hover:bg-gray-800/50 rounded-2xl mb-3 backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] group"
          >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
                  <span className="font-medium text-sm">Continue with Google</span>
                </div>
          </Button>

              {/* Sign In Link */}
          <div className="text-center">
            <span className="text-gray-400 text-sm">Already have an account? </span>
                <Button variant="ghost" asChild className="text-indigo-400 hover:text-indigo-300 p-0 h-auto text-sm font-semibold group">
                  <Link to="/login" className="flex items-center justify-center space-x-1">
                    <span>Sign in</span>
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;

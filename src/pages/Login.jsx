import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Phone, AlertCircle, UserPlus, ArrowLeft, Lock, Eye, EyeOff, Zap, Shield, Key } from 'lucide-react';
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

const Login = () => {
  const [authMethod, setAuthMethod] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      if (authMethod === 'email') {
        await login(formData.email, formData.password);
      } else {
        setError('Phone login requires OTP verification. Please implement OTP flow.');
        setLoading(false);
        return;
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(`Login failed: ${error.message}`);
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Revolutionary Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
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
      <div className="absolute top-20 left-1/4 w-36 h-36 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 w-44 h-44 bg-gradient-to-r from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Matrix Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:35px_35px] animate-pulse"></div>

      {/* Premium Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        <Button asChild variant="ghost" className="text-white hover:bg-gray-800/50 backdrop-blur-sm rounded-xl transition-all duration-300 group">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <Card className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50 p-4 sm:p-5 rounded-3xl">
              {/* Header with Animated Badge */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-2 sm:px-3 py-1 backdrop-blur-sm mb-3 animate-pulse">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
                  <span className="text-xs font-medium text-gray-300">Welcome Back</span>
                </div>
                
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    Sign In
                  </span>
                </h1>
                <p className="text-gray-300 text-xs sm:text-sm">Continue your journey to excellence</p>
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
                    className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl transition-all duration-300 ${
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
                {/* Email Input */}
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="email" className="text-gray-200 font-semibold text-xs sm:text-sm">
                    Email Address *
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 sm:pl-12 h-12 sm:h-14 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-2xl focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="password" className="text-gray-200 font-semibold text-xs sm:text-sm">
                    Password *
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-12 sm:h-14 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 rounded-2xl focus:border-pink-500 focus:ring-pink-500/20 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Button variant="ghost" asChild className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xs sm:text-sm font-medium">
                    <Link to="/forgot-password">Forgot your password?</Link>
                  </Button>
                </div>

                {/* Revolutionary Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 sm:h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-purple-500/30 group relative overflow-hidden"
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm sm:text-base">Signing in...</span>
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-sm sm:text-base">Sign In</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </form>

              {/* Revolutionary Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-gray-900/90 text-gray-400 backdrop-blur-sm rounded-full">Or continue with</span>
                </div>
              </div>

              {/* Revolutionary Google Button */}
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-10 border-gray-600/50 text-white hover:bg-gray-800/50 rounded-2xl mb-3 backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-xs sm:text-sm">Continue with Google</span>
                </div>
              </Button>

              {/* Create Account Button */}
              <Button
                variant="outline"
                asChild
                className="w-full h-10 border-gray-600/50 text-white hover:bg-gray-800/50 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <Link to="/signup" className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-xs sm:text-sm">Create a New Account</span>
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

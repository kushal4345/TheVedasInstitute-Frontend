import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { 
  BookOpen, Users, Award, Play, ArrowRight, Star, CheckCircle,
  Globe, Code, Zap, Video, MessageCircle, FileText, BarChart3,
  MapPin, Phone, Mail, Clock
} from 'lucide-react';
import vedasLogo from '@/assets/vedas-logo.jpg';
import { useState, useEffect } from 'react';

const VedasLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 flex items-center justify-center">
      <img src={vedasLogo} alt="The Vedas Institute Logo" className="w-full h-full object-contain rounded-lg" />
    </div>
    <div className="flex flex-col">
      <span className="text-white text-xl font-bold">The Vedas Institute</span>
      <span className="text-gray-400 text-xs">Academic Excellence</span>
    </div>
  </div>
);

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return count;
};

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm animate-pulse">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-300">Leading CBSE Coaching Institute</span>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Transform Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Academic Journey
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
                  Experience excellence in CBSE education with our comprehensive coaching programs designed for students from foundation to 12th grade.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/30 border-0">
                  <Link to="/signup">
                    <span className="relative z-10">Start Your Journey</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="group relative overflow-hidden border-2 border-gray-600 text-white hover:border-transparent px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl bg-transparent">
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Success Stories</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse delay-300"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse delay-600"></div>
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm font-mono">learning.js</span>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-purple-400 text-xs sm:text-sm font-mono">const</span>
                      <span className="text-blue-400 text-xs sm:text-sm font-mono">student</span>
                      <span className="text-gray-400 text-xs sm:text-sm font-mono">=</span>
                      <span className="text-green-400 text-xs sm:text-sm font-mono">new</span>
                      <span className="text-yellow-400 text-xs sm:text-sm font-mono">Student</span>
                      <span className="text-gray-400 text-xs sm:text-sm font-mono">();</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-purple-400 text-xs sm:text-sm font-mono">student</span>
                      <span className="text-gray-400 text-xs sm:text-sm font-mono">.</span>
                      <span className="text-blue-400 text-xs sm:text-sm font-mono">enroll</span>
                      <span className="text-gray-400 text-xs sm:text-sm font-mono">(</span>
                      <span className="text-green-400 text-xs sm:text-sm font-mono">'CBSE'</span>
                      <span className="text-gray-400 text-xs sm:text-sm font-mono">);</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progress</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 sm:h-2 rounded-full animate-pulse" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Excellence in</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                CBSE Education
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover what makes us the leading choice for CBSE students from foundation to 12th grade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-6 sm:p-8 hover:border-indigo-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-indigo-500/20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Comprehensive Curriculum</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  From foundation to 12th grade, our CBSE programs cover all subjects with detailed study materials.
                </p>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-6 sm:p-8 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse delay-300">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Expert Teachers</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Learn from experienced CBSE educators with years of teaching experience.
                </p>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse delay-600">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Proven Results</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Our students consistently achieve excellent results in CBSE board exams.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section id="stats-section" className="relative py-16 sm:py-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
            <div className="group text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/30 group-hover:border-indigo-500/50 transition-all duration-500">
                  <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-500">
                    <AnimatedCounter end={1000} />+
                  </div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Active Students</div>
                </div>
              </div>
            </div>

            <div className="group text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 group-hover:border-purple-500/50 transition-all duration-500">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                    <AnimatedCounter end={50} />+
                  </div>
                  <div className="text-gray-300 font-medium">Courses Available</div>
                </div>
              </div>
            </div>

            <div className="group text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 group-hover:border-blue-500/50 transition-all duration-500">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                    <AnimatedCounter end={95} />%
                  </div>
                  <div className="text-gray-300 font-medium">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="group text-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 group-hover:border-pink-500/50 transition-all duration-500">
                  <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                    24/7
                  </div>
                  <div className="text-gray-300 font-medium">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="relative py-32 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15)_0%,transparent_50%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            {/* Professional Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8 animate-pulse">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping"></div>
              <span className="text-sm font-medium text-gray-300">Exclusive Learning Experience</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Advanced Learning</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Technologies
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Elevate your academic journey with our state-of-the-art digital learning platform, featuring real-time collaboration, personalized analytics, and immersive study experiences that transform traditional coaching into a cutting-edge educational revolution.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-8 hover:border-indigo-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-indigo-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Live Interactive Classes</h3>
                <p className="text-gray-300 leading-relaxed">
                  Experience real-time virtual classrooms with HD video streaming, interactive whiteboards, and instant messaging. Collaborate with peers, ask questions live, and receive immediate feedback from expert educators.
                </p>
                <div className="mt-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping"></div>
                  <span className="text-sm text-gray-400">HD Quality • Real-time Chat • Screen Sharing</span>
                </div>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-8 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse delay-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Smart Analytics Dashboard</h3>
                <p className="text-gray-300 leading-relaxed">
                  Track your progress with AI-powered analytics that identify learning gaps, predict exam performance, and provide personalized study recommendations. Visualize your growth with detailed performance reports.
                </p>
                <div className="mt-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping delay-300"></div>
                  <span className="text-sm text-gray-400">AI Analytics • Performance Tracking • Smart Insights</span>
                </div>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-8 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse delay-600">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Expert-Led Masterclasses</h3>
                <p className="text-gray-300 leading-relaxed">
                  Learn from CBSE board examiners, subject matter experts, and top-performing educators. Access exclusive masterclasses, doubt-solving sessions, and exam strategy workshops designed for academic excellence.
                </p>
                <div className="mt-6 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping delay-600"></div>
                  <span className="text-sm text-gray-400">Board Examiners • Expert Faculty • Strategy Sessions</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.1)_0%,transparent_50%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-1/3 w-56 h-56 bg-gradient-to-r from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            {/* Professional Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8 animate-pulse">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping"></div>
              <span className="text-sm font-medium text-gray-300">Strategic Locations</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">World-Class</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Learning Centers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover our strategically located, state-of-the-art coaching centers featuring modern classrooms, advanced technology infrastructure, dedicated study zones, and a conducive learning environment designed to maximize your academic potential.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-8 hover:border-indigo-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-indigo-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Flagship Learning Center</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Our premier coaching facility featuring smart classrooms with interactive whiteboards, dedicated computer labs, library with extensive study materials, and comfortable student lounges. Experience learning redefined with cutting-edge technology and expert faculty.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Smart Classrooms with Interactive Whiteboards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Advanced Computer Labs & Library</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Comfortable Study Zones & Student Lounges</span>
                  </div>
                </div>
                <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30 border-0">
                  <a href="https://maps.app.goo.gl/3pqEvpVGgrNvNRNN7" target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-5 w-5" />
                    Visit Center
                  </a>
                </Button>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-8 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse delay-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Premium Study Hub</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Conveniently located branch center offering the same high-quality education standards with modern facilities, experienced faculty, and personalized attention. Perfect for students seeking excellence in a more accessible location.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Modern Classrooms & Digital Learning Tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Experienced Faculty & Personalized Guidance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Convenient Location & Flexible Timings</span>
                  </div>
                </div>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 border-0">
                  <a href="https://maps.app.goo.gl/cQEALRvpyD2dNhK4A" target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-5 w-5" />
                    Visit Center
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <VedasLogo />
              <p className="text-gray-400 leading-relaxed">
                Leading CBSE coaching institute providing comprehensive education from foundation to 12th grade with proven results and expert guidance.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Globe className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['Home', 'About', 'Courses', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                          className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Courses</h3>
              <ul className="space-y-4">
                {['Foundation', 'Class 6-8', 'Class 9-10', 'Class 11-12'].map((item) => (
                  <li key={item}>
                    <Link to="/courses" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-indigo-400" />
                  <span className="text-gray-400">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-400">info@vedasinstitute.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">Mon-Sat: 8AM-8PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 The Vedas Institute. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

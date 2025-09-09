import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Award, Users, BookOpen, Star, Quote, 
  GraduationCap, Target, Heart, Sparkles,
  ArrowRight, CheckCircle, Globe, Zap, Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import teacher images
import ansImage from '@/assets/ans.png';
import sirImage from '@/assets/sir.png';
import sir2Image from '@/assets/sir2.png';
import vipinSirImage from '@/assets/VIPIN SIR (1).png';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const teamMembers = [
    {
      name: "Anshika Sharma",
      image: ansImage,
      role: "Senior Mathematics Teacher",
      experience: "8+ Years",
      specialty: "Algebra & Calculus Expert"
    },
    {
      name: "Amit Bisnoi", 
      image: sirImage,
      role: "Physics Professor",
      experience: "12+ Years",
      specialty: "Quantum Physics Specialist"
    },
    {
      name: "Vipin Tyagi",
      image: vipinSirImage,
      role: "Chemistry Expert",
      experience: "10+ Years", 
      specialty: "Organic Chemistry Master"
    },
    {
      name: "Aman Verma",
      image: sir2Image,
      role: "Biology Teacher",
      experience: "6+ Years",
      specialty: "Molecular Biology Expert"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <Navigation />


      {/* CEO Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            
            {/* CEO Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Crown className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">Founder & CEO</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Meet <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Jay Sharma</span>
                </h2>
                
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                  Visionary leader with 15+ years of experience in transforming education. Jay Sharma founded The Vedas Institute with a mission to make quality CBSE education accessible to every student across India.
                </p>
              </div>

              {/* CEO Achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">15+ Years</p>
                    <p className="text-gray-400 text-sm">Education Experience</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">50,000+</p>
                    <p className="text-gray-400 text-sm">Students Mentored</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">95%</p>
                    <p className="text-gray-400 text-sm">Success Rate</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">25+</p>
                    <p className="text-gray-400 text-sm">Cities Served</p>
                  </div>
                </div>
              </div>

              {/* CEO Quote */}
              <div className="relative p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <Quote className="w-8 h-8 text-purple-400 mb-4" />
                <p className="text-lg text-gray-200 italic leading-relaxed">
                  "Education is not just about passing exams; it's about building character, fostering creativity, and preparing students for life's challenges. At The Vedas Institute, we don't just teach subjects – we shape futures."
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div>
                    <p className="text-white font-semibold">Jay Sharma</p>
                    <p className="text-gray-400 text-sm">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CEO Photo */}
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <div className="w-60 h-60 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <div className="w-56 h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                          <div className="text-6xl font-bold text-white">JS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Jay Sharma</h3>
                    <p className="text-purple-400 font-medium">Founder & CEO</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full px-4 py-2 backdrop-blur-sm animate-pulse mb-6">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Our Expert Team</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Meet Our</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
                Expert Educators
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our team of experienced educators brings together decades of teaching excellence and subject expertise to provide the best learning experience for our students.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
                  index === 0 ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-red-600' :
                  index === 1 ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600' :
                  index === 2 ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600' :
                  'bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600'
                }`}></div>
                
                <Card className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-gray-700/50 p-6 hover:border-indigo-500/50 transition-all duration-500 transform hover:scale-105 group-hover:shadow-2xl group-hover:shadow-indigo-500/20">
                  
                  {/* Teacher Photo */}
                  <div className="relative mb-6">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700/50 to-gray-800/50">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 font-medium">
                      {member.role}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <GraduationCap className="w-3 h-3" />
                        <span>{member.experience}</span>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <Zap className="w-3 h-3" />
                        <span>{member.specialty}</span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                      <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-600"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="mt-16 sm:mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <AnimatedCounter end={30} suffix="+" />
                </h3>
                <p className="text-gray-400">Expert Teachers</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </h3>
                <p className="text-gray-400">Years Experience</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <AnimatedCounter end={95} suffix="%" />
                </h3>
                <p className="text-gray-400">Success Rate</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <AnimatedCounter end={50} suffix="K+" />
                </h3>
                <p className="text-gray-400">Happy Students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Start Your
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Academic Journey?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful students who have achieved their dreams with The Vedas Institute.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/30 border-0">
              <Link to="/signup">
                <span className="relative z-10">Join Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="group relative overflow-hidden border-2 border-gray-600 text-white hover:border-transparent px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl bg-transparent">
              <ArrowRight className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

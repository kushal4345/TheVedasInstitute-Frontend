import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import Navigation from '../components/Navigation';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample courses data - you can replace this with actual data from your backend
  const courses = [
    {
      id: 1,
      title: "Vedic Mathematics",
      description: "Learn ancient mathematical techniques from the Vedas for faster calculations",
      category: "mathematics",
      duration: "8 weeks",
      level: "Beginner",
      instructor: "Dr. Rajesh Kumar",
      price: "₹499",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
      rating: 4.8,
      students: 1250
    },
    {
      id: 2,
      title: "Sanskrit Language Fundamentals",
      description: "Master the basics of Sanskrit language and grammar",
      category: "language",
      duration: "12 weeks",
      level: "Beginner",
      instructor: "Prof. Priya Sharma",
      price: "₹999",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop",
      rating: 4.9,
      students: 890
    },
    {
      id: 3,
      title: "Yoga Philosophy & Practice",
      description: "Deep dive into the philosophy and practical aspects of Yoga",
      category: "yoga",
      duration: "10 weeks",
      level: "Intermediate",
      instructor: "Swami Ananda",
      price: "₹799",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
      rating: 4.7,
      students: 2100
    },
    {
      id: 4,
      title: "Ayurveda Basics",
      description: "Introduction to Ayurvedic principles and holistic healing",
      category: "ayurveda",
      duration: "6 weeks",
      level: "Beginner",
      instructor: "Dr. Meera Patel",
      price: "₹499",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      rating: 4.6,
      students: 750
    },
    {
      id: 5,
      title: "Vedic Astrology",
      description: "Learn the ancient science of Jyotish and celestial influences",
      category: "astrology",
      duration: "14 weeks",
      level: "Intermediate",
      instructor: "Acharya Sunil Verma",
      price: "₹999",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=250&fit=crop",
      rating: 4.5,
      students: 650
    },
    {
      id: 6,
      title: "Meditation & Mindfulness",
      description: "Master various meditation techniques for inner peace",
      category: "meditation",
      duration: "8 weeks",
      level: "All Levels",
      instructor: "Guru Deepak",
      price: "₹399",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      rating: 4.9,
      students: 3200
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'language', name: 'Language' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'ayurveda', name: 'Ayurveda' },
    { id: 'astrology', name: 'Astrology' },
    { id: 'meditation', name: 'Meditation' }
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [courses.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      {/* Course Slider Header */}
      <div className="relative bg-gradient-to-r from-gray-900 to-black shadow-2xl overflow-hidden">
        <div className="relative h-96 lg:h-[500px]">
          {/* Slider Container */}
          <div className="relative h-full">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl">
                      {/* Category Badge */}
                      <div className="mb-6">
                        <span className="inline-block text-sm font-bold text-orange-400 uppercase tracking-wider bg-orange-900/30 px-4 py-2 rounded-full border border-orange-800/30">
                          {course.category}
                        </span>
                      </div>

                      {/* Course Title */}
                      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {course.title}
                      </h1>

                      {/* Course Description */}
                      <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed">
                        {course.description}
                      </p>

                      {/* Course Stats */}
                      <div className="flex flex-wrap items-center gap-6 mb-8">
                        <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg shadow-sm border border-gray-700">
                          <span className="text-yellow-400 text-xl">★</span>
                          <span className="font-bold text-lg text-white">{course.rating}</span>
                          <span className="text-gray-400">({course.students} students)</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <span className="text-2xl">⏱️</span>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <span className="text-2xl">📊</span>
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <span className="text-2xl">👨‍🏫</span>
                          <span>{course.instructor}</span>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={`/course/${course.id}`}>
                          <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                            View Course Details
                          </Button>
                        </Link>
                        <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                          Enroll Now - {course.price}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-orange-400 scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
            {currentSlide + 1} / {courses.length}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search Bar */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 mb-8 border border-gray-800">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for courses, topics, or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-700 bg-gray-800 text-white focus:border-orange-500 rounded-lg placeholder-gray-400"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg' 
                      : 'border-2 border-gray-700 bg-gray-800 text-gray-300 hover:border-orange-500 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count with Enhanced Styling */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">
                {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Available
              </h2>
              <div className="px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full text-sm font-medium">
                {courses.length} Total
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-bold text-orange-400 shadow-lg">
                  {course.price}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm font-semibold text-white">{course.rating}</span>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-4 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider bg-orange-900/30 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>👥 {course.students}</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-orange-400 transition-colors duration-300 leading-tight text-white">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Duration</div>
                    <div className="font-semibold text-white">{course.duration}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Level</div>
                    <div className="font-semibold text-white">{course.level}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6 p-3 bg-orange-900/20 rounded-lg border border-orange-800/30">
                  <div className="w-10 h-10 bg-orange-900/30 rounded-full flex items-center justify-center">
                    <span className="text-orange-400 text-lg">👨‍🏫</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Instructor</div>
                    <div className="font-semibold text-white">{course.instructor}</div>
                  </div>
                </div>
                <Separator className="mb-6 bg-gray-700" />
                <Link to={`/course/${course.id}`}>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    View Course Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 text-8xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No courses found
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => setSearchTerm('')} 
                  variant="outline"
                  className="px-6 py-3 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Clear Search
                </Button>
                <Button 
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                >
                  View All Courses
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

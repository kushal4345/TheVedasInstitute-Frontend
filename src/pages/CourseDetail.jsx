import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import Navigation from '../components/Navigation';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Complete course data for all 6 courses
  const courseData = {
    1: {
      id: 1,
      title: "Vedic Mathematics",
      description: "Learn ancient mathematical techniques from the Vedas for faster calculations",
      longDescription: "Vedic Mathematics is a system of mathematics that was rediscovered from ancient Indian texts called the Vedas. This course will teach you 16 sutras (formulas) and 13 sub-sutras that can be used to solve mathematical problems quickly and efficiently. You'll learn techniques for multiplication, division, square roots, cube roots, and more.",
      category: "mathematics",
      duration: "8 weeks",
      level: "Beginner",
      instructor: "Dr. Rajesh Kumar",
      instructorBio: "Dr. Rajesh Kumar is a renowned mathematician with over 20 years of experience in Vedic Mathematics. He has published numerous papers and books on the subject and has taught thousands of students worldwide.",
      price: "₹499",
      originalPrice: "₹999",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      rating: 4.8,
      students: 1250,
      lessons: 32,
      certificate: true,
      language: "English",
      subtitles: ["English", "Hindi"],
      lastUpdated: "December 2024",
      requirements: [
        "Basic understanding of arithmetic operations",
        "No prior knowledge of Vedic Mathematics required",
        "A calculator (optional)",
        "Dedication to practice regularly"
      ],
      whatYouWillLearn: [
        "16 Vedic Mathematics sutras and their applications",
        "Quick multiplication and division techniques",
        "Mental calculation methods",
        "Square and cube root calculations",
        "Algebraic problem solving",
        "Geometric applications",
        "Real-world problem solving"
      ],
      curriculum: [
        {
          week: 1,
          title: "Introduction to Vedic Mathematics",
          lessons: [
            "History and origin of Vedic Mathematics",
            "Understanding the 16 sutras",
            "Basic principles and methodology"
          ]
        },
        {
          week: 2,
          title: "Basic Operations",
          lessons: [
            "Addition and subtraction techniques",
            "Multiplication using Nikhilam sutra",
            "Division methods"
          ]
        },
        {
          week: 3,
          title: "Advanced Multiplication",
          lessons: [
            "Urdhva Tiryagbhyam method",
            "Vertically and crosswise multiplication",
            "Special cases and shortcuts"
          ]
        },
        {
          week: 4,
          title: "Squares and Square Roots",
          lessons: [
            "Yavadunam sutra for squares",
            "Square root calculations",
            "Perfect square identification"
          ]
        },
        {
          week: 5,
          title: "Cubes and Cube Roots",
          lessons: [
            "Cube calculations using sutras",
            "Cube root methods",
            "Applications in algebra"
          ]
        },
        {
          week: 6,
          title: "Algebraic Applications",
          lessons: [
            "Factorization techniques",
            "Quadratic equations",
            "Polynomial operations"
          ]
        },
        {
          week: 7,
          title: "Geometric Applications",
          lessons: [
            "Area calculations",
            "Perimeter and volume",
            "Geometric proofs"
          ]
        },
        {
          week: 8,
          title: "Advanced Topics & Practice",
          lessons: [
            "Complex problem solving",
            "Speed mathematics",
            "Final project and assessment"
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: "Priya Sharma",
          rating: 5,
          date: "2 weeks ago",
          comment: "Excellent course! The techniques are incredibly useful and the instructor explains everything clearly."
        },
        {
          id: 2,
          name: "Amit Patel",
          rating: 4,
          date: "1 month ago",
          comment: "Great content and practical examples. Highly recommended for anyone interested in mathematics."
        },
        {
          id: 3,
          name: "Sarah Johnson",
          rating: 5,
          date: "3 weeks ago",
          comment: "Amazing how these ancient techniques can make math so much easier. Worth every penny!"
        }
      ]
    },
    2: {
      id: 2,
      title: "Sanskrit Language Fundamentals",
      description: "Master the basics of Sanskrit language and grammar",
      longDescription: "Sanskrit is one of the oldest languages in the world and is considered the mother of many modern Indian languages. This comprehensive course will take you from complete beginner to intermediate level in Sanskrit. You'll learn the Devanagari script, grammar rules, vocabulary, and classical texts.",
      category: "language",
      duration: "12 weeks",
      level: "Beginner",
      instructor: "Prof. Priya Sharma",
      instructorBio: "Prof. Priya Sharma is a Sanskrit scholar with a PhD from Banaras Hindu University. She has been teaching Sanskrit for over 15 years and has authored several textbooks on Sanskrit grammar and literature.",
      price: "₹999",
      originalPrice: "₹1499",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop",
      rating: 4.9,
      students: 890,
      lessons: 48,
      certificate: true,
      language: "English",
      subtitles: ["English", "Hindi", "Sanskrit"],
      lastUpdated: "November 2024",
      requirements: [
        "No prior knowledge of Sanskrit required",
        "Basic English proficiency",
        "Dedication to daily practice",
        "Interest in ancient languages and culture"
      ],
      whatYouWillLearn: [
        "Devanagari script and pronunciation",
        "Basic Sanskrit grammar and sentence structure",
        "Essential vocabulary and common phrases",
        "Reading and writing simple texts",
        "Understanding classical Sanskrit literature",
        "Cultural context and historical significance",
        "Advanced grammar concepts"
      ],
      curriculum: [
        {
          week: 1,
          title: "Introduction to Sanskrit",
          lessons: [
            "History and importance of Sanskrit",
            "Devanagari alphabet",
            "Basic pronunciation rules"
          ]
        },
        {
          week: 2,
          title: "Basic Grammar",
          lessons: [
            "Nouns and their declensions",
            "Verbs and conjugations",
            "Simple sentence structure"
          ]
        },
        {
          week: 3,
          title: "Vocabulary Building",
          lessons: [
            "Common words and phrases",
            "Numbers and counting",
            "Colors and descriptions"
          ]
        },
        {
          week: 4,
          title: "Intermediate Grammar",
          lessons: [
            "Complex sentence structures",
            "Tenses and moods",
            "Compound words"
          ]
        },
        {
          week: 5,
          title: "Reading Practice",
          lessons: [
            "Simple texts and stories",
            "Poetry and verses",
            "Religious texts"
          ]
        },
        {
          week: 6,
          title: "Writing Skills",
          lessons: [
            "Composition techniques",
            "Essay writing",
            "Letter writing"
          ]
        },
        {
          week: 7,
          title: "Advanced Topics",
          lessons: [
            "Classical literature",
            "Philosophical texts",
            "Scientific terminology"
          ]
        },
        {
          week: 8,
          title: "Cultural Context",
          lessons: [
            "Historical significance",
            "Cultural practices",
            "Modern applications"
          ]
        },
        {
          week: 9,
          title: "Advanced Grammar",
          lessons: [
            "Complex grammatical structures",
            "Sanskrit linguistics",
            "Comparative studies"
          ]
        },
        {
          week: 10,
          title: "Literature Analysis",
          lessons: [
            "Epic literature",
            "Drama and poetry",
            "Critical analysis"
          ]
        },
        {
          week: 11,
          title: "Practical Applications",
          lessons: [
            "Modern Sanskrit usage",
            "Academic writing",
            "Research methods"
          ]
        },
        {
          week: 12,
          title: "Final Project",
          lessons: [
            "Independent study",
            "Project presentation",
            "Assessment and feedback"
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: "Rahul Verma",
          rating: 5,
          date: "1 week ago",
          comment: "Outstanding course! Prof. Sharma makes Sanskrit accessible and enjoyable."
        },
        {
          id: 2,
          name: "Meera Singh",
          rating: 5,
          date: "2 weeks ago",
          comment: "Perfect for beginners. The step-by-step approach is excellent."
        },
        {
          id: 3,
          name: "Arjun Kumar",
          rating: 4,
          date: "1 month ago",
          comment: "Great content and excellent teaching methodology."
        }
      ]
    },
    3: {
      id: 3,
      title: "Yoga Philosophy & Practice",
      description: "Deep dive into the philosophy and practical aspects of Yoga",
      longDescription: "This comprehensive course explores both the philosophical foundations and practical applications of Yoga. You'll learn about the ancient texts, different yoga styles, meditation techniques, and how to integrate yoga into your daily life for physical, mental, and spiritual well-being.",
      category: "yoga",
      duration: "10 weeks",
      level: "Intermediate",
      instructor: "Swami Ananda",
      instructorBio: "Swami Ananda is a certified yoga teacher with over 25 years of experience. He has studied under various masters in India and has taught yoga to thousands of students worldwide.",
      price: "₹799",
      originalPrice: "₹1199",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
      rating: 4.7,
      students: 2100,
      lessons: 40,
      certificate: true,
      language: "English",
      subtitles: ["English", "Hindi"],
      lastUpdated: "January 2025",
      requirements: [
        "Basic fitness level",
        "Yoga mat and comfortable space",
        "Open mind and willingness to learn",
        "No prior yoga experience required"
      ],
      whatYouWillLearn: [
        "Yoga philosophy and ancient texts",
        "Asana practice and alignment",
        "Pranayama breathing techniques",
        "Meditation and mindfulness",
        "Yoga lifestyle and ethics",
        "Anatomy and physiology",
        "Teaching methodology"
      ],
      curriculum: [
        {
          week: 1,
          title: "Introduction to Yoga Philosophy",
          lessons: [
            "History and origins of yoga",
            "Yoga Sutras of Patanjali",
            "Eight limbs of yoga"
          ]
        },
        {
          week: 2,
          title: "Basic Asanas",
          lessons: [
            "Standing poses",
            "Seated poses",
            "Basic alignment principles"
          ]
        },
        {
          week: 3,
          title: "Pranayama",
          lessons: [
            "Breathing techniques",
            "Energy flow",
            "Stress management"
          ]
        },
        {
          week: 4,
          title: "Meditation",
          lessons: [
            "Mindfulness practices",
            "Concentration techniques",
            "Inner peace cultivation"
          ]
        },
        {
          week: 5,
          title: "Intermediate Asanas",
          lessons: [
            "Balancing poses",
            "Twisting poses",
            "Backbends"
          ]
        },
        {
          week: 6,
          title: "Yoga Lifestyle",
          lessons: [
            "Diet and nutrition",
            "Daily routines",
            "Ethical living"
          ]
        },
        {
          week: 7,
          title: "Advanced Practices",
          lessons: [
            "Advanced asanas",
            "Kundalini awakening",
            "Chakra balancing"
          ]
        },
        {
          week: 8,
          title: "Anatomy and Physiology",
          lessons: [
            "Body mechanics",
            "Injury prevention",
            "Therapeutic applications"
          ]
        },
        {
          week: 9,
          title: "Teaching Skills",
          lessons: [
            "Class sequencing",
            "Student guidance",
            "Safety considerations"
          ]
        },
        {
          week: 10,
          title: "Integration and Practice",
          lessons: [
            "Personal practice development",
            "Lifestyle integration",
            "Final assessment"
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: "Lisa Chen",
          rating: 5,
          date: "3 days ago",
          comment: "Life-changing course! Swami Ananda is an incredible teacher."
        },
        {
          id: 2,
          name: "David Wilson",
          rating: 4,
          date: "1 week ago",
          comment: "Excellent balance of theory and practice. Highly recommended!"
        },
        {
          id: 3,
          name: "Anita Desai",
          rating: 5,
          date: "2 weeks ago",
          comment: "Perfect for deepening my yoga practice. Thank you!"
        }
      ]
    },
    4: {
      id: 4,
      title: "Ayurveda Basics",
      description: "Introduction to Ayurvedic principles and holistic healing",
      longDescription: "Ayurveda is the ancient Indian system of medicine that focuses on holistic health and wellness. This course will teach you the fundamental principles of Ayurveda, including the three doshas, diet, lifestyle, and natural healing methods for maintaining balance and preventing disease.",
      category: "ayurveda",
      duration: "6 weeks",
      level: "Beginner",
      instructor: "Dr. Meera Patel",
      instructorBio: "Dr. Meera Patel is a licensed Ayurvedic practitioner with over 15 years of clinical experience. She holds a degree in Ayurvedic Medicine and has helped thousands of patients achieve optimal health.",
      price: "₹499",
      originalPrice: "₹799",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      rating: 4.6,
      students: 750,
      lessons: 24,
      certificate: true,
      language: "English",
      subtitles: ["English", "Hindi"],
      lastUpdated: "December 2024",
      requirements: [
        "Interest in natural healing",
        "No prior medical knowledge required",
        "Openness to holistic approaches",
        "Basic understanding of health concepts"
      ],
      whatYouWillLearn: [
        "Fundamental principles of Ayurveda",
        "Understanding the three doshas",
        "Diet and nutrition guidelines",
        "Lifestyle recommendations",
        "Natural healing methods",
        "Seasonal health practices",
        "Preventive healthcare"
      ],
      curriculum: [
        {
          week: 1,
          title: "Introduction to Ayurveda",
          lessons: [
            "History and philosophy",
            "Five elements theory",
            "Three doshas overview"
          ]
        },
        {
          week: 2,
          title: "Understanding Doshas",
          lessons: [
            "Vata dosha characteristics",
            "Pitta dosha characteristics",
            "Kapha dosha characteristics"
          ]
        },
        {
          week: 3,
          title: "Diet and Nutrition",
          lessons: [
            "Six tastes in Ayurveda",
            "Food combinations",
            "Seasonal eating"
          ]
        },
        {
          week: 4,
          title: "Lifestyle Practices",
          lessons: [
            "Daily routines (Dinacharya)",
            "Seasonal routines (Ritucharya)",
            "Sleep and rest"
          ]
        },
        {
          week: 5,
          title: "Natural Healing",
          lessons: [
            "Herbal remedies",
            "Massage techniques",
            "Detoxification methods"
          ]
        },
        {
          week: 6,
          title: "Practical Applications",
          lessons: [
            "Personal health assessment",
            "Creating health plans",
            "Preventive measures"
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: "Rajesh Kumar",
          rating: 5,
          date: "1 week ago",
          comment: "Excellent introduction to Ayurveda. Dr. Patel explains complex concepts clearly."
        },
        {
          id: 2,
          name: "Sunita Reddy",
          rating: 4,
          date: "2 weeks ago",
          comment: "Very informative and practical. Great for beginners."
        },
        {
          id: 3,
          name: "Michael Brown",
          rating: 5,
          date: "3 weeks ago",
          comment: "Fascinating course! I've already started implementing the practices."
        }
      ]
    },
    5: {
      id: 5,
      title: "Vedic Astrology",
      description: "Learn the ancient science of Jyotish and celestial influences",
      longDescription: "Vedic Astrology (Jyotish) is an ancient Indian system of astrology that provides insights into life patterns, personality traits, and future possibilities. This course covers the fundamentals of Jyotish, including planetary positions, birth charts, and predictive techniques.",
      category: "astrology",
      duration: "14 weeks",
      level: "Intermediate",
      instructor: "Acharya Sunil Verma",
      instructorBio: "Acharya Sunil Verma is a renowned Vedic astrologer with over 30 years of experience. He has studied under traditional gurus and has provided consultations to thousands of clients worldwide.",
      price: "₹999",
      originalPrice: "₹1499",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=400&fit=crop",
      rating: 4.5,
      students: 650,
      lessons: 56,
      certificate: true,
      language: "English",
      subtitles: ["English", "Hindi", "Sanskrit"],
      lastUpdated: "November 2024",
      requirements: [
        "Basic understanding of astronomy",
        "Interest in metaphysical studies",
        "Mathematical aptitude",
        "Open mind to ancient wisdom"
      ],
      whatYouWillLearn: [
        "Fundamentals of Vedic Astrology",
        "Planetary positions and influences",
        "Birth chart interpretation",
        "Predictive techniques",
        "Remedial measures",
        "Mundane astrology",
        "Advanced chart analysis"
      ],
      curriculum: [
        {
          week: 1,
          title: "Introduction to Jyotish",
          lessons: [
            "History and philosophy",
            "Basic principles",
            "Difference from Western astrology"
          ]
        },
        {
          week: 2,
          title: "Zodiac Signs",
          lessons: [
            "12 zodiac signs",
            "Elemental classifications",
            "Sign characteristics"
          ]
        },
        {
          week: 3,
          title: "Planets",
          lessons: [
            "Nine planets (Navagraha)",
            "Planetary significations",
            "Planetary relationships"
          ]
        },
        {
          week: 4,
          title: "Houses",
          lessons: [
            "12 houses",
            "House significations",
            "House lords"
          ]
        },
        {
          week: 5,
          title: "Birth Chart",
          lessons: [
            "Chart calculation",
            "Planetary positions",
            "House placements"
          ]
        },
        {
          week: 6,
          title: "Aspects",
          lessons: [
            "Planetary aspects",
            "Aspect calculations",
            "Aspect effects"
          ]
        },
        {
          week: 7,
          title: "Dasha Systems",
          lessons: [
            "Vimshottari dasha",
            "Other dasha systems",
            "Dasha interpretation"
          ]
        },
        {
          week: 8,
          title: "Transits",
          lessons: [
            "Planetary transits",
            "Transit effects",
            "Timing predictions"
          ]
        },
        {
          week: 9,
          title: "Predictive Techniques",
          lessons: [
            "Marriage timing",
            "Career predictions",
            "Health analysis"
          ]
        },
        {
          week: 10,
          title: "Remedial Measures",
          lessons: [
            "Gemstone recommendations",
            "Mantras and prayers",
            "Lifestyle changes"
          ]
        },
        {
          week: 11,
          title: "Mundane Astrology",
          lessons: [
            "World events",
            "Political astrology",
            "Economic predictions"
          ]
        },
        {
          week: 12,
          title: "Advanced Topics",
          lessons: [
            "Nakshatra analysis",
            "Special combinations",
            "Advanced techniques"
          ]
        },
        {
          week: 13,
          title: "Practical Applications",
          lessons: [
            "Case studies",
            "Chart analysis practice",
            "Consultation skills"
          ]
        },
        {
          week: 14,
          title: "Final Assessment",
          lessons: [
            "Comprehensive review",
            "Final project",
            "Certification"
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: "Priya Malhotra",
          rating: 5,
          date: "1 week ago",
          comment: "Incredible depth of knowledge! Acharya Verma is a master teacher."
        },
        {
          id: 2,
          name: "Ravi Shankar",
          rating: 4,
          date: "2 weeks ago",
          comment: "Excellent course structure and comprehensive content."
        },
        {
          id: 3,
          name: "Emma Thompson",
          rating: 5,
          date: "1 month ago",
          comment: "Fascinating subject taught with great expertise."
        }
      ]
    },
    6: {
      id: 6,
      title: "Meditation & Mindfulness",
      description: "Master various meditation techniques for inner peace",
      longDescription: "This comprehensive course teaches various meditation techniques from different traditions, helping you develop mindfulness, reduce stress, and achieve inner peace. You'll learn practical techniques that can be integrated into your daily life for lasting benefits.",
      category: "meditation",
      duration: "8 weeks",
      level: "All Levels",
      instructor: "Guru Deepak",
      instructorBio: "Guru Deepak is a meditation master with over 20 years of experience in various meditation traditions. He has guided thousands of students on their spiritual journey and has conducted workshops worldwide.",
      price: "₹399",
      originalPrice: "₹699",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      rating: 4.9,
      students: 3200,
      lessons: 32,
      certificate: true,
      language: "English",
      subtitles: ["English", "Hindi"],
      lastUpdated: "January 2025",
      requirements: [
        "Open mind and willingness to learn",
        "Quiet space for practice",
        "Comfortable cushion or chair",
        "No prior meditation experience needed"
      ],
      whatYouWillLearn: [
        "Various meditation techniques",
        "Mindfulness practices",
        "Stress reduction methods",
        "Breathing exercises",
        "Concentration development",
        "Emotional regulation",
        "Spiritual growth"
      ],
      curriculum: [
        {
          week: 1,
          title: "Introduction to Meditation",
          lessons: [
            "What is meditation",
            "Benefits of meditation",
            "Preparing for practice"
          ]
        },
        {
          week: 2,
          title: "Breathing Techniques",
          lessons: [
            "Pranayama basics",
            "Breath awareness",
            "Breathing for relaxation"
          ]
        },
        {
          week: 3,
          title: "Mindfulness",
          lessons: [
            "Present moment awareness",
            "Body scan meditation",
            "Walking meditation"
          ]
        },
        {
          week: 4,
          title: "Concentration",
          lessons: [
            "Focus techniques",
            "Mantra meditation",
            "Candle gazing"
          ]
        },
        {
          week: 5,
          title: "Loving-Kindness",
          lessons: [
            "Metta meditation",
            "Compassion practice",
            "Forgiveness meditation"
          ]
        },
        {
          week: 6,
          title: "Transcendental",
          lessons: [
            "TM technique",
            "Silent meditation",
            "Deep relaxation"
          ]
        },
        {
          week: 7,
          title: "Advanced Practices",
          lessons: [
            "Vipassana basics",
            "Zen meditation",
            "Advanced techniques"
          ]
        },
        {
          week: 8,
          title: "Integration",
          lessons: [
            "Daily practice routine",
            "Overcoming obstacles",
            "Long-term commitment"
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: "Jennifer Adams",
          rating: 5,
          date: "2 days ago",
          comment: "Life-changing course! I feel so much more peaceful and centered."
        },
        {
          id: 2,
          name: "Carlos Rodriguez",
          rating: 5,
          date: "1 week ago",
          comment: "Excellent teacher and comprehensive content. Highly recommended!"
        },
        {
          id: 3,
          name: "Aisha Khan",
          rating: 5,
          date: "2 weeks ago",
          comment: "Perfect for beginners. Guru Deepak explains everything so clearly."
        }
      ]
    }
  };

  const course = courseData[id];

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-8xl mb-6">📚</div>
          <h1 className="text-3xl font-bold text-white mb-4">Course Not Found</h1>
          <p className="text-gray-400 mb-8 text-lg">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-3 rounded-xl">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Course Image */}
      <div className="relative bg-gradient-to-r from-gray-900 to-black shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link to="/courses" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              <span>←</span>
              <span>Back to Courses</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="inline-block text-sm font-bold text-orange-400 uppercase tracking-wider bg-orange-900/30 px-4 py-2 rounded-full border border-orange-800/30">
                  {course.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">{course.title}</h1>
              <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-4xl">{course.description}</p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-700">
                  <span className="text-yellow-400 text-lg sm:text-xl">★</span>
                  <span className="font-bold text-sm sm:text-lg text-white">{course.rating}</span>
                  <span className="text-gray-400 text-xs sm:text-sm">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-2xl">📚</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-2xl">⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-2xl">📊</span>
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-0 shadow-xl rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-center pb-6">
                  <div className="text-4xl font-bold mb-2">{course.price}</div>
                  {course.originalPrice && (
                    <div className="text-xl text-orange-100 line-through mb-2">{course.originalPrice}</div>
                  )}
                  <div className="text-orange-100 text-sm">One-time payment</div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 font-semibold py-3 rounded-xl">
                    Add to Wishlist
                  </Button>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-900/30 rounded-lg border border-green-800/30">
                      <span className="text-green-400 text-xl">✅</span>
                      <span className="text-sm font-medium text-gray-300">Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-900/30 rounded-lg border border-blue-800/30">
                      <span className="text-blue-400 text-xl">📱</span>
                      <span className="text-sm font-medium text-gray-300">Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-900/30 rounded-lg border border-purple-800/30">
                      <span className="text-purple-400 text-xl">🎓</span>
                      <span className="text-sm font-medium text-gray-300">Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-900/30 rounded-lg border border-orange-800/30">
                      <span className="text-orange-400 text-xl">🔄</span>
                      <span className="text-sm font-medium text-gray-300">30-Day Money-back guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Enhanced Tabs */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-lg mb-8 overflow-hidden border border-gray-800">
              <div className="border-b border-gray-700">
                <nav className="flex">
                  {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-sm font-bold capitalize transition-all duration-300 ${
                        activeTab === tab
                          ? 'border-b-2 border-orange-500 text-orange-400 bg-orange-900/20'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-white">What you'll learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                            <span className="text-green-400 mt-1 text-lg">✓</span>
                            <span className="text-gray-300 text-xs sm:text-sm lg:text-base">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-white">Requirements</h3>
                      <ul className="space-y-3">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300 text-xs sm:text-sm lg:text-base">
                            <span className="text-orange-400 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator className="bg-gray-700" />

                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-white">Description</h3>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">{course.longDescription}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">Course Content</h3>
                    <div className="space-y-4">
                      {course.curriculum.map((week, index) => (
                        <div key={index} className="border border-gray-700 rounded-lg bg-gray-800/30 overflow-hidden">
                          <div className="p-4 bg-gray-800/50 border-b border-gray-700">
                            <h4 className="font-semibold text-white text-lg">Week {week.week}: {week.title}</h4>
                          </div>
                          <div className="p-4">
                            <ul className="space-y-3">
                              {week.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-center gap-3 text-gray-300">
                                  <span className="text-orange-400 text-lg">▶</span>
                                  <span>{lesson}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">Your Instructor</h3>
                    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-start gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                          <span className="text-3xl text-white">👨‍🏫</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-semibold text-white mb-3">{course.instructor}</h4>
                          <p className="text-gray-300 mb-6 text-lg leading-relaxed">{course.instructorBio}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                              <div className="text-2xl text-yellow-400 mb-1">⭐</div>
                              <div className="text-sm text-gray-400">Rating</div>
                              <div className="font-semibold text-white">{course.rating}</div>
                            </div>
                            <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                              <div className="text-2xl text-blue-400 mb-1">👥</div>
                              <div className="text-sm text-gray-400">Students</div>
                              <div className="font-semibold text-white">{course.students}</div>
                            </div>
                            <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                              <div className="text-2xl text-green-400 mb-1">📚</div>
                              <div className="text-sm text-gray-400">Lessons</div>
                              <div className="font-semibold text-white">{course.lessons}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">Student Reviews</h3>
                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <div key={review.id} className="border border-gray-700 rounded-lg p-6 bg-gray-800/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-white text-lg">{review.name}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "text-yellow-400 text-xl" : "text-gray-600 text-xl"}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mb-4">{review.date}</p>
                          <p className="text-gray-300 text-lg leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900">
                <CardTitle className="text-xl font-bold text-white">Course Features</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <span className="text-gray-300 font-medium">Duration</span>
                  <span className="font-bold text-white">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <span className="text-gray-300 font-medium">Level</span>
                  <span className="font-bold text-white">{course.level}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <span className="text-gray-300 font-medium">Language</span>
                  <span className="font-bold text-white">{course.language}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <span className="text-gray-300 font-medium">Subtitles</span>
                  <span className="font-bold text-white">{course.subtitles.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <span className="text-gray-300 font-medium">Last Updated</span>
                  <span className="font-bold text-white">{course.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg border border-green-800/30">
                  <span className="text-gray-300 font-medium">Certificate</span>
                  <span className="font-bold text-green-400">✓ Included</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

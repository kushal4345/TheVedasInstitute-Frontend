import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useState, useRef, useEffect } from 'react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('main');
  const [userPhoto, setUserPhoto] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [typingMessage, setTypingMessage] = useState('');
  const fileInputRef = useRef(null);
  const ragFileInputRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate a unique session ID
  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Simulate typing animation for AI responses
  const simulateTyping = (message, callback) => {
    let index = 0;
    setTypingMessage('');
    
    const typeInterval = setInterval(() => {
      if (index < message.length) {
        setTypingMessage(message.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        callback();
      }
    }, 20); // Adjust speed as needed
  };

  // Copy text to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        // Try proxy first, then fallback to direct URL
        let response;
        try {
          response = await fetch('/vedas-api/upload_pdf/', {
            method: 'POST',
            body: formData,
          });
        } catch (proxyError) {
          console.warn('Proxy failed, trying direct URL:', proxyError);
          response = await fetch('https://vedas-chat-1.onrender.com/upload_pdf/', {
            method: 'POST',
            body: formData,
            mode: 'cors',
          });
        }
        
        if (response.ok) {
          const result = await response.json();
          const newSessionId = generateSessionId();
          setSessionId(newSessionId);
          setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toLocaleString()
          });
          
          // Add welcome message
          setChatMessages([
            {
              id: 1,
              type: 'ai',
              message: `🎉 Welcome! I've successfully uploaded "${file.name}". 

The document has been processed and vectorized, and I'm ready to help you explore its contents. 

Here are some things you can ask me:
• Summarize the main topics
• Explain specific concepts
• Find information about particular subjects
• Answer questions about the content

What would you like to know about this document?`,
              timestamp: new Date().toLocaleString(),
              isTyping: false
            }
          ]);
        } else {
          throw new Error(`Upload failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        if (error.message.includes('CORS') || error.message.includes('blocked')) {
          alert('CORS Error: The backend server needs to allow requests from this domain. Please contact the backend team to configure CORS headers.');
        } else {
          alert('Failed to upload PDF. Please try again.');
        }
      } finally {
        setIsUploading(false);
      }
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim() && uploadedFile && sessionId && !isChatLoading) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        message: currentMessage,  
        timestamp: new Date().toLocaleString()
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      const userMessage = currentMessage;
      setCurrentMessage('');
      setIsChatLoading(true);
      
      try {
        // Try different request formats
        const requestFormats = [
          {
            query: userMessage,
            filename: uploadedFile.name,
            session_id: sessionId,
            chat_history: chatMessages.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.message
            }))
          },
          {
            message: userMessage,
            filename: uploadedFile.name,
            session_id: sessionId
          },
          {
            question: userMessage,
            filename: uploadedFile.name,
            session_id: sessionId
          }
        ];
        
        let response;
        let lastError;
        
        // Try each format until one works
        for (let i = 0; i < requestFormats.length; i++) {
          const requestBody = requestFormats[i];
          console.log(`Trying request format ${i + 1}:`, requestBody);
          
          try {
            response = await fetch('/vedas-api/chat/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });
            
            if (response.ok) {
              console.log(`Format ${i + 1} succeeded!`);
              break;
            } else {
              const errorText = await response.text();
              console.log(`Format ${i + 1} failed with status ${response.status}:`, errorText);
              lastError = new Error(`Status ${response.status}: ${errorText}`);
            }
          } catch (proxyError) {
            console.warn(`Format ${i + 1} proxy failed, trying direct URL:`, proxyError);
            try {
              response = await fetch('https://vedas-chat-1.onrender.com/chat/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                mode: 'cors',
              });
              
              if (response.ok) {
                console.log(`Format ${i + 1} direct URL succeeded!`);
                break;
              } else {
                const errorText = await response.text();
                console.log(`Format ${i + 1} direct URL failed with status ${response.status}:`, errorText);
                lastError = new Error(`Status ${response.status}: ${errorText}`);
              }
            } catch (directError) {
              console.log(`Format ${i + 1} direct URL also failed:`, directError);
              lastError = directError;
            }
          }
        }
        
        if (!response || !response.ok) {
          throw lastError || new Error('All request formats failed');
        }
        
        const result = await response.json();
        console.log('Chat response:', result);
        
        const aiMessage = result.response || result.message || result.answer || 'I received your message but couldn\'t generate a response.';
        
        // Add AI response with typing animation
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          message: aiMessage,
          timestamp: new Date().toLocaleString(),
          isTyping: true
        };
        
        setChatMessages(prev => [...prev, aiResponse]);
        
        // Simulate typing animation
        simulateTyping(aiMessage, () => {
          setChatMessages(prev => 
            prev.map(msg => 
              msg.id === aiResponse.id 
                ? { ...msg, isTyping: false }
                : msg
            )
          );
        });
      } catch (error) {
        console.error('Chat error:', error);
        let errorMessage = 'Sorry, I encountered an error while processing your request. Please try again.';
        
        if (error.message.includes('CORS') || error.message.includes('blocked')) {
          errorMessage = 'CORS Error: Unable to connect to the chat service. Please contact support.';
        }
        
        const errorResponse = {
          id: Date.now() + 1,
          type: 'ai',
          message: errorMessage,
          timestamp: new Date().toLocaleString()
        };
        setChatMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsChatLoading(false);
      }
    }
  };

  const handleBackToDashboard = () => {
    setActiveSection('main');
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'main':
        return (
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Hero Section with Animated Background */}
            <div className="relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90"></div>
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
                }}
              ></div>
              
              {/* Floating Particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 3}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Glassmorphism Card */}
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                          <span className="text-2xl">🧘‍♂️</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-xs">✨</span>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-5xl font-black text-white mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                          Namaste, {currentUser?.email?.split('@')[0]}! 🙏
                        </h1>
                        <p className="text-xl text-white/90 font-medium">
                          Embark on your sacred journey through timeless wisdom
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-spin-slow">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>
                      {/* Orbiting Elements */}
                      <div className="absolute inset-0 animate-spin">
                        <div className="absolute top-0 left-1/2 w-4 h-4 bg-yellow-300 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-pink-300 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute left-0 top-1/2 w-4 h-4 bg-blue-300 rounded-full transform -translate-y-1/2"></div>
                        <div className="absolute right-0 top-1/2 w-4 h-4 bg-green-300 rounded-full transform -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Course Progress Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm"></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black">3</div>
                      <div className="text-sm opacity-80">Active</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Enrolled Courses</h3>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-3/4 transition-all duration-1000"></div>
                  </div>
                  <p className="text-sm opacity-80 mt-2">75% completion rate</p>
                </div>
              </div>

              {/* Learning Hours Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 backdrop-blur-sm"></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black">24</div>
                      <div className="text-sm opacity-80">Hours</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Learning Time</h3>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                  </div>
                  <p className="text-sm opacity-80 mt-2">+12h this week</p>
                </div>
              </div>

              {/* AI Sessions Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-rose-700 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-rose-400/20 backdrop-blur-sm"></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black">8</div>
                      <div className="text-sm opacity-80">Sessions</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Conversations</h3>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-2/3 transition-all duration-1000"></div>
                  </div>
                  <p className="text-sm opacity-80 mt-2">Active this month</p>
                </div>
              </div>

              {/* Community Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-600 to-pink-700 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-pink-400/20 backdrop-blur-sm"></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black">3</div>
                      <div className="text-sm opacity-80">Groups</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Study Groups</h3>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full w-1/2 transition-all duration-1000"></div>
                  </div>
                  <p className="text-sm opacity-80 mt-2">Active discussions</p>
                </div>
              </div>
            </div>

            {/* Interactive Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Chat Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-3xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 backdrop-blur-sm"></div>
                <div className="relative p-8 text-white">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-300 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                        AI Wisdom Chat
                      </h3>
                      <p className="text-white/90 text-lg font-medium">
                        Upload documents and chat with ancient wisdom
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">AI Assistant Online</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Document Analysis Ready</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setActiveSection('rag')}
                    className="w-full mt-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-lg border border-white/20 hover:border-white/40"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Start Chatting</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>

              {/* Meetings Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-3xl transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 backdrop-blur-sm"></div>
                <div className="relative p-8 text-white">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-2xl">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {/* Floating Elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-300 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                        Live Sessions
                      </h3>
                      <p className="text-white/90 text-lg font-medium">
                        Join live classes and group discussions
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Live Streaming Available</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-white/80">Interactive Q&A Ready</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setActiveSection('meetings')}
                    className="w-full mt-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-lg border border-white/20 hover:border-white/40"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Join Sessions</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Immersive Courses Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Sacred Learning Journey
                  </h2>
                  <p className="text-gray-600 text-lg mt-2">Your path through ancient wisdom</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-black text-sm shadow-lg">
                    <span className="flex items-center space-x-2">
                      <span>3 Enrolled</span>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    </span>
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    id: 1,
                    title: "Vedic Philosophy Fundamentals",
                    instructor: "Dr. Rajesh Kumar",
                    progress: 85,
                    status: "In Progress",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
                    color: "from-orange-400 via-red-500 to-pink-500",
                    bg: "from-orange-50 to-red-50",
                    accent: "from-orange-500 to-red-600",
                    description: "Explore the profound teachings of ancient Vedic wisdom"
                  },
                  {
                    id: 2,
                    title: "Sanskrit Language Mastery",
                    instructor: "Prof. Priya Sharma",
                    progress: 100,
                    status: "Completed",
                    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
                    color: "from-green-400 via-emerald-500 to-teal-500",
                    bg: "from-green-50 to-emerald-50",
                    accent: "from-green-500 to-emerald-600",
                    description: "Master the language of the gods and ancient scriptures"
                  },
                  {
                    id: 3,
                    title: "Ancient Indian Scriptures",
                    instructor: "Dr. Amit Patel",
                    progress: 45,
                    status: "In Progress",
                    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
                    color: "from-blue-400 via-indigo-500 to-purple-500",
                    bg: "from-blue-50 to-indigo-50",
                    accent: "from-blue-500 to-indigo-600",
                    description: "Dive deep into sacred texts and their timeless messages"
                  }
                ].map((course, index) => (
                  <div 
                    key={course.id}
                    className="group relative overflow-hidden"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* 3D Card Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700 border border-gray-100"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    <div className="relative p-0 rounded-3xl overflow-hidden">
                      {/* Course Image with Overlay */}
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className={`bg-gradient-to-r ${course.color} text-white px-4 py-2 rounded-full font-black text-xs shadow-lg backdrop-blur-sm`}>
                            <span className="flex items-center space-x-1">
                              <span>{course.status}</span>
                              {course.status === "In Progress" && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                            </span>
                          </Badge>
                        </div>
                        
                        {/* Course Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                            {course.title}
                          </h3>
                          <p className="text-white/90 text-sm font-medium mb-1">by {course.instructor}</p>
                          <p className="text-white/80 text-xs">{course.description}</p>
                        </div>
                      </div>
                      
                      {/* Course Details */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-bold text-gray-600">Progress</span>
                          <span className="text-2xl font-black text-gray-900">{course.progress}%</span>
                        </div>
                        
                        {/* Animated Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button 
                            className={`flex-1 bg-gradient-to-r ${course.accent} hover:opacity-90 text-white font-black py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                          >
                            <span className="flex items-center justify-center space-x-2">
                              <span>{course.status === "Completed" ? "Review" : "Continue"}</span>
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                          </Button>
                          <Button 
                            variant="outline"
                            className="px-4 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-300 group-hover:scale-105"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'rag':
        return (
          <div className={`h-[calc(100vh-120px)] flex flex-col transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent`}>
                  AI Wisdom Chat
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  Upload documents and chat with ancient wisdom
                </p>
              </div>
              <Button 
                onClick={handleBackToDashboard}
                className={`bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Button>
            </div>
            
            {/* Main Chat Interface */}
            <div className={`flex-1 rounded-3xl shadow-2xl border flex flex-col overflow-hidden ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white/80 backdrop-blur-xl border-white/20'
            }`}>
              
              {/* Upload Section */}
              {!uploadedFile && (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-2xl mx-auto">
                    {/* Animated Upload Icon */}
                    <div className="relative mb-8">
                      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      {/* Orbiting Elements */}
                      <div className="absolute inset-0 animate-spin">
                        <div className="absolute top-0 left-1/2 w-6 h-6 bg-yellow-300 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-blue-300 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute left-0 top-1/2 w-6 h-6 bg-green-300 rounded-full transform -translate-y-1/2"></div>
                        <div className="absolute right-0 top-1/2 w-6 h-6 bg-pink-300 rounded-full transform -translate-y-1/2"></div>
                      </div>
                    </div>
                    
                    <h3 className={`text-3xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Upload Your Sacred Document
                    </h3>
                    <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Upload a PDF document to begin your journey through ancient wisdom
                    </p>
                    
                    {/* Upload Button */}
                    <div className="relative">
                      <input
                        ref={ragFileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button 
                        onClick={() => ragFileInputRef.current?.click()}
                        disabled={isUploading}
                        className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-black px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-lg ${
                          isUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isUploading ? (
                          <span className="flex items-center space-x-3">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Uploading...</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Choose PDF File</span>
                          </span>
                        )}
                      </Button>
                    </div>
                    
                    {/* File Info */}
                    <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} backdrop-blur-sm`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Supported formats: PDF only • Max size: 10MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Chat Interface */}
              {uploadedFile && (
                <>
                  {/* File Info Header */}
                  <div className={`p-6 border-b ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} backdrop-blur-sm`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {uploadedFile.name}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Uploaded on {uploadedFile.uploadDate} • {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                          Ready for Chat
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                              message.type === 'user' 
                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                                : 'bg-gradient-to-br from-purple-500 to-pink-600'
                            }`}>
                              {message.type === 'user' ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              ) : (
                                <div className="relative">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                  </svg>
                                  {/* AI Indicator */}
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                                </div>
                              )}
                            </div>
                            
                            {/* Message Bubble */}
                            <div className={`px-6 py-4 rounded-2xl shadow-lg relative group ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                : darkMode 
                                  ? 'bg-gray-700 text-white' 
                                  : 'bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 border border-purple-200'
                            }`}>
                              {/* AI Response Content */}
                              {message.type === 'ai' ? (
                                <div className="space-y-3">
                                  {/* AI Response Text */}
                                  <div className="prose prose-sm max-w-none">
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                      {message.isTyping ? typingMessage : message.message}
                                      {message.isTyping && (
                                        <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse"></span>
                                      )}
                                    </p>
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  {!message.isTyping && (
                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                      <button
                                        onClick={() => copyToClipboard(message.message)}
                                        className="flex items-center space-x-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs font-medium transition-colors duration-200"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>Copy</span>
                                      </button>
                                      
                                      <button
                                        onClick={() => {
                                          const newMessage = `Can you elaborate on: "${message.message.substring(0, 50)}..."`;
                                          setCurrentMessage(newMessage);
                                        }}
                                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium transition-colors duration-200"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <span>Follow-up</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                /* User Message Content */
                                <div>
                                  <p className="text-sm leading-relaxed">{message.message}</p>
                                </div>
                              )}
                              
                              {/* Timestamp */}
                              <p className={`text-xs mt-3 ${
                                message.type === 'user' ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Loading Indicator */}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-3xl">
                          <div className="flex items-start space-x-3">
                            {/* AI Avatar */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            
                            {/* Loading Bubble */}
                            <div className={`px-6 py-4 rounded-2xl shadow-lg ${
                              darkMode 
                                ? 'bg-gray-700 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                                <span className="text-sm">AI is thinking...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className={`p-6 border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} backdrop-blur-sm`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Ask a question about your document..."
                          className={`w-full px-6 py-4 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'
                          }`}
                        />
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isChatLoading}
                        className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                          currentMessage.trim() && !isChatLoading
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isChatLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'meetings':
        return (
          <div className="h-[calc(100vh-120px)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-gray-800">Meetings</h2>
              <Button 
                onClick={handleBackToDashboard}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold px-6 py-2 rounded-xl"
              >
                Back to Dashboard
              </Button>
            </div>
            
            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No meetings scheduled</h3>
                <p className="text-gray-600 mb-6">Schedule your first meeting to start collaborating</p>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl">
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex transition-all duration-1000 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'}`}>
      {/* Futuristic Sidebar */}
      <div className={`w-72 shadow-2xl border-r transition-all duration-1000 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-xl border-white/20'}`}>
        <div className="p-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="relative">
              <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ${darkMode ? 'shadow-blue-500/25' : 'shadow-blue-500/50'}`}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-20 animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                The Vedas Institute
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sacred Learning Platform</p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-8">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {darkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  )}
                </svg>
                <span className="font-medium">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </span>
              <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                darkMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </button>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <div className={`p-4 rounded-2xl transition-all duration-300 ${
              darkMode ? 'bg-gray-700/50' : 'bg-white/50'
            } backdrop-blur-sm border ${
              darkMode ? 'border-gray-600' : 'border-white/20'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg ${
                    darkMode ? 'shadow-blue-500/25' : 'shadow-blue-500/50'
                  }`}>
                    {userPhoto ? (
                      <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {currentUser?.email?.split('@')[0]}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pro Member</p>
                  </div>
                </div>
              </div>
              
              {/* Progress Ring */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Learning Progress
                </span>
                <span className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>75%</span>
              </div>
              <div className={`w-full bg-gray-200 rounded-full h-2 mt-2 ${darkMode ? 'bg-gray-600' : ''}`}>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
              </div>
            </div>
          </div>

          {/* Futuristic Navigation */}
          <nav className="space-y-3">
            <button
              onClick={() => setActiveSection('main')}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'main'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                activeSection === 'main'
                  ? 'bg-white/20'
                  : 'bg-gray-100 group-hover:bg-blue-100'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <span className="font-bold text-lg">Dashboard</span>
                <p className={`text-xs ${activeSection === 'main' ? 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Overview & Analytics
                </p>
              </div>
              {activeSection === 'main' && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>

            <button
              onClick={() => setActiveSection('rag')}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'rag'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-xl shadow-purple-500/25'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                activeSection === 'rag'
                  ? 'bg-white/20'
                  : 'bg-gray-100 group-hover:bg-purple-100'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <span className="font-bold text-lg">AI Wisdom Chat</span>
                <p className={`text-xs ${activeSection === 'rag' ? 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Document Analysis
                </p>
              </div>
              {activeSection === 'rag' && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>

            <button
              onClick={() => setActiveSection('meetings')}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === 'meetings'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/25'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                activeSection === 'meetings'
                  ? 'bg-white/20'
                  : 'bg-gray-100 group-hover:bg-emerald-100'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <span className="font-bold text-lg">Live Sessions</span>
                <p className={`text-xs ${activeSection === 'meetings' ? 'text-white/80' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Interactive Learning
                </p>
              </div>
              {activeSection === 'meetings' && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          </nav>

          {/* Logout Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                darkMode 
                  ? 'text-gray-400 hover:bg-red-500/20 hover:text-red-400' 
                  : 'text-gray-500 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 group-hover:bg-red-500/20' 
                  : 'bg-gray-100 group-hover:bg-red-100'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <span className="font-bold text-lg">Logout</span>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Sign out safely
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


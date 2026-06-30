import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { content } from './content';
import Header from './Header';
import AboutSection from './AboutSection';
import GallerySection from './GallerySection';
import VideoSection from './VideoSection';
import PropertyDetails from './PropertyDetails';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { FaVolumeMute, FaVolumeUp, FaEnvelope, FaArrowRight, FaLeaf, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import AnimatedElement from './components/AnimatedElement';
import AnimatedText from './components/AnimatedText';
import emailjs from 'emailjs-com';

// Main content component that takes language as a parameter
function MainContent({ lang }) {
  const [audioOn, setAudioOn] = useState(false);
  const videoRef = useRef(null);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    interest: lang === 'es' ? 'Inversión' : 'Investment'
  });
  const [quoteStatus, setQuoteStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = audioOn; // if audioOn is true, then set muted to true to turn it off, vice versa
    }
    setAudioOn(!audioOn);
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // EmailJS service, template, and user IDs
    // Replace these with your actual EmailJS credentials from your EmailJS dashboard:
    // - serviceId: found in "Email Services" section (e.g., 'service_abc123')
    // - templateId: found in "Email Templates" section (e.g., 'template_xyz789')
    // - userId: found in "Account" > "API Keys" section (Public Key)
    const serviceId = 'service_oe4i2ge';
    const templateId = 'template_8oqnbr6';
    const userId = 'CRl5y4n6wAOYysbCB';
    
    // Prepare template parameters
    const templateParams = {
      from_name: quoteForm.name,
      from_email: quoteForm.email,
      interest: quoteForm.interest,
      message: `Quick quote request from hero section. Interest: ${quoteForm.interest}`,
      to_name: 'Flor de Agarthi Corcovado',
      reply_to: quoteForm.email,
      lang: lang
    };
    
    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setQuoteStatus({
          submitted: true,
          success: true,
          message: lang === 'es' 
            ? 'Gracias por tu interés. Nos pondremos en contacto contigo pronto.' 
            : 'Thank you for your interest. We will contact you soon.'
        });
        // Reset form
        setQuoteForm({
          name: '',
          email: '',
          interest: lang === 'es' ? 'Inversión' : 'Investment'
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setQuoteStatus({
          submitted: true,
          success: false,
          message: lang === 'es'
            ? 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente.'
            : 'There was an error sending your message. Please try again or contact us directly.'
        });
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen relative font-sans text-white overflow-x-hidden">
      {/* Header with navigation and language switcher */}
      <Header lang={lang} />
      
      {/* Hero section with video background */}
      <div className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={!audioOn}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dkca8m9ar/video/upload/v1740594477/20231121_090753_dfclk0.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        
        {/* Audio toggle button positioned on top of header */}
        <motion.div 
          className="absolute top-6 right-20 z-[60] group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.5,
            type: 'spring',
            stiffness: 200
          }}
        >
          <button 
            onClick={toggleAudio} 
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
            aria-label={audioOn ? "Mute audio" : "Unmute audio"}
          >
            {audioOn ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
          </button>
          <div className="absolute right-0 mt-2 w-32 px-2 py-1 bg-black bg-opacity-75 rounded text-white text-xs text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {audioOn ? (lang === 'es' ? 'Silenciar audio' : 'Mute audio') : (lang === 'es' ? 'Activar audio' : 'Unmute audio')}
          </div>
        </motion.div>
        
        {/* Hero Content with asymmetric layout */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center">
            {/* Left side - Title and description */}
            <div className="lg:w-1/2 text-left lg:pt-32 mb-8 lg:mb-0">
              <AnimatedElement 
                type="slideInLeft" 
                duration={0.7} 
                delay={0.2}
              >
                <div className="inline-block bg-green-200 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                  <FaLeaf className="inline mr-2" />
                  {lang === 'es' ? 'PROPIEDAD EXCLUSIVA' : 'EXCLUSIVE PROPERTY'}
                </div>
              </AnimatedElement>
              
              <AnimatedText 
                text={content[lang].title}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight sm:leading-relaxed break-words"
                delay={0.4}
                Tag="h1"
                letterSpacing="0.01em"
                lineHeight="1.2"
              />
              
              <AnimatedElement 
                type="scale" 
                duration={0.5} 
                delay={0.8}
              >
                <div className="w-20 h-1 bg-green-200 mb-8"></div>
              </AnimatedElement>
              
              <AnimatedElement 
                type="slideUp" 
                duration={0.7} 
                delay={0.9}
              >
                <p className="text-lg lg:text-xl mb-10 text-gray-200 max-w-xl leading-relaxed">
                  {content[lang].description}
                </p>
              </AnimatedElement>

              {/* Mobile-only CTA button that scrolls to the contact form */}
              <AnimatedElement 
                type="slideUp" 
                duration={0.7} 
                delay={1.0}
                className="lg:hidden"
              >
                <motion.a 
                  href="#contact"
                  className="inline-flex items-center bg-green-200 hover:bg-green-300 py-3 px-6 rounded-lg text-gray-800 font-bold transition-colors duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEnvelope className="mr-2" />
                  {lang === 'es' ? 'Solicitar información' : 'Request Information'}
                  <FaArrowRight className="ml-2" />
                </motion.a>
              </AnimatedElement>
            </div>
            
            {/* Right side - Quick Quote Form - Hidden on mobile */}
            <div className="hidden lg:block lg:w-1/2 lg:pl-12">
              <AnimatedElement 
                type="slideInRight" 
                duration={0.8} 
                delay={0.6}
              >
                <div className="bg-black/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700 shadow-2xl max-w-md mx-auto">
                  <h3 className="text-2xl font-semibold mb-8 text-center">
                    {lang === 'es' ? 'Solicita información' : 'Request Information'}
                  </h3>
                  
                  {quoteStatus.submitted && (
                    <motion.div 
                      className={`mb-8 p-4 rounded-lg ${quoteStatus.success ? 'bg-green-900/50' : 'bg-red-900/50'}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center">
                        {quoteStatus.success ? (
                          <FaCheckCircle className="text-green-300 mr-3 text-xl" />
                        ) : (
                          <FaExclamationCircle className="text-red-300 mr-3 text-xl" />
                        )}
                        <p>{quoteStatus.message}</p>
                      </div>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleQuoteSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm text-gray-400 block mb-3">
                        {lang === 'es' ? 'Nombre' : 'Name'}
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={quoteForm.name}
                        onChange={handleQuoteChange}
                        required
                        placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'} 
                        className="w-full p-4 rounded-lg bg-gray-800/80 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-3">
                        Email
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={quoteForm.email}
                        onChange={handleQuoteChange}
                        required
                        placeholder="email@ejemplo.com" 
                        className="w-full p-4 rounded-lg bg-gray-800/80 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-3">
                        {lang === 'es' ? 'Interés principal' : 'Main interest'}
                      </label>
                      <select 
                        name="interest"
                        value={quoteForm.interest}
                        onChange={handleQuoteChange}
                        className="w-full p-4 rounded-lg bg-gray-800/80 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                      >
                        <option value={lang === 'es' ? 'Inversión' : 'Investment'}>
                          {lang === 'es' ? 'Inversión' : 'Investment'}
                        </option>
                        <option value={lang === 'es' ? 'Conservación' : 'Conservation'}>
                          {lang === 'es' ? 'Conservación' : 'Conservation'}
                        </option>
                        <option value={lang === 'es' ? 'Ecoturismo' : 'Ecotourism'}>
                          {lang === 'es' ? 'Ecoturismo' : 'Ecotourism'}
                        </option>
                        <option value={lang === 'es' ? 'Agricultura' : 'Agriculture'}>
                          {lang === 'es' ? 'Agricultura' : 'Agriculture'}
                        </option>
                      </select>
                    </div>
                    <motion.button 
                      type="submit" 
                      className="w-full bg-green-200 hover:bg-green-300 py-4 px-6 rounded-lg text-gray-800 font-bold transition-colors duration-300 flex items-center justify-center mt-8"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {lang === 'es' ? 'Enviando...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <FaEnvelope className="mr-2" />
                          {lang === 'es' ? 'Solicitar información' : 'Request Information'}
                          <FaArrowRight className="ml-2" />
                        </>
                      )}
                    </motion.button>
                    <p className="text-xs text-gray-400 text-center mt-4">
                      {lang === 'es' 
                        ? 'Te contactaremos a la brevedad posible' 
                        : 'We will contact you as soon as possible'}
                    </p>
                  </form>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
      
      <AboutSection lang={lang} />
      <GallerySection lang={lang} />
      <VideoSection lang={lang} />
      <PropertyDetails lang={lang} />
      <ContactSection lang={lang} />
      <Footer />
    </div>
  );
}

// Language route component that extracts the language parameter
function LanguageRoute() {
  const { lang } = useParams();
  
  // Validate that lang is either 'es' or 'en'
  const validLang = ['es', 'en'].includes(lang) ? lang : 'es';
  
  return <MainContent lang={validLang} />;
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* Default route redirects to Spanish */}
        <Route path="/" element={<Navigate to="/es" replace />} />
        
        {/* Language-specific routes */}
        <Route path="/:lang" element={<LanguageRoute />} />
        
        {/* Catch-all route redirects to Spanish */}
        <Route path="*" element={<Navigate to="/es" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 
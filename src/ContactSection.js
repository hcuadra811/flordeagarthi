import React, { useState, useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import AnimatedElement from './components/AnimatedElement';
import AnimatedText from './components/AnimatedText';
import StaggerContainer from './components/StaggerContainer';
import { content } from './content';

function ContactSection({ lang }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: lang === 'es' ? 'Inversión' : 'Investment'
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // EmailJS service, template, and user IDs
    // Replace these with your actual EmailJS credentials from your EmailJS dashboard:
    // - serviceId: found in "Email Services" section (e.g., 'service_abc123')
    // - templateId: found in "Email Templates" section (e.g., 'template_xyz789')
    // - userId: found in "Account" > "API Keys" section (Public Key)
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const userId = 'YOUR_USER_ID';
    
    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      interest: formData.interest,
      message: formData.message,
      to_name: 'Flor de Agarthi Corcovado',
      reply_to: formData.email,
      lang: lang
    };
    
    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus({
          submitted: true,
          success: true,
          message: lang === 'es' 
            ? 'Gracias por contactarnos. Nos comunicaremos pronto.' 
            : 'Thank you for contacting us. We will be in touch soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          interest: lang === 'es' ? 'Inversión' : 'Investment'
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setStatus({
          submitted: true,
          success: false,
          message: lang === 'es'
            ? 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente.'
            : 'There was an error sending your message. Please try again or contact us directly.'
        });
        setLoading(false);
      });
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-green-200" />,
      titleEs: "Teléfono",
      titleEn: "Phone",
      value: content[lang].contactInfo.phoneFormatted,
      link: content[lang].contactInfo.phoneUrl
    },
    {
      icon: <FaWhatsapp className="text-green-200" />,
      titleEs: "WhatsApp",
      titleEn: "WhatsApp",
      value: content[lang].contactInfo.phoneFormatted,
      link: `https://wa.me/${content[lang].contactInfo.phone.replace(/\+|\s+/g, '')}`
    },
    {
      icon: <FaEnvelope className="text-green-200" />,
      titleEs: "Email",
      titleEn: "Email",
      value: content[lang].contactInfo.email,
      link: content[lang].contactInfo.emailUrl
    },
    {
      icon: <FaMapMarkerAlt className="text-green-200" />,
      titleEs: "Ubicación",
      titleEn: "Location",
      value: content[lang].contactInfo.location,
      link: content[lang].contactInfo.mapUrl
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimatedElement type="fadeIn" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {lang === 'es' 
                ? 'Estamos aquí para responder a todas tus preguntas sobre esta propiedad única.' 
                : 'We are here to answer all your questions about this unique property.'}
            </p>
          </div>
        </AnimatedElement>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Form */}
          <AnimatedElement type="slideInLeft" delay={0.4} className="lg:w-1/2">
            <div className="bg-gray-700 bg-opacity-50 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-3">
                {lang === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
              </h3>
              
              {status.submitted && (
                <motion.div 
                  className={`mb-6 p-4 rounded-lg ${status.success ? 'bg-green-900/50' : 'bg-red-900/50'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center">
                    {status.success ? (
                      <FaCheckCircle className="text-green-300 mr-2 text-xl" />
                    ) : (
                      <FaExclamationCircle className="text-red-300 mr-2 text-xl" />
                    )}
                    <p>{status.message}</p>
                  </div>
                </motion.div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    {lang === 'es' ? 'Nombre completo' : 'Full name'}*
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'} 
                    className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email*
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@ejemplo.com" 
                      className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      {lang === 'es' ? 'Teléfono' : 'Phone'}
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={content[lang].contactInfo.phoneFormatted} 
                      className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-1">
                    {lang === 'es' ? 'Interés principal' : 'Main interest'}
                  </label>
                  <select 
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
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
                    <option value={lang === 'es' ? 'Otro' : 'Other'}>
                      {lang === 'es' ? 'Otro' : 'Other'}
                    </option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    {lang === 'es' ? 'Mensaje' : 'Message'}*
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={lang === 'es' ? 'Tu mensaje o consulta...' : 'Your message or inquiry...'} 
                    className="w-full p-3 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent"
                    rows="4"
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-green-200 hover:bg-green-300 py-3 px-6 rounded-lg text-gray-800 font-bold transition-colors duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
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
                      {lang === 'es' ? 'Enviar mensaje' : 'Send message'}
                    </>
                  )}
                </motion.button>
                
                <p className="text-xs text-gray-400 mt-2">
                  {lang === 'es' 
                    ? '* Campos requeridos. Nos pondremos en contacto contigo lo antes posible.' 
                    : '* Required fields. We will get back to you as soon as possible.'}
                </p>
              </form>
            </div>
          </AnimatedElement>
          
          {/* Contact Information and Map */}
          <div className="lg:w-1/2 space-y-8">
            {/* Contact Information */}
            <AnimatedElement type="slideInRight" delay={0.5}>
              <div className="bg-gray-700 bg-opacity-50 p-8 rounded-lg shadow-xl mb-8">
                <h3 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-3">
                  {lang === 'es' ? 'Información de contacto' : 'Contact information'}
                </h3>
                <StaggerContainer delay={0.2} staggerDelay={0.1}>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.a 
                        key={index} 
                        href={info.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-3 hover:bg-gray-600 rounded-lg transition-colors duration-300"
                        whileHover={{ x: 5, backgroundColor: 'rgba(75, 85, 99, 0.5)' }}
                      >
                        <div className="mr-4 text-xl">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            {lang === 'es' ? info.titleEs : info.titleEn}
                          </p>
                          <p className="font-medium">{info.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </StaggerContainer>
              </div>
            </AnimatedElement>
            
            {/* Map */}
            <AnimatedElement type="slideUp" delay={0.7}>
              <div className="bg-gray-700 bg-opacity-50 p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-3">
                  {lang === 'es' ? 'Ubicación' : 'Location'}
                </h3>
                <motion.div 
                  className="rounded-lg overflow-hidden shadow-lg h-64"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0553835766196!2d-83.66948547489868!3d8.648121493775598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa3899c42866871%3A0xb8a583177c3f80d3!2sEstaci%C3%B3n%20Los%20Planes%2C%20Parque%20Nacional%20Corcovado!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                  ></iframe>
                </motion.div>
                <p className="mt-4 text-gray-300 text-sm">
                  {lang === 'es' 
                    ? 'La propiedad se encuentra junto a la Estación Los Planes en el Parque Nacional Corcovado, Península de Osa, Costa Rica.' 
                    : 'The property is located next to Estación Los Planes in Corcovado National Park, Osa Peninsula, Costa Rica.'}
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection; 
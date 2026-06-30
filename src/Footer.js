import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLeaf, FaSeedling } from 'react-icons/fa';
import { content } from './content';
import { useParams } from 'react-router-dom';

function Footer() {
  const { lang } = useParams();
  const currentLang = ['es', 'en'].includes(lang) ? lang : 'es';
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com/', label: 'Instagram' },
    { icon: <FaWhatsapp />, url: `https://wa.me/${content[currentLang].contactInfo.phone.replace(/\+|\s+/g, '')}`, label: 'WhatsApp' }
  ];
  
  const contactLinks = [
    { icon: <FaEnvelope />, text: content[currentLang].contactInfo.email, url: content[currentLang].contactInfo.emailUrl },
    { icon: <FaPhone />, text: content[currentLang].contactInfo.phoneFormatted, url: content[currentLang].contactInfo.phoneUrl },
    { icon: <FaMapMarkerAlt />, text: content[currentLang].contactInfo.location, url: content[currentLang].contactInfo.mapUrl }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 overflow-hidden">
      {/* Main Footer */}
      <div className="pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Logo and About */}
            <div>
              <div className="flex items-center mb-4">
                <FaSeedling className="text-green-200 h-8 w-8" />
                <div className="ml-3">
                  <div className="text-white font-bold text-xl">Flor de Agarthi Corcovado</div>
                  <div className="text-green-200 text-xs tracking-wider">
                    {currentLang === 'es' ? 'FINCA EN CORCOVADO' : 'ESTATE IN CORCOVADO'}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                {currentLang === 'es' 
                  ? 'Una oportunidad única para adquirir un paraíso natural en una de las zonas más biodiversas del planeta.'
                  : 'A unique opportunity to acquire a natural paradise in one of the most biodiverse areas on the planet.'}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-200 transition-colors duration-300"
                    aria-label={link.label}
                  >
                    <span className="text-xl">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contact Information */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
                {currentLang === 'es' ? 'Contacto' : 'Contact'}
              </h3>
              <ul className="space-y-3">
                {contactLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-200 transition-colors duration-300 flex items-start"
                    >
                      <span className="mr-3 mt-1 text-green-200">{link.icon}</span>
                      <span>{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="py-4 border-t border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Flor de Agarthi Corcovado. 
            {currentLang === 'es' 
              ? ' Todos los derechos reservados.'
              : ' All rights reserved.'}
          </p>
          <div className="mt-2 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-green-200 text-sm mx-2 transition-colors duration-300">
              {currentLang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </a>
            <a href="#" className="text-gray-500 hover:text-green-200 text-sm mx-2 transition-colors duration-300">
              {currentLang === 'es' ? 'Términos de Uso' : 'Terms of Use'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 
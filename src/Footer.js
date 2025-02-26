import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLeaf, FaSeedling } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com/', label: 'Instagram' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/50688888888', label: 'WhatsApp' }
  ];
  
  const contactLinks = [
    { icon: <FaEnvelope />, text: 'info@flordeagarthi.com', url: 'mailto:info@flordeagarthi.com' },
    { icon: <FaPhone />, text: '+506 8888-8888', url: 'tel:+50688888888' },
    { icon: <FaMapMarkerAlt />, text: 'Los Planes de Drake, Península de Osa, Costa Rica', url: 'https://maps.app.goo.gl/BfLUH4ppqyfrvpN18' }
  ];
  
  const quickLinks = [
    { text: 'Inicio', url: '#' },
    { text: 'Acerca de', url: '#about' },
    { text: 'Detalles', url: '#details' },
    { text: 'Galería', url: '#gallery' },
    { text: 'Videos', url: '#videos' },
    { text: 'Contacto', url: '#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Logo and About */}
            <div>
              <div className="flex items-center mb-4">
                <FaSeedling className="text-green-200 h-8 w-8" />
                <div className="ml-3">
                  <div className="text-white font-bold text-xl">Flor de Agarthi</div>
                  <div className="text-green-200 text-xs tracking-wider">FINCA EN CORCOVADO</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Una oportunidad única para adquirir un paraíso natural en una de las zonas más biodiversas del planeta.
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
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-green-200 transition-colors duration-300 flex items-center"
                    >
                      <FaLeaf className="text-green-200 mr-2 text-xs" />
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Information */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contacto</h3>
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
            &copy; {currentYear} Flor de Agarthi. Todos los derechos reservados.
          </p>
          <div className="mt-2 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-green-200 text-sm mx-2 transition-colors duration-300">Política de Privacidad</a>
            <a href="#" className="text-gray-500 hover:text-green-200 text-sm mx-2 transition-colors duration-300">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 
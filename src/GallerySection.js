import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedElement from './components/AnimatedElement';
import AnimatedText from './components/AnimatedText';
import StaggerContainer from './components/StaggerContainer';

function GallerySection({ lang }) {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Gallery images with varying heights for masonry effect
  const galleryImages = [
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/image/upload/v1740594507/20231121_083611_xjaqga.jpg',
      alt: lang === 'es' ? 'Vista de la finca 1' : 'Property view 1',
      height: 'h-64 md:h-80'
    },
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/image/upload/v1740594510/20231121_083640_dgswuf.jpg',
      alt: lang === 'es' ? 'Vista de la finca 2' : 'Property view 2',
      height: 'h-96'
    },
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/image/upload/v1740594508/20231121_083647_g5bpnb.jpg',
      alt: lang === 'es' ? 'Vista de la finca 3' : 'Property view 3',
      height: 'h-72'
    },
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/image/upload/v1740594504/20231121_083649_mk8dwy.jpg',
      alt: lang === 'es' ? 'Vista de la finca 4' : 'Property view 4',
      height: 'h-80'
    },
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/image/upload/v1740594506/20231121_090647_iuqajk.jpg',
      alt: lang === 'es' ? 'Vista de la finca 6' : 'Property view 6',
      height: 'h-96 md:h-[28rem]'
    }
  ];

  const openLightbox = (index) => {
    setSelectedImage(index);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const newIndex = (selectedImage + direction + galleryImages.length) % galleryImages.length;
    setSelectedImage(newIndex);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (selectedImage === null) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateImage(-1);
    } else if (e.key === 'ArrowRight') {
      navigateImage(1);
    }
  };

  // Add keyboard event listener
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-16 px-4 bg-gray-100 text-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimatedElement type="fadeIn" delay={0.2}>
          <h2 className="text-4xl font-bold mb-4 text-center">
            {lang === 'es' ? 'Galería de Imágenes' : 'Image Gallery'}
          </h2>
        </AnimatedElement>
        
        <AnimatedElement type="slideUp" delay={0.4}>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-10">
            {lang === 'es' 
              ? 'Explora la belleza natural de esta propiedad única' 
              : 'Explore the natural beauty of this unique property'}
          </p>
        </AnimatedElement>
        
        {/* Masonry Gallery */}
        <StaggerContainer delay={0.2} staggerDelay={0.1}>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index} 
                className="break-inside-avoid mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform cursor-pointer"
                onClick={() => openLightbox(index)}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className={`w-full object-cover ${image.height}`}
                    style={{ minHeight: '200px' }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-green-200 text-gray-800 px-4 py-2 rounded-full font-medium">
                        {lang === 'es' ? 'Ver imagen' : 'View image'}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>

      {/* Lightbox with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative max-w-6xl w-full max-h-screen"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <motion.button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full z-10"
                aria-label="Close lightbox"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={24} />
              </motion.button>
              
              {/* Navigation buttons */}
              <motion.button 
                onClick={() => navigateImage(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full z-10"
                aria-label="Previous image"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft size={24} />
              </motion.button>
              <motion.button 
                onClick={() => navigateImage(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full z-10"
                aria-label="Next image"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight size={24} />
              </motion.button>
              
              {/* Image */}
              <motion.div 
                className="h-full flex items-center justify-center"
                key={selectedImage} // This forces re-render on image change
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={galleryImages[selectedImage].url} 
                  alt={galleryImages[selectedImage].alt}
                  className="max-h-[85vh] max-w-full object-contain"
                />
              </motion.div>
              
              {/* Caption */}
              <motion.div 
                className="absolute bottom-4 left-0 right-0 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <p className="text-lg">{galleryImages[selectedImage].alt}</p>
                <p className="text-sm text-gray-300">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GallerySection; 
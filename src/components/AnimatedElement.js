import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for different effects
const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideDown: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideInLeft: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideInRight: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  rotate: {
    hidden: { rotate: -10, opacity: 0 },
    visible: { rotate: 0, opacity: 1 }
  },
  flip: {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1 }
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1
      }
    })
  }
};

const AnimatedElement = ({ 
  children, 
  type = 'fadeIn', 
  duration = 0.5, 
  delay = 0, 
  className = '',
  threshold = 0.1,
  once = true,
  customVariants = null,
  staggerIndex = 0
}) => {
  // Use custom variants if provided, otherwise use predefined animations
  const variants = customVariants || animations[type] || animations.fadeIn;
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold }}
      variants={variants}
      custom={staggerIndex}
      transition={{ 
        duration, 
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement; 
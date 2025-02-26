import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  text, 
  type = 'words', 
  className = '',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  Tag = 'h2'
}) => {
  // Split text into words or characters
  const items = type === 'words' 
    ? text.split(' ').map(word => `${word} `) 
    : text.split('');
  
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: type === 'words' ? 0.08 : 0.04
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const CustomTag = Tag;

  return (
    <CustomTag className={className}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, threshold }}
        variants={containerVariants}
      >
        {items.map((item, index) => (
          <motion.span
            key={index}
            style={{ display: 'inline-block' }}
            variants={itemVariants}
          >
            {item}
          </motion.span>
        ))}
      </motion.span>
    </CustomTag>
  );
};

export default AnimatedText; 
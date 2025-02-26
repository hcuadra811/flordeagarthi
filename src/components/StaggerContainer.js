import React from 'react';
import { motion } from 'framer-motion';

const StaggerContainer = ({ 
  children, 
  className = '', 
  delay = 0.1, 
  staggerDelay = 0.1,
  threshold = 0.1,
  once = true
}) => {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  };

  // Child animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Clone children and wrap them in motion.div
  const animatedChildren = React.Children.map(children, (child, index) => {
    return (
      <motion.div key={index} variants={itemVariants}>
        {child}
      </motion.div>
    );
  });

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold }}
      variants={containerVariants}
    >
      {animatedChildren}
    </motion.div>
  );
};

export default StaggerContainer; 
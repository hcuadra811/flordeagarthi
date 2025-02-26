import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ 
  children, 
  className = '', 
  direction = 'up', 
  speed = 0.2,
  opacity = true
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate transform based on direction and speed
  let transformValue;
  switch (direction) {
    case 'up':
      transformValue = useTransform(scrollYProgress, [0, 1], ['0%', `-${speed * 100}%`]);
      break;
    case 'down':
      transformValue = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
      break;
    case 'left':
      transformValue = useTransform(scrollYProgress, [0, 1], ['0%', `-${speed * 100}%`]);
      break;
    case 'right':
      transformValue = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
      break;
    default:
      transformValue = useTransform(scrollYProgress, [0, 1], ['0%', `-${speed * 100}%`]);
  }

  // Set the appropriate style based on direction
  const style = {};
  if (direction === 'up' || direction === 'down') {
    style.y = transformValue;
  } else {
    style.x = transformValue;
  }

  // Add opacity effect if enabled
  if (opacity) {
    style.opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={style}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection; 
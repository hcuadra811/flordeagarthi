import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaExpand, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

function VideoSection({ lang }) {
  // Video data with titles and descriptions
  const videos = [
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/video/upload/v1740594499/20231121_090655_fnxppv.mp4',
      titleEs: 'Recorrido por el sendero principal',
      titleEn: 'Main trail tour',
      descEs: 'Vista del sendero principal que atraviesa la propiedad',
      descEn: 'View of the main trail that crosses the property'
    },
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/video/upload/v1740594477/20231121_090753_dfclk0.mp4',
      titleEs: 'Cascadas del Río Claro',
      titleEn: 'Claro River waterfalls',
      descEs: 'Hermosas cascadas formadas en el lecho rocoso del río',
      descEn: 'Beautiful waterfalls formed in the rocky riverbed'
    },
    {
      url: 'https://res.cloudinary.com/dkca8m9ar/video/upload/v1740594486/20231121_124310_th9jk8.mp4',
      titleEs: 'Biodiversidad de la finca',
      titleEn: 'Property biodiversity',
      descEs: 'Muestra de la rica flora y fauna presente en la propiedad',
      descEn: 'Sample of the rich flora and fauna present on the property'
    }
  ];

  // State for currently selected video
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Handle video selection
  const selectVideo = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Enter fullscreen
  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // Update playing state when video ends
  useEffect(() => {
    const handleVideoEnd = () => {
      setIsPlaying(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [videoRef]);

  return (
    <section id="videos" className="py-16 px-4 bg-gray-100 text-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {lang === 'es' ? 'Videos de la Finca' : 'Property Videos'}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Video Player */}
          <div className="lg:w-3/5">
            <div className="bg-black rounded-lg overflow-hidden shadow-xl h-full flex flex-col">
              <div className="relative flex-grow" style={{ height: '400px' }}>
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={videos[currentVideoIndex].url}
                  muted={isMuted}
                  playsInline
                  onClick={togglePlay}
                >
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex items-center justify-between">
                  <button 
                    onClick={togglePlay}
                    className="text-white hover:text-green-200 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                  </button>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={toggleMute}
                      className="text-white hover:text-green-200 transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                    </button>
                    
                    <button 
                      onClick={enterFullscreen}
                      className="text-white hover:text-green-200 transition-colors"
                      aria-label="Fullscreen"
                    >
                      <FaExpand size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Play Button Overlay (when paused) */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={togglePlay}
                      className="bg-green-200 bg-opacity-70 text-gray-800 rounded-full p-5 hover:bg-opacity-90 transition-all transform hover:scale-110"
                      aria-label="Play video"
                    >
                      <FaPlay size={24} />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Video Title and Description */}
              <div className="p-4 bg-white border-t border-gray-200">
                <h3 className="text-xl font-bold mb-2">
                  {lang === 'es' 
                    ? videos[currentVideoIndex].titleEs 
                    : videos[currentVideoIndex].titleEn}
                </h3>
                <p className="text-gray-600">
                  {lang === 'es' 
                    ? videos[currentVideoIndex].descEs 
                    : videos[currentVideoIndex].descEn}
                </p>
              </div>
            </div>
          </div>
          
          {/* Video Playlist */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <h3 className="bg-gray-800 text-white p-4 font-semibold">
                {lang === 'es' ? 'Lista de Videos' : 'Video Playlist'}
              </h3>
              
              <div className="divide-y divide-gray-200 overflow-y-auto" style={{ height: '400px' }}>
                {videos.map((video, index) => (
                  <div 
                    key={index}
                    onClick={() => selectVideo(index)}
                    className={`p-4 flex cursor-pointer hover:bg-gray-50 transition-colors ${
                      currentVideoIndex === index ? 'bg-green-50 border-l-4 border-green-200' : ''
                    }`}
                  >
                    {/* Video Thumbnail */}
                    <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                      <video 
                        src={video.url} 
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <FaPlay className="text-white opacity-80" />
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="ml-4 flex-grow">
                      <h4 className="font-medium text-gray-800">
                        {lang === 'es' ? video.titleEs : video.titleEn}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {lang === 'es' ? video.descEs : video.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection; 
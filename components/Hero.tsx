import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

import heroVideo from "../assets/images/hero.mp4";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="relative w-full h-[95vh] overflow-hidden">
      {/* 背景视频 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        src={heroVideo}
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />

      {/* 渐变遮罩层 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* 前景内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          <span className="bg-gradient-to-r from-[#81D8D0] to-[#5DC1B9] bg-clip-text text-transparent">
            Tiffany
          </span>{" "}
          Timeless Design
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3 }}
          className="text-white text-lg md:text-xl mb-8 max-w-2xl"
        >
          Experience the art of jewelry crafted with precision, elegance, and
          grace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        >
          <Link
            to="/products"
            className="px-8 py-3 rounded-full text-sm font-semibold text-white
              bg-gradient-to-r from-[#81D8D0] to-[#5DC1B9] shadow-lg
              hover:opacity-90 transition-all duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down 提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 1.2,
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-wider uppercase">Scroll Down</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.div>

      {/* 播放 / 暂停按钮（右下角） */}
      <button
        onClick={handleTogglePlay}
        className="absolute bottom-6 right-6 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition duration-300 z-20"
      >
        {isPlaying ? <Pause size={22} /> : <Play size={22} />}
      </button>

      {/* 声音开关按钮（左下角） */}
      <button
        onClick={handleToggleMute}
        className="absolute bottom-6 left-6 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition duration-300 z-20"
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>
    </div>
  );
};

export default Hero;

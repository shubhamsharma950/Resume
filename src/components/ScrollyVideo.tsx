"use client";

import { useScroll, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode, useCallback } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoReady = useRef(false);
  const lastUpdateTime = useRef(0);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // More responsive spring configuration for smoother scrolling
  const springScroll = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 300,
    restDelta: 0.001,
  });

  // Optimized video time update with throttling
  const updateVideoTime = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !isVideoReady.current) return;

    const now = performance.now();
    // Throttle updates to 60fps max
    if (now - lastUpdateTime.current < 16) return;
    
    const targetTime = progress * video.duration;
    const currentTime = video.currentTime;
    
    // Only update if the difference is significant (reduces jitter)
    if (Math.abs(targetTime - currentTime) > 0.1) {
      video.currentTime = targetTime;
      lastUpdateTime.current = now;
    }
  }, []);

  // Update video time based on scroll with optimization
  useMotionValueEvent(springScroll, "change", updateVideoTime);

  // Handle video loading and setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      isVideoReady.current = true;
      // Set initial time
      video.currentTime = 0;
    };

    const handleLoadedMetadata = () => {
      // Ensure video is ready for seeking
      video.currentTime = 0;
    };

    const handleCanPlay = () => {
      isVideoReady.current = true;
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);

    // Force load if already loaded
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        />
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

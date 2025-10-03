/**
 * SubmitBlackHole.tsx
 * 
 * Award-winning submit animation: dramatic black-hole suck effect → grayscale video montage
 * 
 * IMPLEMENTATION APPROACH:
  * - ACTUAL page element transformation (not just overlay)
 * - Elements visually warped and pulled into center
 * - Framer Motion for orchestration and state management
 * - Canvas-free grayscale via CSS filter (better performance)
 * - Respects prefers-reduced-motion with graceful fade fallback
 * 
 * INTEGRATION:
 * Wrap your page content in a div with id="page-content"
 * <SubmitBlackHole 
 *   isActive={showBlackHole}
 *   videoAssets={['/assets/dummy-montage.mp4']}
 *   onComplete={() => { / * show confirmation * / }}
 *   onCancel={() => { / * revert to form * / }}
 * />
 * 
 * ASSET REPLACEMENT:
 * - Replace videoAssets with array of grayscale video URLs
 * - Recommended: 1920x1080 MP4 (H.264), 3-5s each, pre-graded grayscale
 * - Fallback poster: videoPoster prop (16:9, ~500KB WebP/JPEG)
 * 
 * TUNING:
 * - SUCK_DURATION: 1200ms (black-hole animation)
 * - REVEAL_DURATION: 600ms (video fade-in)
 * - VIDEO_CROSSFADE: 600ms (between clips)
 * - CLIP_DURATION: 4000ms (per video clip)
 * 
 * ACCESSIBILITY CHECKLIST:
 * ✓ Respects prefers-reduced-motion (fade instead of suck)
 * ✓ Keyboard escape handler (Esc to cancel)
 * ✓ Screen reader announcements (aria-live)
 * ✓ High contrast text overlay (WCAG AA+)
 * ✓ Focus trap prevention
 * ✓ Video autoplay with muted + playsinline
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SubmitBlackHole.css';

interface SubmitBlackHoleProps {
  isActive: boolean;
  videoAssets?: string[];
  videoPoster?: string;
  onComplete?: () => void;
  onCancel?: () => void;
  message?: string;
  pageContentSelector?: string; // CSS selector for page content to animate
}

// Animation timing constants (tune these for different feel)
const SUCK_DURATION = 800; // ms - black-hole suck animation (reduced for smoother performance)
const REVEAL_DURATION = 600; // ms - video montage reveal
const CLIP_DURATION = 4000; // ms - time per video clip
const CROSSFADE_DURATION = 600; // ms - crossfade between clips

export default function SubmitBlackHole({
  isActive,
  videoAssets = ['/assets/dummy-montage.mp4'],
  videoPoster = '/assets/dummy-poster.jpg',
  onComplete,
  onCancel,
  message = "We'll be waiting for you",
  pageContentSelector = 'body > main, body > div', // Target main content
}: SubmitBlackHoleProps) {
  const [phase, setPhase] = useState<'idle' | 'sucking' | 'montage'>('idle');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useRef(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Main animation sequence
  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      // Remove transform from page content
      if (pageContentRef.current) {
        pageContentRef.current.style.transform = '';
        pageContentRef.current.style.opacity = '';
        pageContentRef.current.style.transition = '';
        pageContentRef.current.style.willChange = '';
      }
      return;
    }

    // Find and store page content element
    const pageContent = document.querySelector(pageContentSelector) as HTMLElement;
    if (pageContent) {
      pageContentRef.current = pageContent;
    }

    // Phase 1: Black-hole suck - animate actual page content
    setPhase('sucking');
    
    if (pageContentRef.current && !prefersReducedMotion.current) {
      const element = pageContentRef.current;
      
      // Apply optimized suck transformation (reduced blur for better performance)
      element.style.transition = `transform ${SUCK_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1), 
                                   opacity ${SUCK_DURATION}ms ease-out`;
      element.style.transformOrigin = 'center center';
      element.style.willChange = 'transform, opacity'; // GPU hint
      
      // Trigger reflow
      element.offsetHeight;
      
      // Apply transformations - optimized for performance (removed blur and clip-path)
      element.style.transform = 'scale(0.01) translateZ(0) rotateZ(360deg)';
      element.style.opacity = '0';
    }
    
    const suckTimer = setTimeout(() => {
      // Phase 2: Montage reveal
      setPhase('montage');
      
      // Preload and play first video
      if (videoRefs.current[0]) {
        videoRefs.current[0].play().catch(err => {
          console.warn('Video autoplay failed:', err);
        });
      }
    }, prefersReducedMotion.current ? 200 : SUCK_DURATION);

    return () => clearTimeout(suckTimer);
  }, [isActive, pageContentSelector]);

  // Video crossfade rotation
  useEffect(() => {
    if (phase !== 'montage' || videoAssets.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => {
        const nextIndex = (prev + 1) % videoAssets.length;
        
        // Preload and play next video
        if (videoRefs.current[nextIndex]) {
          videoRefs.current[nextIndex]!.currentTime = 0;
          videoRefs.current[nextIndex]!.play().catch(console.warn);
        }
        
        return nextIndex;
      });
    }, CLIP_DURATION);

    return () => clearInterval(interval);
  }, [phase, videoAssets.length]);

  // Escape key handler
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && phase === 'montage') {
      onCancel?.();
    }
  }, [phase, onCancel]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Cleanup videos and page transforms on unmount
  useEffect(() => {
    const videos = videoRefs.current;
    const pageContent = pageContentRef.current;
    
    return () => {
      videos.forEach(video => {
        if (video) {
          video.pause();
          video.src = '';
        }
      });
      
      // Reset page content
      if (pageContent) {
        pageContent.style.transform = '';
        pageContent.style.opacity = '';
        pageContent.style.transition = '';
        pageContent.style.willChange = '';
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="submit-blackhole-root" ref={containerRef}>
      <AnimatePresence mode="wait">
        {/* Phase 1: Black-hole suck effect - background darkening */}
        {phase === 'sucking' && (
          <motion.div
            key="blackhole-suck"
            className="submit-blackhole-suck-bg"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3 }
            }}
          />
        )}

        {/* Phase 2: Video montage */}
        {phase === 'montage' && (
          <motion.div
            key="video-montage"
            className="submit-blackhole-montage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: REVEAL_DURATION / 1000,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.4 }
            }}
            role="dialog"
            aria-live="polite"
            aria-label="Registration confirmation"
          >
            {/* Video layers with crossfade */}
            <div className="submit-blackhole-video-container">
              {videoAssets.map((src, index) => (
                <motion.video
                  key={src}
                  ref={el => { if (el) videoRefs.current[index] = el; }}
                  className="submit-blackhole-video"
                  src={src}
                  poster={videoPoster}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentVideoIndex === index ? 1 : 0,
                  }}
                  transition={{ 
                    duration: CROSSFADE_DURATION / 1000,
                    ease: 'easeInOut'
                  }}
                  style={{
                    filter: 'grayscale(100%)',
                  }}
                />
              ))}
              
              {/* Subtle grain overlay */}
              <div className="submit-blackhole-grain" />
              
              {/* Vignette */}
              <div className="submit-blackhole-vignette" />
            </div>

            {/* Message overlay */}
            <motion.div
              className="submit-blackhole-message-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: REVEAL_DURATION / 1000 + 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <h1 className="submit-blackhole-message">
                {message}
              </h1>
              
              {/* Subtle decorative line */}
              <motion.div
                className="submit-blackhole-message-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: REVEAL_DURATION / 1000 + 0.6,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            </motion.div>

            {/* Close button (accessible) */}
            <motion.button
              onClick={onCancel}
              className="submit-blackhole-close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: REVEAL_DURATION / 1000 + 0.5 }}
              aria-label="Close and return to confirmation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Screen reader announcement */}
            <div className="sr-only" role="status" aria-live="polite">
              Registration submitted successfully. {message}. Press Escape to continue.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


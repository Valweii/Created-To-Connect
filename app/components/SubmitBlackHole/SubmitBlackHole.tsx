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
  onComplete?: () => void;
  onCancel?: () => void;
  message?: string;
  pageContentSelector?: string; // CSS selector for page content to animate
  duration?: number; // Duration in milliseconds for the progress bar
  waitForReady?: () => Promise<boolean>; // Optional function to wait for data to be ready
}

// Animation timing constants (tune these for different feel)
const SUCK_DURATION = 800; // ms - black-hole suck animation (reduced for smoother performance)
const REVEAL_DURATION = 600; // ms - message reveal
const MIN_DURATION = 2000; // ms - minimum duration for "We'll be waiting for you" message
const DEFAULT_DURATION = 4000; // ms - default progress bar duration

export default function SubmitBlackHole({
  isActive,
  onComplete,
  onCancel,
  message = "We'll be waiting for you",
  pageContentSelector = 'body > main, body > div', // Target main content
  duration = DEFAULT_DURATION,
  waitForReady,
}: SubmitBlackHoleProps) {
  // Ensure minimum duration of 2 seconds for "We'll be waiting for you" message
  const actualDuration = Math.max(duration, MIN_DURATION);
  const [phase, setPhase] = useState<'idle' | 'sucking' | 'waiting'>('idle');
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useRef(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const readyCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      setProgress(0);
      // Clear progress interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      // Clear ready check interval
      if (readyCheckIntervalRef.current) {
        clearInterval(readyCheckIntervalRef.current);
        readyCheckIntervalRef.current = null;
      }
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
    
    const suckTimer = setTimeout(async () => {
      // Phase 2: Waiting with progress bar
      setPhase('waiting');
      
      // Wait for data to be ready if provided
      let isReady = true;
      if (waitForReady) {
        try {
          // Wait up to 10 seconds for data to be ready
          const readyPromise = waitForReady();
          const timeoutPromise = new Promise<boolean>((resolve) => 
            setTimeout(() => resolve(false), 10000)
          );
          isReady = await Promise.race([readyPromise, timeoutPromise]);
        } catch (error) {
          // If check fails, proceed anyway
          isReady = true;
        }
      }
      
      // Start progress bar animation
      const startTime = Date.now();
      let dataReady = isReady;
      
      // If not ready yet, keep checking
      if (!isReady && waitForReady) {
        const checkReady = async () => {
          try {
            dataReady = await waitForReady();
          } catch (error) {
            dataReady = true; // Proceed on error
          }
        };
        checkReady();
        // Also check periodically
        readyCheckIntervalRef.current = setInterval(async () => {
          if (!dataReady) {
            try {
              dataReady = await waitForReady();
            } catch (error) {
              dataReady = true;
            }
          } else {
            if (readyCheckIntervalRef.current) {
              clearInterval(readyCheckIntervalRef.current);
              readyCheckIntervalRef.current = null;
            }
          }
        }, 100);
      }
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const baseProgress = Math.min((elapsed / actualDuration) * 100, 100);
        
        // If data is ready, allow progress to reach 100%
        // Otherwise, cap progress at 90% until ready
        const progressPercent = dataReady ? baseProgress : Math.min(baseProgress, 90);
        setProgress(progressPercent);
        
        // Only complete when we've reached full duration AND data is ready
        if (elapsed >= actualDuration && dataReady) {
          // Clear the intervals to prevent multiple calls
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          if (readyCheckIntervalRef.current) {
            clearInterval(readyCheckIntervalRef.current);
            readyCheckIntervalRef.current = null;
          }
          onComplete?.();
        } else if (elapsed >= actualDuration + 5000 && !dataReady) {
          // If we've waited 5 seconds past duration and still not ready, proceed anyway
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          if (readyCheckIntervalRef.current) {
            clearInterval(readyCheckIntervalRef.current);
            readyCheckIntervalRef.current = null;
          }
          onComplete?.();
        }
      };
      
      // Update progress every 16ms for smooth animation (60fps)
      progressIntervalRef.current = setInterval(updateProgress, 16);
    }, prefersReducedMotion.current ? 200 : SUCK_DURATION);

    return () => {
      clearTimeout(suckTimer);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (readyCheckIntervalRef.current) {
        clearInterval(readyCheckIntervalRef.current);
        readyCheckIntervalRef.current = null;
      }
    };
  }, [isActive, pageContentSelector, actualDuration, onComplete, waitForReady]);

  // Escape key handler
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && phase === 'waiting') {
      onCancel?.();
    }
  }, [phase, onCancel]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  // Cleanup on unmount
  useEffect(() => {
    const pageContent = pageContentRef.current;
    
    return () => {
      // Clear progress interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
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

        {/* Phase 2: Waiting with progress bar */}
        {phase === 'waiting' && (
          <motion.div
            key="waiting-screen"
            className="submit-blackhole-waiting"
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
            aria-label="Registration processing"
          >
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
              
              {/* Progress bar */}
              <div className="submit-blackhole-progress-container">
                <div className="submit-blackhole-progress-bar">
                  <motion.div
                    className="submit-blackhole-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                    style={{
                      width: `${progress}%`,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      transformOrigin: 'center'
                    }}
                  />
                </div>
                <div className="submit-blackhole-progress-text">
                  {Math.round(progress)}%
                </div>
              </div>
            </motion.div>

            {/* Screen reader announcement */}
            <div className="sr-only" role="status" aria-live="polite">
              Registration submitted successfully. {message}. Processing... {Math.round(progress)}% complete.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


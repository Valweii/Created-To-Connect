/**
 * Image Preloader Utility
 * Ensures critical images are loaded before use
 */

const loadedImages = new Map<string, boolean>();
const loadingPromises = new Map<string, Promise<HTMLImageElement>>();

/**
 * Preload an image and cache the result
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  // Return cached promise if already loading
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }

  // Return immediately if already loaded
  if (loadedImages.get(src)) {
    return Promise.resolve(new Image());
  }

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      // Even if timeout, mark as attempted
      loadedImages.set(src, true);
      resolve(img);
    }, 30000); // 30 second timeout for critical images

    img.onload = () => {
      clearTimeout(timeout);
      loadedImages.set(src, true);
      resolve(img);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      // Mark as attempted even if failed (prevents infinite retries)
      loadedImages.set(src, true);
      resolve(img);
    };

    img.src = src;
  });

  loadingPromises.set(src, promise);
  return promise;
}

/**
 * Check if an image is already loaded
 */
export function isImageLoaded(src: string): boolean {
  return loadedImages.get(src) === true;
}

/**
 * Wait for coach-photos.jpg to be loaded (critical for blackhole animation)
 */
export async function ensureCoachPhotosLoaded(): Promise<void> {
  const coachPhotosSrc = '/assets/coach-photos.jpg';
  
  // If already loaded, return immediately
  if (isImageLoaded(coachPhotosSrc)) {
    return;
  }

  // Otherwise, wait for it to load
  await preloadImage(coachPhotosSrc);
}


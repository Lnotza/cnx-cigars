'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

const GALLERY_IMAGES = [
  { src: '/Gallery/Gal1.jpg', alt: 'CNX Cigars Lounge Area 1' },
  { src: '/Gallery/Gal2.jpg', alt: 'CNX Cigars Mezzanine' },
  { src: '/Gallery/Gal3.jpg', alt: 'CNX Cigars VIP Room' },
  { src: '/Gallery/Gal4.jpg', alt: 'CNX Cigars Premium Humidor' },
  { src: '/Gallery/Gal5.jpg', alt: 'CNX Cigars Bar View' },
  { src: '/Gallery/Gal6.jpg', alt: 'CNX Cigars Cozy Corner' },
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Auto-scroll loop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const scrollSpeed = 30; // pixels per second

    const animate = (time: number) => {
      // Pause if hovered, dragging, or modal is open
      if (isHovered || isDragging || activeImage) {
        lastTime = time;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      scrollContainer.scrollLeft += scrollSpeed * delta;

      // Infinite wrapping: if reached the end, loop back smoothly
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isDragging, activeImage]);

  // Touch/Mouse dragging support for Apple-like free flick scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    container.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth',
    });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Gallery</p>
        <h2 className={styles.title}>The Space</h2>
      </div>

      <div 
        className={styles.galleryWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUpOrLeave();
        }}
      >
        {/* Navigation Arrows */}
        <button 
          className={`${styles.navBtn} ${styles.prevBtn}`} 
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div 
          className={`${styles.scrollContainer} ${isDragging ? styles.dragging : ''}`} 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
        >
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={styles.imageCard}
              onClick={() => {
                if (!isDragging) {
                  setActiveImage(img.src);
                }
              }}
            >
              <div className={styles.imageInner}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 320px, 480px"
                  className={styles.image}
                  priority={idx < 2}
                />
              </div>
              <div className={styles.cardOverlay}>
                <div className={styles.zoomButton}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className={`${styles.navBtn} ${styles.nextBtn}`} 
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          className={styles.lightbox} 
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className={styles.closeBtn} 
            onClick={() => setActiveImage(null)}
            aria-label="Close gallery lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={activeImage}
              alt="Zoomed lounge view"
              width={1600}
              height={1000}
              className={styles.zoomedImage}
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}

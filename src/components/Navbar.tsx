'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/Gallery/cnxcigarlogo.png" alt="CNX Cigars Logo" width={42} height={42} className={styles.logoImage} />
            <span>CNX <span className={styles.gold}>CIGARS</span></span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          <Link href="/#experience" onClick={() => setMenuOpen(false)}>Experience</Link>
          <Link href="/#story" onClick={() => setMenuOpen(false)}>Our Story</Link>
          <Link href="/#menu" onClick={() => setMenuOpen(false)}>Collection</Link>
          <Link href="/reservation" className={styles.ctaLink} onClick={() => setMenuOpen(false)}>Reserve a Seat</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      </nav>
    </header>
  );
}

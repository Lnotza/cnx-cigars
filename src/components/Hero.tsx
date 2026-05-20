import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgImage}>
        <Image
          src="/Gallery/Main.jpg"
          alt="CNX Cigars Lounge Interior – Chiang Mai"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={`${styles.eyebrow} animate-fade-in`}>
          Chiang Mai · Nimman · Northern Thailand
        </div>
        <h1 className={`${styles.title} animate-fade-in`} style={{ animationDelay: '0.15s' }}>
          Chiang Mai&apos;s Premier<br />International Cigar Lounge
        </h1>
        <p className={`${styles.subtitle} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
          A refined space for culture conversations and social connections
        </p>
        <div className={`${styles.mottoWrapper} animate-fade-in`} style={{ animationDelay: '0.45s' }}>
          <span className={styles.mottoText}>Sip.</span>
          <span className={styles.mottoText}>Smoke.</span>
          <span className={styles.mottoText}>Lounge.</span>
        </div>
        <div className={`${styles.ctas} animate-fade-in`} style={{ animationDelay: '0.6s' }}>
          <Link href="/reservation" className={styles.ctaPrimary}>Reserve Now</Link>
          <Link href="/#experience" className={styles.ctaSecondary}>Explore the Lounge</Link>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span />
      </div>
    </section>
  );
}

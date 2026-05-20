'use client';
import Image from 'next/image';
import styles from './Awards.module.css';

export default function Awards() {
  const handleWidgetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.nodeName.toLowerCase() !== 'a') {
      const link = (e.currentTarget as HTMLElement).querySelector<HTMLAnchorElement>('.b-gold_r-link');
      if (link) window.open(link.href);
    }
  };

  return (
    <section className={styles.section}>
      {/* Optional subtle label */}
      <p className={styles.eyebrow}>Recognition</p>

      <div className={styles.grid}>
        {/* ── AWARD 1: Habanos Point (LEFT) ── */}
        <div className={styles.awardCol}>
          <div className={styles.awardImageWrap}>
            <Image
              src="/awards/habanos-point.png"
              alt="Habanos Authorized Point of Sale"
              width={160}
              height={160}
              className={styles.awardImage}
            />
            <div className={styles.awardLabel}>
              <p className={styles.awardTitle}>Habanos Point</p>
              <p className={styles.awardYear}>Authorized Dealer</p>
            </div>
          </div>
        </div>

        {/* ── AWARD 2: Restaurant Guru 2026 (CENTER) ── */}
        <div className={styles.awardCol}>
          <link
            href="https://awards.infcdn.net/2024/r_gold.css"
            rel="stylesheet"
          />
          <div
            id="b-gold"
            className={styles.widgetWrap}
            onClick={handleWidgetClick}
            style={{ cursor: 'pointer' }}
          >
            <a
              href="https://restaurantguru.com/CNX-Cigars-International-Cigar-Bar-and-lounge-Cigars-Chiang-Mai-Co-Ltd-Chiang-Mai"
              className="b-gold_r-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNX Cigars International Cigar Bar &amp; lounge Cigars Chiang Mai Co., Ltd
            </a>
            <p className="b-gold_center">Excellent service</p>
            <a
              href="https://restaurantguru.com"
              className="b-gold__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Restaurant Guru
            </a>
            <p className="b-gold_year">2026</p>
          </div>
        </div>

        {/* ── AWARD 3: Asia Iconic Awards 2026 (RIGHT) ── */}
        <div className={styles.awardCol}>
          <div className={styles.awardImageWrap}>
            <Image
              src="/awards/asia-iconic-badge.png"
              alt="Asia Iconic Excellence & Innovation Awards 2026"
              width={160}
              height={160}
              className={styles.awardImage}
            />
            <div className={styles.awardLabel}>
              <p className={styles.awardTitle}>Asia Iconic Awards</p>
              <p className={styles.awardYear}>2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

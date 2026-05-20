'use client';
import { useState } from 'react';
import styles from './FilterableMenu.module.css';
import accessoryStyles from './AccessoriesMenu.module.css';
import accessoriesData from '../data/accessories.json';

export default function AccessoriesMenu() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="accessories" className={styles.menuSection} style={{ background: 'var(--color-dark-gray)' }}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>The Essentials</p>
          <h2 className={styles.title}>Gifts &amp; Accessories</h2>
          <p className={styles.subtitle}>
            From premium cutters and lighters to elegant humidors and ashtrays — everything to complement your cigar experience.
          </p>

          <button
            className={styles.toggleMenuBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '— Close Collection' : '+ Browse Accessories'}
          </button>
        </div>

        {isExpanded && (
          <div className={`${styles.menuContent} animate-fade-in`}>
            <div className={accessoryStyles.grid}>
              {accessoriesData.map((item, index) => (
                <div
                  key={item.id}
                  className={accessoryStyles.card}
                  style={{ animationDelay: `${(index % 12) * 0.04}s` }}
                >
                  <div className={accessoryStyles.imageContainer}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={accessoryStyles.cigarImage}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          `https://placehold.co/600x160/0a0a0a/FFD369?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  </div>
                  <div className={accessoryStyles.cardBody}>
                    <h4 className={accessoryStyles.cigarName}>{item.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

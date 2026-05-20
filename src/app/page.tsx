import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Awards from '@/components/Awards';
import FilterableMenu from '@/components/FilterableMenu';
import AccessoriesMenu from '@/components/AccessoriesMenu';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const BRANDS = [
  { name: 'Cohiba', desc: "Cuba's most iconic marque." },
  { name: 'Montecristo', desc: "The world's best-selling Cuban cigar." },
  { name: 'Romeo y Julieta', desc: 'Elegance and complexity in equal measure.' },
  { name: 'Partagas', desc: 'Bold, rich, and unapologetically full-bodied.' },
  { name: 'Bolivar', desc: 'Robust, earthy, and powerfully complex.' },
  { name: 'Davidoff', desc: 'Swiss precision meets Cuban tradition.' },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />

      {/* ── THE EXPERIENCE ── */}
      <section id="experience" className={styles.experienceSection}>
        <div className={styles.splitLeft}>
          <div className={styles.imgBlock} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src="/Gallery/wherecomfortmeetsculture.jpg" alt="CNX Cigars Lounge Interior" fill sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className={styles.splitRight}>
          <p className={styles.eyebrow}>The Experience</p>
          <h2 className={styles.sectionTitle}>Where Comfort<br />Becomes Culture</h2>
          <p className={styles.bodyText}>
            At CNX International Cigar Bar &amp; Lounge, every detail has been designed to create a refined yet welcoming escape for cigar enthusiasts and curious newcomers alike. From plush seating and elegant décor to advanced air purification and spacious mezzanine seating, our lounge offers an atmosphere where comfort and conversation take center stage.
          </p>
          <p className={styles.bodyText}>
            Whether you prefer a quiet corner to unwind or a vibrant social setting, each visit is crafted to feel personal, relaxed, and unforgettable. Our philosophy is simple: &ldquo;Come for the ambiance, stay for the conversation.&rdquo;
          </p>
          <Link href="/reservation" className={styles.sectionCta}>Join the Conversation</Link>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="story" className={styles.storySection}>
        <div className={styles.storyInner}>
          <p className={styles.eyebrow}>Our Story</p>
          <h2 className={styles.storySectionTitle}>Built on Passion.<br />Rooted in Community.</h2>
          <div className={styles.storyColumns}>
            <div style={{ gridColumn: 'span 2' }}>
              <p className={styles.bodyText}>
                CNX International Cigar Bar &amp; Lounge began with a passion for cigars and a desire to bring people together. In 2022, founder Amir Nadimi arrived in Chiang Mai searching for a community of fellow cigar enthusiasts. Recognizing the lack of dedicated spaces and gatherings for cigar culture in Northern Thailand, he began organizing events that soon grew into a thriving community. Inspired by the connections formed through these experiences, CNX Cigars officially opened its doors in May 2024, becoming Chiang Mai&apos;s premier international cigar lounge and home to one of the finest premium cigar collections in the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className={styles.communitySection}>
        <div className={styles.splitRight}>
          <p className={styles.eyebrow}>Community &amp; Culture</p>
          <h2 className={styles.sectionTitle}>More Than a Lounge.<br />A Circle.</h2>
          <p className={styles.bodyText}>
            More than a cigar lounge, CNX International Cigar Bar &amp; Lounge is a community built on camaraderie, respect, and meaningful conversation. Cigars serve as the common thread that brings together people from all walks of life, creating an environment where friendships, business connections, and unforgettable moments naturally unfold. From seasoned aficionados to first-time guests, everyone is welcomed with warmth, humility, and genuine hospitality. Through events, education, and shared experiences, we continue to cultivate a cigar culture unlike any other in Northern Thailand.
          </p>
        </div>
        <div className={styles.splitLeft}>
          <div className={styles.imgBlock} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src="/Gallery/More Than A lounge circle.jpg" alt="CNX Cigars Community Gathering" fill sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ── BAR EXPERIENCE ── */}
      <section className={styles.barSection}>
        <div className={styles.barOverlay} />
        <div className={styles.barBg}>
          <Image src="/Gallery/perfect pairing.jpg" alt="CNX Cigars Bar" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.barContent}>
          <p className={styles.eyebrowLight}>The Bar</p>
          <h2 className={styles.barTitle}>Every Cigar Deserves<br />a Perfect Pairing</h2>
          <p className={styles.barSubtitle}>
            Complementing our world-class cigar selection is a sophisticated bar experience curated for exceptional pairings. CNX International Cigar Bar &amp; Lounge proudly offers one of the region&apos;s finest collections of single malt whiskies alongside premium spirits, wines, champagne, and handcrafted cocktails. Whether enjoying an intimate evening in our VIP room or relaxing among friends in the main lounge, our knowledgeable team is dedicated to helping guests discover the perfect pairing to elevate every cigar experience.
          </p>
          <Link href="/reservation" className={styles.ctaPrimaryLight}>Join the Conversation</Link>
        </div>
      </section>

      {/* ── NO.1 STOCK IN NORTHERN THAILAND ── */}
      <section className={styles.stockSection}>
        <div className={styles.splitLeft}>
          <div className={styles.imgBlock} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src="/Gallery/Cigar.jpg" alt="CNX Premium Cigar Stock" fill sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className={styles.splitRight} style={{ background: 'var(--background)' }}>
          <p className={styles.eyebrow}>No.1 Stock</p>
          <h2 className={styles.sectionTitle}>The Largest Premium Cigar Collection<br />in Northern Thailand</h2>
          <p className={styles.bodyText}>
            With over <strong>80+ premium selections</strong> from the world&apos;s most prestigious marques, CNX Cigars is the definitive destination for cigar enthusiasts in the region.
          </p>
          <div className={styles.stockStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>80+</span>
              <span className={styles.statLabel}>Premium Selections</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>No.1</span>
              <span className={styles.statLabel}>Stock in Northern Thailand</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>🇹🇭</span>
              <span className={styles.statLabel}>Nationwide Shipping</span>
            </div>
          </div>
          <p className={styles.bodyText}>
            From Cuban legends to New World masterpieces, our curated collection spans the globe. We also offer <strong>shipping and distribution across the country</strong>, bringing the finest cigars directly to your door.
          </p>
        </div>
      </section>

      {/* ── HORECA CONSULTANCY ── */}
      <section className={styles.horecaSection}>
        <div className={styles.horecaInner}>
          <div className={styles.horecaContent}>
            <p className={styles.eyebrow}>B2B Partnerships</p>
            <h2 className={styles.sectionTitle}>HORECA Consultancy</h2>
            <p className={styles.bodyText}>
              Elevate your hospitality offering with a world-class cigar program. CNX Cigars provides tailored consultancy for hotels, restaurants, bars, and private clubs looking to introduce or enhance their cigar service.
            </p>
            <p className={styles.bodyText}>
              From curated selections and humidor setup to staff training and ongoing supply, we partner with businesses across Thailand to create unforgettable guest experiences.
            </p>
            <Link href="/contact" className={styles.sectionCta}>Get in Touch</Link>
          </div>
          <div className={styles.horecaVisual}>
            <div className={styles.horecaCard}>
              <h3>What We Offer</h3>
              <ul>
                <li>Staff training, service and presentation</li>
                <li>Cigar storage and accessory maintenance</li>
                <li>On-site presence in Chiang Mai</li>
                <li>Available for advanced booking for special events</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED BRANDS ── */}
      <section className={styles.brandsSection}>
        <div className={styles.brandsInner}>
          <h2 className={styles.brandsSectionTitle}>Our House Brands</h2>
          <div className={styles.brandsGrid}>
            {BRANDS.map(b => (
              <div key={b.name} className={styles.brandCard}>
                <h3 className={styles.brandName}>{b.name}</h3>
                <p className={styles.brandDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <FilterableMenu />

      {/* ── ACCESSORIES ── */}
      <AccessoriesMenu />

      <Awards />

      <Gallery />

      <Footer />
    </main>
  );
}

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="location">
      <div className={styles.container}>
        <div className={styles.col}>
          <h3 className={styles.brand}>CNX <span className={styles.gold}>CIGARS</span></h3>
          <p className={styles.desc}>
            The official licensed &amp; trusted distributor of premium cigar services and accessories to Northern Thailand.
          </p>
        </div>
        
        <div className={styles.col}>
          <h4 className={styles.heading}>Location</h4>
          <p className={styles.text}>
            NPARC (Upstairs)<br />
            45 Nimmanhaemin (Soi 11)<br />
            Tambon Su Thep, Mueang Chiang Mai<br />
            Chiang Mai 50200
          </p>
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.0222675400623!2d98.96427707595375!3d18.797160960665547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3b1ce8a65eb7%3A0x2348f8e88b96ea1!2sCNX%20Cigars%20%7C%20International%20Cigar%20Bar%20%26%20lounge%20%7C%20Cigars%20Chiang%20Mai%20Co.%2C%20Ltd!5e0!3m2!1sen!2sth!4v1778629732758!5m2!1sen!2sth" 
              width="100%" 
              height="200" 
              style={{ border: 0, borderRadius: '4px', marginTop: '1rem' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className={styles.col} id="contact">
          <h4 className={styles.heading}>Contact</h4>
          <p className={styles.text}>
            Whatsapp: +66 622769937<br />
            LINE ID: Bodazey<br />
            Email: cigarschiangmai@gmail.com
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} CIGARS CHIANG MAI CO., LTD. All rights reserved.</p>
        <p className={styles.warning}>ONLINE SALE OF TOBACCO IS STRICTLY PROHIBITED IN THE KINGDOM OF THAILAND INCLUDING SALES TO PERSONS UNDER 20 YEARS.</p>
      </div>
    </footer>
  );
}

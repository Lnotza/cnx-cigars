'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './reservation.module.css';

type SeatingType = 'General Seating' | 'VIP Lounge' | 'Private Event';

export default function ReservationPage() {
  const [seating, setSeating] = useState<SeatingType>('General Seating');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Controlled form states
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Retrieve environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Helper check to assist user if credentials are missing
    if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id' || templateId === 'your_template_id' || publicKey === 'your_public_key') {
      console.warn('EmailJS Credentials are missing or using template placeholders in your .env.local file.');
      setError('System configuration in progress. Please configure your EmailJS credentials in the .env.local file to activate real-time reservation requests.');
      setLoading(false);
      return;
    }

    // Comprehensive params map to ensure perfect compatibility with the user's template variables
    const templateParams = {
      // Fields requested by the user's template settings
      title: `New Reservation Request (${seating})`,
      user_name: name,
      email: email,
      user_email: email,
      user_phone: phone || 'Not provided',
      
      // Detailed reservation structure mapping
      seating_preference: seating,
      guests: guests,
      date: date,
      time: time,
      event_type: seating === 'Private Event' ? (eventType || 'Not selected') : 'N/A',
      special_requests: seating === 'Private Event' ? (specialRequests || 'None') : 'N/A',
      additional_notes: notes || 'None',
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
    } catch (err: any) {
      console.error('EmailJS Send Error:', err);
      setError(
        err?.text || 
        'Could not send reservation request. Please double-check your internet connection or reach out to us on WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Make a Reservation</p>
          <h1 className={styles.title}>Reserve Your Evening</h1>
          <p className={styles.subtitle}>
            Secure your place at Chiang Mai&apos;s most refined cigar lounge.
          </p>
        </div>

        <div className={styles.formWrap}>
          {submitted ? (
            <div className={styles.confirmation}>
              <div className={styles.confirmIcon}>✓</div>
              <h2>Reservation Received</h2>
              <p>
                Your reservation request has been received. Our team will contact
                you shortly to confirm your booking.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Seating type */}
              <div className={styles.field}>
                <label className={styles.label}>Seating Preference</label>
                <div className={styles.seatingGrid}>
                  {(['General Seating', 'VIP Lounge', 'Private Event'] as SeatingType[]).map(opt => (
                    <button
                      type="button"
                      key={opt}
                      className={`${styles.seatingBtn} ${seating === opt ? styles.seatingActive : ''}`}
                      onClick={() => setSeating(opt)}
                    >
                      <span className={styles.seatingName}>{opt}</span>
                      <span className={styles.seatingHint}>
                        {opt === 'General Seating' && 'Walk-in or advance booking'}
                        {opt === 'VIP Lounge' && 'Dedicated section, priority service'}
                        {opt === 'Private Event' && 'Exclusive hire for your event'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core fields */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Full Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    className={styles.input} 
                    placeholder="Your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="guests">Number of Guests</label>
                  <input 
                    id="guests" 
                    type="number" 
                    className={styles.input} 
                    placeholder="2" 
                    min={1} 
                    max={50} 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email Address</label>
                  <input 
                    id="email" 
                    type="email" 
                    className={styles.input} 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">Phone / WhatsApp</label>
                  <input 
                    id="phone" 
                    type="tel" 
                    className={styles.input} 
                    placeholder="+66 6X XXX XXXX" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="date">Date</label>
                  <input 
                    id="date" 
                    type="date" 
                    className={styles.input} 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required 
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="time">Preferred Time</label>
                  <input 
                    id="time" 
                    type="time" 
                    className={styles.input} 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Private Event extra fields */}
              {seating === 'Private Event' && (
                <div className={`${styles.privateFields} animate-fade-in`}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="eventType">Event Type</label>
                    <select 
                      id="eventType" 
                      className={styles.input}
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option value="">— Select type —</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Client Entertainment">Client Entertainment</option>
                      <option value="Social Gathering">Social Gathering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="specialRequests">Special Requests</label>
                    <textarea
                      id="specialRequests"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell us about your event — catering, décor, cigars selection, A/V needs…"
                      rows={4}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label} htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Any dietary requirements, accessibility needs, or preferences…"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {error && <div className={styles.errorMsg}>{error}</div>}

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={loading}
              >
                {loading ? 'Sending Request...' : 'Confirm Reservation Request'}
              </button>

              <p className={styles.disclaimer}>
                Our team will confirm your booking via email or WhatsApp within 24 hours.
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

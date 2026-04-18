import GongChaLogo from './GongChaLogo';

// Promotion ends at 11pm NZST on 19 April 2026
// NZST = UTC+12, so 11pm NZST = 11:00 UTC on the same calendar date
export const PROMO_END_UTC = new Date('2026-04-19T11:00:00Z');

export function isPromoExpired() {
  return new Date() >= PROMO_END_UTC;
}

export default function ExpiredPage() {
  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #7f1d1d 0%, #B91C1C 45%, #ef4444 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
      textAlign: 'center',
      color: 'white',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 32, opacity: 0.95 }}>
        <GongChaLogo />
      </div>

      {/* Big emoji */}
      <div style={{ fontSize: 72, marginBottom: 20, lineHeight: 1 }}>🎂</div>

      {/* Heading */}
      <h1 style={{
        margin: '0 0 16px',
        fontSize: 28,
        fontWeight: 900,
        letterSpacing: -0.5,
        textShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        Thank You, Dominion Road!
      </h1>

      {/* Sub-heading */}
      <p style={{
        margin: '0 0 28px',
        fontSize: 17,
        fontWeight: 600,
        opacity: 0.92,
      }}>
        Our 3rd Anniversary promotion has now ended.
      </p>

      {/* Description */}
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        borderRadius: 20,
        padding: '24px 28px',
        maxWidth: 420,
        width: '100%',
        marginBottom: 36,
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}>
        <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.7, opacity: 0.95 }}>
          Thank you to every customer who celebrated with us during our <strong>Buy 1, Get 2nd Drink for $1</strong> anniversary promotion.
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, opacity: 0.82 }}>
          This tool was active only during the promotional period at <strong>Gong cha Dominion Road</strong>. We hope to see you again soon! ☕
        </p>
      </div>

      {/* Visit us */}
      <div style={{
        fontSize: 13,
        opacity: 0.75,
        lineHeight: 1.8,
      }}>
        <div>📍 Gong cha Dominion Road, Auckland</div>
        <div style={{ marginTop: 4 }}>Visit us in store for our regular menu &amp; special offers.</div>
      </div>
    </div>
  );
}

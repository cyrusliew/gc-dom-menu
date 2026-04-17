import { useState, useEffect } from "react";

export default function AgreementModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const agreed = localStorage.getItem("gc_agreed");
      if (!agreed) {
        setShow(true);
      }
    } catch (e) {
      // In case localStorage is disabled
      setShow(true);
    }
  }, []);

  const handleAgree = () => {
    try {
      localStorage.setItem("gc_agreed", "true");
    } catch (e) {
      // Ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 24,
      backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: "28px 24px",
        maxWidth: 400,
        width: "100%",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>⚠️</div>
        <h3 style={{ margin: "0 0 12px", fontSize: 20, color: "#111", fontWeight: 800 }}>
          Important Note on Pricing
        </h3>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "#555", lineHeight: 1.6, textAlign: "left" }}>
          Please note: Online prices are estimates only. Actual totals may vary on our POS system. Gong cha Dominion maintains final authority on all pricing.
        </p>
        <button
          onClick={handleAgree}
          style={{
            width: "100%",
            background: "#B91C1C",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "14px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(185,28,28,0.3)"
          }}
        >
          I Agree
        </button>
      </div>
    </div>
  );
}

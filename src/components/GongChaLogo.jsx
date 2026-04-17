import React from "react";

const GongChaLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{
      width: 36, height: 44, background: "#B91C1C", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, boxShadow: "0 2px 8px rgba(185,28,28,0.4)"
    }}>
      <span style={{ color: "white", fontSize: 18, fontWeight: 500, lineHeight: 1, letterSpacing: -1 }}>貢茶</span>
    </div>
    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}>Gong cha (Dominion)</span>
  </div>
);

export default GongChaLogo;

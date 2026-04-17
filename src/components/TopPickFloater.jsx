import React, { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { CATEGORIES, SERIES_EMOJI } from "../menuData";

const TopPickFloater = ({ onSelect, onShowAll }) => {
  const [randomDrink, setRandomDrink] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const bsCat = CATEGORIES.find(c => c.id === "Best Sellers");
    const picks = bsCat?.drinks || [];
    if (picks.length) setRandomDrink(picks[Math.floor(Math.random() * picks.length)]);
  }, []);

  if (!randomDrink) return null;

  return (
    <>
      {/* Floater button */}
      <button
        onClick={() => setExpanded(true)}
        style={{
          position: "fixed", bottom: 90, right: 16, zIndex: 400,
          background: "#B91C1C", color: "white", border: "none",
          borderRadius: "50%", width: 56, height: 56, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(185,28,28,0.45)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          animation: "pulse 2s infinite",
        }}
      >
        <style>{`@keyframes pulse { 0%,100%{box-shadow:0 4px 16px rgba(185,28,28,0.45)} 50%{box-shadow:0 4px 24px rgba(185,28,28,0.7)} }`}</style>
        <Star size={22} fill="white" />
        <span style={{ fontSize: 8, fontWeight: 700, lineHeight: 1, marginTop: 1 }}>BEST SELLER</span>
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }} onClick={e => e.target === e.currentTarget && setExpanded(false)}>
          <div style={{
            background: "white", borderRadius: 24, padding: 24, maxWidth: 340, width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Star size={20} fill="#B91C1C" color="#B91C1C" />
                <span style={{ fontWeight: 800, fontSize: 16, color: "#1a1a1a" }}>Staff Pick</span>
              </div>
              <button onClick={() => setExpanded(false)} style={{ background: "#f5f5f5", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ background: "#fef3f3", borderRadius: 16, padding: 20, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{SERIES_EMOJI[randomDrink.series] || "🧋"}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1a1a1a", margin: "0 0 4px" }}>{randomDrink.name}</h3>
              <p style={{ color: "#888", fontSize: 12, margin: "0 0 8px" }}>{randomDrink.series}</p>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#B91C1C" }}>${randomDrink.regularPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button
                onClick={() => { onSelect(randomDrink); setExpanded(false); }}
                style={{ background: "#B91C1C", color: "white", border: "none", borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Customise
              </button>
              <button
                onClick={() => { onShowAll(); setExpanded(false); }}
                style={{ background: "#f5f5f5", color: "#333", border: "none", borderRadius: 12, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                See All Best Sellers
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopPickFloater;

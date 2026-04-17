import React from "react";
import { BEST_SELLERS_NAMES, SERIES_EMOJI } from "../menuData";

const DrinkCard = ({ drink, onSelect }) => {
  const isBestSeller = BEST_SELLERS_NAMES.some(bs =>
    drink.name.toLowerCase() === bs.toLowerCase()
  );

  return (
    <button
      onClick={() => onSelect(drink)}
      style={{
        background: "white",
        border: "1.5px solid #f0e8e8",
        borderRadius: 16,
        padding: "14px 14px 12px",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        width: "100%",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(185,28,28,0.15)"; e.currentTarget.style.borderColor = "#B91C1C"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#f0e8e8"; }}
    >
      {isBestSeller && (
        <div style={{ position: "absolute", top: 0, right: 0, background: "#B91C1C", color: "white", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: "0 16px 0 10px", letterSpacing: 0.5 }}>
          BEST SELLER
        </div>
      )}
      <div style={{ fontSize: 28, marginBottom: 6 }}>{SERIES_EMOJI[drink.series] || "🧋"}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 4, paddingRight: isBestSeller ? 40 : 0 }}>
        {drink.name}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#B91C1C" }}>${drink.regularPrice.toFixed(2)}</span>
        {drink.largePrice && <span style={{ fontSize: 11, color: "#999" }}>/ ${drink.largePrice.toFixed(2)}</span>}
      </div>
      {(drink.hasSugar || drink.hasIce || drink.hasHot) && (
        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
          {drink.hasSugar && <span style={{ fontSize: 9, background: "#fef3f3", color: "#B91C1C", padding: "2px 6px", borderRadius: 20, fontWeight: 600 }}>Sugar ✓</span>}
          {drink.hasIce && <span style={{ fontSize: 9, background: "#eff6ff", color: "#3b82f6", padding: "2px 6px", borderRadius: 20, fontWeight: 600 }}>Ice ✓</span>}
          {drink.hasHot && <span style={{ fontSize: 9, background: "#fff7ed", color: "#ea580c", padding: "2px 6px", borderRadius: 20, fontWeight: 600 }}>Hot ✓</span>}
        </div>
      )}
    </button>
  );
};

export default DrinkCard;

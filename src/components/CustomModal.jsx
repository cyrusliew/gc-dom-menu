import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { TOPPINGS, SERIES_EMOJI, FEATURE_HIDE_TOTAL_PRICE } from "../menuData";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

const Pill = ({ selected, onClick, label, small }) => (
  <button
    onClick={onClick}
    style={{
      border: selected ? "2px solid #B91C1C" : "1.5px solid #e5e7eb",
      borderRadius: 10, padding: small ? "7px 12px" : "11px 14px",
      cursor: "pointer", fontSize: small ? 12 : 13, fontWeight: 600,
      background: selected ? "#fef3f3" : "white", color: selected ? "#B91C1C" : "#555",
      transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6,
    }}
  >
    {selected && <Check size={12} />}
    {label}
  </button>
);

const CustomModal = ({ drink, initialItem, onClose, onAdd }) => {
  const [size, setSize] = useState(initialItem?.size || "Regular");
  const [sugar, setSugar] = useState(initialItem ? initialItem.sugar : (drink.hasSugar ? "100%" : null));
  const [ice, setIce] = useState(initialItem ? initialItem.ice : (drink.hasIce ? "Standard" : null));
  const [temp, setTemp] = useState(initialItem ? initialItem.temp : (drink.hasIce ? "Iced" : drink.hasHot ? "Hot" : "Iced"));
  const [selectedToppings, setSelectedToppings] = useState(initialItem?.toppings || []);

  const toggleTopping = (topping) => {
    setSelectedToppings(prev => {
      const isSelected = prev.find(t => t.name === topping.name);
      if (isSelected) {
        return prev.filter(t => t.name !== topping.name);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, topping];
      }
    });
  };

  const basePrice = size === "Large" ? (drink.largePrice || drink.regularPrice + 1) : drink.regularPrice;
  const toppingCost = selectedToppings.reduce((s, t) => s + t.price, 0);
  const estimatedTotal = basePrice + toppingCost;

  const handleAdd = () => {
    onAdd({
      drink,
      size,
      sugar: temp === "Hot" ? null : sugar,
      ice: temp === "Hot" ? null : ice,
      temp,
      toppings: selectedToppings,
      id: initialItem?.id || (Date.now() + Math.random()),
    });
    onClose();
  };

  const sugarOptions = ["0% No Sugar", "30% Little Sugar", "50% Half Sugar", "70% Less Sugar", "100% Standard Sugar", "130% Extra Sugar"];
  const iceOptions = ["0% No Ice", "30% Little Ice", "70% Less Ice", "100% Standard", "130% Extra Ice"];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "white", borderRadius: "24px 24px 0 0",
        width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
        padding: "24px 20px 32px",
        animation: "slideUp 0.3s ease",
      }}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 22, marginBottom: 2 }}>{SERIES_EMOJI[drink.series] || "🧋"}</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", margin: 0, lineHeight: 1.2 }}>{drink.name}</h2>
            <p style={{ color: "#888", fontSize: 13, margin: "4px 0 0" }}>{drink.series}</p>
          </div>
          <button onClick={onClose} style={{ background: "#f5f5f5", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>

        {/* Size */}
        {drink.series !== "Waffle Series" && (
          <Section title="Size">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Regular", ...(drink.largePrice ? ["Large"] : [])].map(s => (
                <Pill key={s} selected={size === s} onClick={() => setSize(s)}
                  label={s === "Regular" ? `Regular — $${drink.regularPrice.toFixed(2)}` : `Large — $${drink.largePrice?.toFixed(2)}`}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Temperature */}
        {(drink.hasIce || drink.hasHot) && (
          <Section title="Temperature">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {drink.hasIce && <Pill selected={temp === "Iced"} onClick={() => setTemp("Iced")} label="🧊 Iced" />}
              {drink.hasHot && <Pill selected={temp === "Hot"} onClick={() => setTemp("Hot")} label="🔥 Hot" />}
            </div>
          </Section>
        )}

        {/* Sugar */}
        {drink.hasSugar && temp !== "Hot" && (
          <Section title="Sugar Level">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {sugarOptions.map(s => (
                <Pill key={s} selected={sugar === s} onClick={() => setSugar(s)} label={s} small />
              ))}
            </div>
          </Section>
        )}

        {/* Ice */}
        {drink.hasIce && temp !== "Hot" && (
          <Section title="Ice Level">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {iceOptions.map(i => (
                <Pill key={i} selected={ice === i} onClick={() => setIce(i)} label={i} small />
              ))}
            </div>
          </Section>
        )}

        {/* Toppings */}
        {drink.series !== "Waffle Series" && (
          <Section title="Add Toppings (+$1.00–$1.30 each)">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              {TOPPINGS.map(t => {
                const isSelected = !!selectedToppings.find(s => s.name === t.name);
                const isDisabled = !isSelected && selectedToppings.length >= 3;
                return (
                <button
                  key={t.name}
                  onClick={() => toggleTopping(t)}
                  disabled={isDisabled}
                  style={{
                    border: isSelected ? "2px solid #B91C1C" : "1.5px solid #e5e7eb",
                    borderRadius: 10, padding: "9px 10px", 
                    cursor: isDisabled ? "not-allowed" : "pointer", 
                    textAlign: "left",
                    background: isSelected ? "#fef3f3" : (isDisabled ? "#f9fafb" : "white"),
                    opacity: isDisabled ? 0.5 : 1,
                    transition: "all 0.15s",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: isDisabled ? "#9ca3af" : "#333" }}>{t.name}</span>
                  <span style={{ fontSize: 11, color: isDisabled ? "#9ca3af" : "#B91C1C", fontWeight: 700 }}>+${t.price.toFixed(2)}</span>
                </button>
              )})}
            </div>
          </Section>
        )}

        {/* Price Summary */}
        {!FEATURE_HIDE_TOTAL_PRICE && (
          <div style={{ background: "#fef9f9", borderRadius: 14, padding: "12px 16px", marginBottom: 16, border: "1px solid #fde8e8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 4 }}>
              <span>Base {drink.series !== "Waffle Series" && `(${size})`}</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {selectedToppings.map(t => (
              <div key={t.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 4 }}>
                <span>+ {t.name}</span>
                <span>+${t.price.toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, color: "#B91C1C", borderTop: "1px solid #fde8e8", paddingTop: 8, marginTop: 4 }}>
              <span>Estimated Total</span>
              <span>${estimatedTotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: 10, color: "#999", margin: "6px 0 0", textAlign: "center" }}>
              * Anniversary discount applied at checkout based on order total
            </p>
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={handleAdd}
          style={{
            width: "100%", background: "#B91C1C", color: "white", border: "none",
            borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 800,
            cursor: "pointer", letterSpacing: 0.5,
            boxShadow: "0 4px 16px rgba(185,28,28,0.35)",
          }}
        >
          {initialItem ? "Update Order" : "Add to Order"}
        </button>
      </div>
    </div>
  );
};

export default CustomModal;

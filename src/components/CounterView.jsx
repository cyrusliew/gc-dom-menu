import React from "react";
import { X } from "lucide-react";
import { FEATURE_HIDE_TOTAL_PRICE } from "../menuData";

const DetailRow = ({ icon, label, value, red }) => (
  <div style={{ display: "flex", gap: 8, fontSize: 13, color: red ? "#B91C1C" : "#555" }}>
    <span style={{ width: 16, textAlign: "center" }}>{icon}</span>
    <span style={{ color: "#999", minWidth: 60 }}>{label}</span>
    <span style={{ fontWeight: red ? 700 : 500 }}>{value}</span>
  </div>
);

const CounterView = ({ cartItems, itemTotals, total, savings, discountedCount, onClose }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "#fff", overflowY: "auto" }}>
    {/* Header */}
    <div style={{ background: "#B91C1C", padding: "20px 20px 16px", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h1 style={{ color: "white", margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: 0.5 }}>Order Summary</h1>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={18} color="white" />
        </button>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {!FEATURE_HIDE_TOTAL_PRICE && (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 14px", color: "white" }}>
            <span style={{ fontSize: 11, opacity: 0.8 }}>Total </span>
            <span style={{ fontWeight: 900, fontSize: 16 }}>${total.toFixed(2)}</span>
          </div>
        )}
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 14px", color: "white" }}>
          <span style={{ fontSize: 11, opacity: 0.8 }}>Items </span>
          <span style={{ fontWeight: 900, fontSize: 16 }}>{cartItems.length}</span>
        </div>
        {savings > 0 && (
          <div style={{ background: "#fbbf24", borderRadius: 10, padding: "6px 14px", color: "#1a1a1a" }}>
            <span style={{ fontSize: 11 }}>Saved </span>
            <span style={{ fontWeight: 900, fontSize: 16 }}>${savings.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>

    <div style={{ padding: "16px 20px 100px" }}>
      {/* Anniversary promo badge */}
      {discountedCount > 0 && (
        <div style={{ background: "linear-gradient(135deg, #B91C1C, #991b1b)", borderRadius: 14, padding: "14px 18px", marginBottom: 20, color: "white" }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>🎉 3rd Anniversary Promo Applied!</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>{discountedCount} item{discountedCount > 1 ? "s" : ""} at $1.00 • You saved ${savings.toFixed(2)}</div>
        </div>
      )}

      {/* Drink list */}
      {cartItems.map((item, idx) => {
        const totInfo = itemTotals[idx];
        return (
          <div key={item.id} style={{
            border: totInfo.isDiscounted ? "2px solid #B91C1C" : "1.5px solid #e5e7eb",
            borderRadius: 16, padding: "16px", marginBottom: 12,
            background: totInfo.isDiscounted ? "#fef9f9" : "white",
          }}>
            {/* Drink name row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>{item.drink.name}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>{item.temp === "Hot" ? "Hot" : item.size}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                {totInfo.isDiscounted && (
                  <div style={{ fontSize: 13, color: "#999", textDecoration: "line-through", marginBottom: -2 }}>
                    ${(item.drink.regularPrice + totInfo.upsize + totInfo.toppingCost).toFixed(2)}
                  </div>
                )}
                {!FEATURE_HIDE_TOTAL_PRICE && (
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#B91C1C" }}>${totInfo.itemTotal.toFixed(2)}</div>
                )}
                {totInfo.isDiscounted && <div style={{ fontSize: 10, color: "#B91C1C", fontWeight: 700 }}>PROMO APPLIED</div>}
              </div>
            </div>

            {/* Details */}
            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
              {item.cube && <DetailRow icon="🟣" label="Taro Cube" value={item.cube === "Cube" ? "Taro Cube" : "No Cube"} />}
              {item.sugar && <DetailRow icon="🍬" label="Sugar" value={item.sugar} />}
              {item.ice && <DetailRow icon="🧊" label="Ice" value={item.ice} />}
              {item.size === "Large" && <DetailRow icon="⬆️" label="Upsize" value="+$1.00" />}
              {totInfo.isDiscounted && <DetailRow icon="🎉" label="Discount" value={`Base $1.00 (-$${(item.drink.regularPrice - 1).toFixed(2)})`} red />}
              {item.toppings.map(t => (
                <DetailRow key={t.name} icon="➕" label="Topping" value={`${t.name} (+$${t.price.toFixed(2)})`} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Final total */}
      <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "18px 20px", color: "white" }}>
        {savings > 0 && !FEATURE_HIDE_TOTAL_PRICE && (
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#fbbf24", marginBottom: 6 }}>
            <span>🎉 Anniversary Savings</span>
            <span>-${savings.toFixed(2)}</span>
          </div>
        )}
        {!FEATURE_HIDE_TOTAL_PRICE ? (
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 900 }}>
            <span>TOTAL</span>
            <span style={{ color: "#fbbf24" }}>${total.toFixed(2)}</span>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 900 }}>
            <span>TOTAL SAVINGS</span>
            <span style={{ color: "#fbbf24" }}>${savings.toFixed(2)}</span>
          </div>
        )}
        <div style={{ fontSize: 11, color: "#888", marginTop: 4, textAlign: "center" }}>Show this screen to the barista</div>
        <div style={{ fontSize: 10, color: "#777", marginTop: 12, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10, lineHeight: 1.4 }}>
          * Please refer to the final price from the POS system for best final price accuracy.
        </div>
      </div>
    </div>
  </div>
);

export default CounterView;

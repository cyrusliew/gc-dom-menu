import React, { useState } from "react";
import { X, Trash2, Eye, Pencil } from "lucide-react";
import { FEATURE_HIDE_TOTAL_PRICE } from "../menuData";

const CartSidebar = ({ cartItems, itemTotals, total, savings, discountedCount, onRemove, onEdit, onShowCounter, onStartOver, onClose }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 800 }} onClick={e => e.target === e.currentTarget && onClose()}>
    <style>{`
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0.6; }
        to   { transform: translateX(0);    opacity: 1; }
      }
      @keyframes fadeInOverlay {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    `}</style>
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", animation: "fadeInOverlay 0.25s ease" }} onClick={onClose} />
    <div style={{
      position: "absolute", right: 0, top: 0, bottom: 0, width: "min(100%, 380px)",
      background: "white", overflowY: "auto", padding: "20px",
      boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
      animation: "slideInRight 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Your Order ({cartItems.length})</h2>
        <button onClick={onClose} style={{ background: "#f5f5f5", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={16} />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#999" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧋</div>
          <div style={{ fontWeight: 600 }}>Your order is empty</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Add some drinks to get started</div>
        </div>
      ) : (
        <>
          {discountedCount > 0 && (
            <div style={{ background: "#fef3f3", border: "1px solid #fde8e8", borderRadius: 12, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#B91C1C", fontWeight: 600 }}>
              🎉 {discountedCount} drink{discountedCount > 1 ? "s" : ""} at $1.00 · Save ${savings.toFixed(2)}!
            </div>
          )}

          {cartItems.map((item, idx) => {
            const info = itemTotals[idx];
            return (
              <div key={item.id} style={{
                border: info.isDiscounted ? "1.5px solid #B91C1C" : "1px solid #e5e7eb",
                borderRadius: 12, padding: 12, marginBottom: 10,
                background: info.isDiscounted ? "#fef9f9" : "white",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{item.drink.name}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                      {item.size}
                      {item.temp === "Hot" ? " · Hot" : ""}
                      {item.sugar ? ` · ${item.sugar}` : ""}
                      {item.ice ? ` · ${item.ice}` : ""}
                    </div>
                    {item.toppings.length > 0 && (
                      <div style={{ fontSize: 11, color: "#B91C1C", marginTop: 2 }}>
                        + {item.toppings.map(t => t.name).join(", ")}
                      </div>
                    )}
                    {info.isDiscounted && (
                      <span style={{ display: "inline-block", background: "#B91C1C", color: "white", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, marginTop: 4 }}>
                        PROMO: $1 BASE (-${(item.drink.regularPrice - 1).toFixed(2)})
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginLeft: 8 }}>
                    {info.isDiscounted && (
                      <span style={{ fontSize: 12, color: "#999", textDecoration: "line-through", marginBottom: -6 }}>
                        ${(item.drink.regularPrice + info.upsize + info.toppingCost).toFixed(2)}
                      </span>
                    )}
                    {!FEATURE_HIDE_TOTAL_PRICE && (
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#B91C1C" }}>${info.itemTotal.toFixed(2)}</span>
                    )}
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => onEdit(item)}
                        style={{ background: "#f3f4f6", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Pencil size={12} color="#4b5563" />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        style={{ background: "#fee2e2", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Trash2 size={12} color="#B91C1C" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          <div style={{ borderTop: "2px solid #f5f5f5", paddingTop: 16, marginTop: 8 }}>
            {savings > 0 && !FEATURE_HIDE_TOTAL_PRICE && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#B91C1C", marginBottom: 6, fontWeight: 600 }}>
                <span>Anniversary Savings</span>
                <span>-${savings.toFixed(2)}</span>
              </div>
            )}
            {!FEATURE_HIDE_TOTAL_PRICE ? (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 900, color: "#1a1a1a", marginBottom: 16 }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 900, color: "#1a1a1a", marginBottom: 16 }}>
                <span>Total Savings</span>
                <span style={{ color: "#B91C1C" }}>${savings.toFixed(2)}</span>
              </div>
            )}
            <button
              onClick={() => setShowConfirm(true)}
              style={{
                width: "100%", background: "#f5f5f5", color: "#666", border: "none",
                borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginBottom: 10,
              }}
            >
              <Trash2 size={18} />
              Start Over
            </button>
            <button
              onClick={onShowCounter}
              style={{
                width: "100%", background: "#B91C1C", color: "white", border: "none",
                borderRadius: 14, padding: "16px", fontSize: 15, fontWeight: 800,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <Eye size={18} />
              Show to Counter
            </button>
            <div style={{ fontSize: 11, color: "#888", textAlign: "center", marginTop: 12, lineHeight: 1.4, padding: "0 10px" }}>
              * Please refer to the final price from the POS system for best final price accuracy.
            </div>
          </div>
        </>
      )}
      {showConfirm && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 10,
          textAlign: "center"
        }}>
          <div style={{ background: "white", padding: 24, borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.1)", width: "100%", border: "1px solid #f0f0f0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 800 }}>Start Over?</h3>
            <p style={{ margin: "0 0 20px 0", color: "#666", fontSize: 14 }}>This will remove all items from your order.<br/>Are you sure?</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: "12px", background: "#f5f5f5", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", color: "#333", fontSize: 14 }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowConfirm(false); onStartOver(); }}
                style={{ flex: 1, padding: "12px", background: "#B91C1C", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", color: "white", fontSize: 14 }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default CartSidebar;

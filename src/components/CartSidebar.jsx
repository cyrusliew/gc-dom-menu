import React from "react";
import { X, Trash2, Eye } from "lucide-react";

const CartSidebar = ({ cartItems, itemTotals, total, savings, discountedCount, onRemove, onShowCounter, onClose }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 800 }} onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={onClose} />
    <div style={{
      position: "absolute", right: 0, top: 0, bottom: 0, width: "min(100%, 380px)",
      background: "white", overflowY: "auto", padding: "20px",
      boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
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
                      {item.sugar ? ` · ${item.sugar}` : ""}
                      {item.ice ? ` · ${item.ice}` : ""}
                      {item.temp === "Hot" ? " · Hot" : ""}
                    </div>
                    {item.toppings.length > 0 && (
                      <div style={{ fontSize: 11, color: "#B91C1C", marginTop: 2 }}>
                        + {item.toppings.map(t => t.name).join(", ")}
                      </div>
                    )}
                    {info.isDiscounted && (
                      <span style={{ display: "inline-block", background: "#B91C1C", color: "white", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20, marginTop: 4 }}>
                        PROMO: $1 BASE
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginLeft: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#B91C1C" }}>${info.itemTotal.toFixed(2)}</span>
                    <button
                      onClick={() => onRemove(item.id)}
                      style={{ background: "#fee2e2", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Trash2 size={12} color="#B91C1C" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Summary */}
          <div style={{ borderTop: "2px solid #f5f5f5", paddingTop: 16, marginTop: 8 }}>
            {savings > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#B91C1C", marginBottom: 6, fontWeight: 600 }}>
                <span>Anniversary Savings</span>
                <span>-${savings.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 900, color: "#1a1a1a", marginBottom: 16 }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
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
          </div>
        </>
      )}
    </div>
  </div>
);

export default CartSidebar;

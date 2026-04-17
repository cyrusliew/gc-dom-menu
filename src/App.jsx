import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ShoppingCart,  Eye } from "lucide-react";

import {  CATEGORIES, calcCartTotals, SERIES_EMOJI, FEATURE_HIDE_TOTAL_PRICE } from "./menuData";

import GongChaLogo from './components/GongChaLogo';
import DrinkCard from './components/DrinkCard';
import CustomModal from './components/CustomModal';
import TopPickFloater from './components/TopPickFloater';
import CounterView from './components/CounterView';
import CartSidebar from './components/CartSidebar';

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("gc_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("gc_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Best Sellers");
  const [showCart, setShowCart] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categoryRefs = useRef({});

  const { total, savings, discountedCount, itemTotals } = useMemo(() => calcCartTotals(cartItems), [cartItems]);

  const addToCart = useCallback((item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? item : i);
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const scrollToCategory = (catId) => {
    setActiveCategory(catId);
    const el = categoryRefs.current[catId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Filter drinks by search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const q = searchQuery.toLowerCase();
    return CATEGORIES.map(cat => ({
      ...cat,
      drinks: cat.drinks.filter(d => d.name.toLowerCase().includes(q) || d.series.toLowerCase().includes(q)),
    })).filter(cat => cat.drinks.length > 0);
  }, [searchQuery]);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#fafafa", minHeight: "100vh", maxWidth: 600, margin: "0 auto", position: "relative" }}>

      {/* ── STICKY HEADER ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 300, background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        {/* Top bar */}
        <div style={{ background: "#B91C1C", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <GongChaLogo />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {discountedCount > 0 && (
              <div style={{ background: "#fbbf24", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#1a1a1a" }}>
                🎉 {discountedCount} @ $1
              </div>
            )}
            <button
              onClick={() => setShowCart(true)}
              style={{
                background: cartItems.length > 0 ? "white" : "rgba(255,255,255,0.2)",
                border: "none", borderRadius: 20, padding: "6px 14px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                color: cartItems.length > 0 ? "#B91C1C" : "white", fontWeight: 700, fontSize: 14,
              }}
            >
              <ShoppingCart size={16} />
              {cartItems.length > 0 ? (
                FEATURE_HIDE_TOTAL_PRICE ? (
                  <><span>{cartItems.length}</span>{savings > 0 && <><span>·</span><span>Save ${savings.toFixed(2)}</span></>}</>
                ) : (
                  <><span>{cartItems.length}</span><span>·</span><span>${total.toFixed(2)}</span></>
                )
              ) : "Cart"}
            </button>
          </div>
        </div>

        {/* Anniversary banner */}
        <div style={{ background: "linear-gradient(90deg, #7f1d1d, #B91C1C, #7f1d1d)", color: "white", textAlign: "center", padding: "7px 16px", fontSize: 12, fontWeight: 600, letterSpacing: 0.3 }}>
          🎂 Dominion Road 3rd Anniversary — Buy 1, Get 2nd Drink for $1!
        </div>

        {/* Search */}
        <div style={{ padding: "10px 16px 0" }}>
          <input
            placeholder="Search drinks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 12,
              padding: "10px 14px", fontSize: 14, outline: "none", background: "#f9fafb",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Category tabs */}
        {!searchQuery && (
          <div style={{ display: "flex", gap: 0, overflowX: "auto", padding: "8px 16px 0", scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                style={{
                  border: "none", background: "none", padding: "6px 14px 10px",
                  cursor: "pointer", whiteSpace: "nowrap", fontSize: 13, fontWeight: 600,
                  color: activeCategory === cat.id ? "#B91C1C" : "#888",
                  borderBottom: activeCategory === cat.id ? "2px solid #B91C1C" : "2px solid transparent",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                {SERIES_EMOJI[cat.id] || "🧋"} {cat.label.replace("⭐ ", "").replace("🌸 ", "")}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ padding: "16px 16px 100px" }}>
        {filteredCategories.map(cat => (
          <div
            key={cat.id}
            ref={el => categoryRefs.current[cat.id] = el}
            style={{ marginBottom: 28, scrollMarginTop: 180 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>{SERIES_EMOJI[cat.id] || "🧋"}</span>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1a1a1a" }}>{cat.label}</h2>
              <span style={{ fontSize: 12, color: "#999", fontWeight: 500 }}>({cat.drinks.length})</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {cat.drinks.map(drink => (
                <DrinkCard key={drink.name + drink.series} drink={drink} onSelect={setSelectedDrink} />
              ))}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#999" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>No drinks found</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try a different search term</div>
          </div>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      {cartItems.length > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 600, zIndex: 200,
          background: "white", borderTop: "1px solid #e5e7eb",
          padding: "12px 16px 20px",
          display: "flex", gap: 10,
        }}>
          <button
            onClick={() => setShowCart(true)}
            style={{
              flex: 1, background: "#f5f5f5", color: "#333", border: "none",
              borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <ShoppingCart size={16} />
            {cartItems.length} drink{cartItems.length !== 1 ? "s" : ""}
            {FEATURE_HIDE_TOTAL_PRICE ? (savings > 0 ? ` · Save $${savings.toFixed(2)}` : "") : ` · $${total.toFixed(2)}`}
          </button>
          <button
            onClick={() => setShowCounter(true)}
            style={{
              flex: 1, background: "#B91C1C", color: "white", border: "none",
              borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              boxShadow: "0 4px 14px rgba(185,28,28,0.35)",
            }}
          >
            <Eye size={16} />
            Show to Counter
          </button>
        </div>
      )}

      {/* ── FLOATER ── */}
      <TopPickFloater
        onSelect={setSelectedDrink}
        onShowAll={() => scrollToCategory("Best Sellers")}
      />

      {/* ── MODALS ── */}
      {(selectedDrink || editingItem) && (
        <CustomModal
          drink={selectedDrink || editingItem.drink}
          initialItem={editingItem}
          onClose={() => { setSelectedDrink(null); setEditingItem(null); }}
          onAdd={addToCart}
        />
      )}

      {showCart && (
        <CartSidebar
          cartItems={cartItems}
          itemTotals={itemTotals}
          total={total}
          savings={savings}
          discountedCount={discountedCount}
          onRemove={removeFromCart}
          onEdit={(item) => { setEditingItem(item); setShowCart(false); }}
          onShowCounter={() => { setShowCart(false); setShowCounter(true); }}
          onStartOver={() => { setCartItems([]); setShowCart(false); }}
          onClose={() => setShowCart(false)}
        />
      )}

      {showCounter && (
        <CounterView
          cartItems={cartItems}
          itemTotals={itemTotals}
          total={total}
          savings={savings}
          discountedCount={discountedCount}
          onClose={() => setShowCounter(false)}
        />
      )}
    </div>
  );
}

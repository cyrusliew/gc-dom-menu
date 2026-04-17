import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ShoppingCart, X, ChevronRight, Star, Sparkles, ChevronDown, Check, Trash2, Eye, RotateCcw, Tag, Coffee, Leaf, Zap, Droplets, IceCream, AlertCircle } from "lucide-react";

// ─── RAW DATA ────────────────────────────────────────────────────────────────
const TOPPINGS = [
  { name: "Aiyu Jelly", price: 1.00 },
  { name: "Herbal Jelly", price: 1.00 },
  { name: "Pudding Jelly", price: 1.00 },
  { name: "Pearl", price: 1.00 },
  { name: "Coconut Jelly", price: 1.00 },
  { name: "Milk Foam", price: 1.00 },
  { name: "Oreo", price: 1.00 },
  { name: "White Pearl", price: 1.30 },
  { name: "Azuki (Red Bean)", price: 1.30 },
  { name: "Aloe Vera", price: 1.30 },
  { name: "Mango Pearl", price: 1.30 },
  { name: "Lychee Pearl", price: 1.30 },
];

const BEST_SELLERS_NAMES = [
  "Pearl Milk Tea",
  "QQ Passionfruit Green Tea",
  "Dirtea Fresh Milk",
  "Peach Green Tea",
  "White Pearl Ai-Yu Special",
  "Fresh Milk Black Tea",
  "Taro Milk Drink",
  "Mango Yogurt Drink",
  "Japanese Matcha Milk Drink",
  "Earl Grey Milk Tea w 3J",
];

const SEASONAL_SERIES = ["Thai Mango Series", "Greek yogurt Series"];

// Parse the raw JSON into canonical drink objects (Regular size as base)
const RAW_MENU = [
  // Brewed Tea Series
  { series: "Brewed Tea Series", name: "Black Tea", regularPrice: 6.80, largePrice: 7.80, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Brewed Tea Series", name: "Green Tea", regularPrice: 6.80, largePrice: 7.80, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Brewed Tea Series", name: "Oolong Tea", regularPrice: 6.80, largePrice: 7.80, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Brewed Tea Series", name: "Earl Grey Tea", regularPrice: 6.80, largePrice: 7.80, hasSugar: true, hasIce: true, hasHot: true },
  // Refreshing (caffeinated)
  { series: "Refreshing (caffeinated)", name: "Wintermelon Green Tea", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Refreshing (caffeinated)", name: "Honey Green Tea", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Refreshing (caffeinated)", name: "Lemon Green Tea", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Refreshing (caffeinated)", name: "Grapefruit Green Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Refreshing (caffeinated)", name: "Peach Green Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Refreshing (caffeinated)", name: "Lychee Green Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Refreshing (caffeinated)", name: "Grape Green Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Refreshing (caffeinated)", name: "Peach Lychee Green Tea", regularPrice: 7.90, largePrice: 8.90, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Refreshing (caffeinated)", name: "Mango Green Tea", regularPrice: 7.90, largePrice: 8.90, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Refreshing (caffeinated)", name: "QQ Passionfruit Green Tea", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Refreshing (caffeinated)", name: "QQ Grape Passionfruit Green Tea", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Refreshing (caffeinated)", name: "Grapefruit Green Tea w White Pearl & Ai-Yu", regularPrice: 8.30, largePrice: 9.30, hasSugar: true, hasIce: true, hasHot: false },
  // Fresh Milk Series
  { series: "Fresh Milk Series", name: "Fresh Milk Black Tea", regularPrice: 7.30, largePrice: 8.30, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Fresh Milk Series", name: "Fresh Milk Green Tea", regularPrice: 7.30, largePrice: 8.30, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Fresh Milk Series", name: "Fresh Milk Oolong Tea", regularPrice: 7.30, largePrice: 8.30, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Fresh Milk Series", name: "Fresh Milk Earl Grey Tea", regularPrice: 7.30, largePrice: 8.30, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Fresh Milk Series", name: "Fresh Milk Wintermelon", regularPrice: 7.30, largePrice: 8.30, hasSugar: false, hasIce: true, hasHot: true },
  { series: "Fresh Milk Series", name: "Fresh Milk w Azuki and Pudding", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Fresh Milk Series", name: "Fresh Milk w Herbal Jelly and Pearl", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Fresh Milk Series", name: "Fresh Milk Japanese Matcha", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Fresh Milk Series", name: "Mango Matcha w Mango Pearl", regularPrice: 9.90, largePrice: 10.90, hasSugar: false, hasIce: false, hasHot: false },
  // Coffee Series
  { series: "Coffee Series", name: "Gong cha Milk Coffee", regularPrice: 8.70, largePrice: 9.70, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Coffee Series", name: "Gong cha Coffee Milk Tea", regularPrice: 8.70, largePrice: 9.70, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Coffee Series", name: "Caramel Milk Coffee", regularPrice: 9.50, largePrice: 10.50, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Coffee Series", name: "Dirtea Coffee Milk Tea", regularPrice: 11.20, largePrice: 12.20, hasSugar: true, hasIce: true, hasHot: false },
  // Refreshing (non-caffeinated)
  { series: "Refreshing (non-caffeinated)", name: "Honey Drink", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Refreshing (non-caffeinated)", name: "Wintermelon Drink", regularPrice: 7.00, largePrice: 8.00, hasSugar: false, hasIce: true, hasHot: true },
  { series: "Refreshing (non-caffeinated)", name: "Honey Lemon Drink", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Refreshing (non-caffeinated)", name: "White Pearl Ai-Yu Special", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Refreshing (non-caffeinated)", name: "Lemon Wintermelon Drink", regularPrice: 8.00, largePrice: 9.00, hasSugar: false, hasIce: true, hasHot: true },
  { series: "Refreshing (non-caffeinated)", name: "Lychee Honey Drink w Aloe Vera", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: false },
  // Yogurt Series
  { series: "Yogurt Series", name: "Green Tea Yogurt", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Yogurt Series", name: "Grapefruit Yogurt Drink", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Yogurt Series", name: "Peach Yogurt Drink", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Yogurt Series", name: "Lemon Yogurt Drink", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Yogurt Series", name: "Grape Yogurt Drink", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Yogurt Series", name: "Mango Yogurt Drink", regularPrice: 8.30, largePrice: 9.30, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Yogurt Series", name: "Strawberry Yogurt Drink", regularPrice: 8.30, largePrice: 9.30, hasSugar: true, hasIce: true, hasHot: false },
  // Milk Tea Series
  { series: "Milk Tea Series", name: "Milk Tea", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Honey Milk Tea", regularPrice: 7.00, largePrice: 8.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Chocolate Milk Drink", regularPrice: 7.40, largePrice: 8.40, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Pearl Milk Tea", regularPrice: 7.70, largePrice: 8.70, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Milk Tea w Coconut Jelly", regularPrice: 7.70, largePrice: 8.70, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Oolong Milk Tea w Herbal Jelly", regularPrice: 7.70, largePrice: 8.70, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Japanese Matcha Milk Drink", regularPrice: 8.00, largePrice: 9.00, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Brown Sugar Milk Tea", regularPrice: 8.20, largePrice: 9.20, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Caramel Milk Tea", regularPrice: 8.20, largePrice: 9.20, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Tea Series", name: "Milk Tea w Pudding and Pearl", regularPrice: 8.40, largePrice: 9.40, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Earl Grey Milk Tea w 3J", regularPrice: 8.40, largePrice: 9.40, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Oreo Choclate Milk Tea", regularPrice: 8.40, largePrice: 9.40, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Strawberry Green Milk Tea", regularPrice: 8.40, largePrice: 9.40, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Honeydew Milk Drink", regularPrice: 8.70, largePrice: 9.70, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Strawberry Chocolate", regularPrice: 8.70, largePrice: 9.70, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Honeydew Green Milk Tea", regularPrice: 9.20, largePrice: 10.20, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Mango Green Milk Tea", regularPrice: 9.20, largePrice: 10.20, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Tea Series", name: "Taro Milk Drink", regularPrice: 9.50, largePrice: 10.50, hasSugar: true, hasIce: true, hasHot: true },
  // Slushie Series
  { series: "Slushie Series", name: "Lychee Slushie", regularPrice: 7.50, largePrice: 8.50, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Passionfruit w Coconut Jelly", regularPrice: 7.90, largePrice: 8.90, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Mango Slushie", regularPrice: 8.90, largePrice: 9.90, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Mango Yogurt Slushie", regularPrice: 9.20, largePrice: 10.20, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Peach Yogurt Slushie w Coconut Jelly", regularPrice: 9.20, largePrice: 10.20, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Taro Slushie", regularPrice: 9.20, largePrice: 10.20, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Honeydew Slushie", regularPrice: 9.20, largePrice: 10.20, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Japanese Matcha Slushie", regularPrice: 9.50, largePrice: 10.50, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Oreo Chocolate Slushie", regularPrice: 9.50, largePrice: 10.50, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Slushie Series", name: "Azuki Slushie", regularPrice: 11.00, largePrice: 12.00, hasSugar: false, hasIce: false, hasHot: false },
  // Milk Foam Series
  { series: "Milk Foam Series", name: "Milk Foam Black Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Foam Series", name: "Milk Foam Green Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Foam Series", name: "Milk Foam Oolong Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Foam Series", name: "Milk Foam Earl Grey Tea", regularPrice: 7.50, largePrice: 8.50, hasSugar: true, hasIce: true, hasHot: true },
  { series: "Milk Foam Series", name: "Milk Foam Wintermelon", regularPrice: 7.50, largePrice: 8.50, hasSugar: false, hasIce: true, hasHot: true },
  { series: "Milk Foam Series", name: "Dirtea Fresh Milk", regularPrice: 10.20, largePrice: 11.20, hasSugar: true, hasIce: true, hasHot: false },
  { series: "Milk Foam Series", name: "Dirtea Fresh Milk Black Tea", regularPrice: 10.20, largePrice: 11.20, hasSugar: true, hasIce: true, hasHot: false },
  // Redbull Series
  { series: "Redbull Series", name: "Powered Grape OG", regularPrice: 9.20, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Redbull Series", name: "Powered Grape SF", regularPrice: 9.20, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Redbull Series", name: "Powered Lychee OG", regularPrice: 9.20, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Redbull Series", name: "Powered Lychee SF", regularPrice: 9.20, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Redbull Series", name: "Powered Grapefruit OG", regularPrice: 9.20, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Redbull Series", name: "Powered Grapefruit SF", regularPrice: 9.20, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  // Thai Mango Series (Seasonal)
  { series: "Thai Mango Series", name: "Thai Mango Milk Tea", regularPrice: 8.90, largePrice: 9.90, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Thai Mango Series", name: "Thai Mango Slushie", regularPrice: 8.90, largePrice: 9.90, hasSugar: false, hasIce: false, hasHot: false },
  // Greek Yogurt Series (Seasonal)
  { series: "Greek yogurt Series", name: "Mango Greek Yogurt", regularPrice: 10.90, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Greek yogurt Series", name: "Strawberry Greek Yogurt", regularPrice: 10.90, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Greek yogurt Series", name: "Peach Greek Yogurt", regularPrice: 10.90, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
];

// ─── BUILD CATEGORIES ────────────────────────────────────────────────────────
function buildCategories() {
  const bestSellers = [];
  const seasonal = [];
  const regularCats = {};

  RAW_MENU.forEach(drink => {
    const isSeasonal = SEASONAL_SERIES.includes(drink.series);
    const isBestSeller = BEST_SELLERS_NAMES.some(bs =>
      drink.name.toLowerCase().includes(bs.toLowerCase()) ||
      bs.toLowerCase().includes(drink.name.toLowerCase())
    );

    if (isBestSeller) bestSellers.push(drink);
    if (isSeasonal) seasonal.push(drink);
    if (!isSeasonal) {
      if (!regularCats[drink.series]) regularCats[drink.series] = [];
      regularCats[drink.series].push(drink);
    }
  });

  // Sort regular categories by avg price desc
  const sortedRegular = Object.entries(regularCats)
    .map(([series, drinks]) => ({
      series,
      drinks,
      avgPrice: drinks.reduce((s, d) => s + d.regularPrice, 0) / drinks.length
    }))
    .sort((a, b) => b.avgPrice - a.avgPrice)
    .map(({ series, drinks }) => ({ id: series, label: series, drinks }));

  return [
    { id: "Best Sellers", label: "⭐ Best Sellers", drinks: bestSellers },
    ...sortedRegular,
    { id: "Seasonal", label: "🌸 Seasonal Specials", drinks: seasonal },
  ];
}

const CATEGORIES = buildCategories();

// ─── PROMO CALCULATION ────────────────────────────────────────────────────────
function calcCartTotals(cartItems) {
  if (cartItems.length === 0) return { total: 0, savings: 0, discountedCount: 0, itemTotals: [] };

  // Base prices (excluding toppings) sorted ascending for discount logic
  const basePrices = cartItems.map(item => item.drink.regularPrice);
  const sortedBase = [...basePrices].sort((a, b) => a - b);
  const discountedCount = Math.floor(cartItems.length / 2);
  const discountedPrices = sortedBase.slice(0, discountedCount);

  // Mark which items are discounted (cheapest ones)
  const discountMap = new Map();
  const tempSorted = cartItems
    .map((item, idx) => ({ idx, base: item.drink.regularPrice }))
    .sort((a, b) => a.base - b.base);

  for (let i = 0; i < discountedCount; i++) {
    discountMap.set(tempSorted[i].idx, true);
  }

  let total = 0;
  let savings = 0;
  const itemTotals = cartItems.map((item, idx) => {
    const isDiscounted = discountMap.has(idx);
    const toppingCost = item.toppings.reduce((s, t) => s + t.price, 0);
    const upsize = item.size === "Large" ? 1.0 : 0;

    let baseCharge;
    if (isDiscounted) {
      baseCharge = 1.00; // discounted base
      savings += (item.drink.regularPrice - 1.00);
    } else {
      baseCharge = item.drink.regularPrice;
    }

    const itemTotal = baseCharge + upsize + toppingCost;
    total += itemTotal;

    return { itemTotal, isDiscounted, baseCharge, upsize, toppingCost };
  });

  return { total, savings, discountedCount, itemTotals };
}

// ─── EMOJI MAP ────────────────────────────────────────────────────────────────
const SERIES_EMOJI = {
  "Brewed Tea Series": "🍵",
  "Refreshing (caffeinated)": "🍋",
  "Fresh Milk Series": "🥛",
  "Coffee Series": "☕",
  "Refreshing (non-caffeinated)": "🌊",
  "Yogurt Series": "🍑",
  "Milk Tea Series": "🧋",
  "Slushie Series": "🧊",
  "Milk Foam Series": "☁️",
  "Redbull Series": "⚡",
  "Best Sellers": "⭐",
  "Seasonal": "🌸",
};

// ─── LOGO SVG (inline Gong cha red seal style) ───────────────────────────────
const GongChaLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{
      width: 36, height: 44, background: "#B91C1C", borderRadius: 8,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, boxShadow: "0 2px 8px rgba(185,28,28,0.4)"
    }}>
      <span style={{ color: "white", fontSize: 18, fontWeight: 900, lineHeight: 1, letterSpacing: -1 }}>貢茶</span>
    </div>
    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: "#1a1a1a", fontWeight: 700, letterSpacing: 0.5 }}>Gong cha</span>
  </div>
);

// ─── DRINK CARD ───────────────────────────────────────────────────────────────
const DrinkCard = ({ drink, onSelect }) => {
  const isBestSeller = BEST_SELLERS_NAMES.some(bs =>
    drink.name.toLowerCase().includes(bs.toLowerCase()) ||
    bs.toLowerCase().includes(drink.name.toLowerCase())
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
          TOP 10
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

// ─── CUSTOMIZATION MODAL ──────────────────────────────────────────────────────
const CustomModal = ({ drink, onClose, onAdd }) => {
  const [size, setSize] = useState("Regular");
  const [sugar, setSugar] = useState(drink.hasSugar ? "100%" : null);
  const [ice, setIce] = useState(drink.hasIce ? "Standard" : null);
  const [temp, setTemp] = useState(drink.hasIce ? "Iced" : drink.hasHot ? "Hot" : "Iced");
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toggleTopping = (topping) => {
    setSelectedToppings(prev =>
      prev.find(t => t.name === topping.name)
        ? prev.filter(t => t.name !== topping.name)
        : [...prev, topping]
    );
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
      id: Date.now() + Math.random(),
    });
    onClose();
  };

  const sugarOptions = ["0%", "30%", "50%", "70%", "100%", "130%"];
  const iceOptions = ["No Ice", "Little Ice", "Less Ice", "Standard", "Extra Ice"];

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
        <Section title="Size">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Regular", ...(drink.largePrice ? ["Large"] : [])].map(s => (
              <Pill key={s} selected={size === s} onClick={() => setSize(s)}
                label={s === "Regular" ? `Regular — $${drink.regularPrice.toFixed(2)}` : `Large — $${drink.largePrice?.toFixed(2)}`}
              />
            ))}
          </div>
        </Section>

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
        <Section title="Add Toppings (+$1.00–$1.30 each)">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
            {TOPPINGS.map(t => (
              <button
                key={t.name}
                onClick={() => toggleTopping(t)}
                style={{
                  border: selectedToppings.find(s => s.name === t.name) ? "2px solid #B91C1C" : "1.5px solid #e5e7eb",
                  borderRadius: 10, padding: "9px 10px", cursor: "pointer", textAlign: "left",
                  background: selectedToppings.find(s => s.name === t.name) ? "#fef3f3" : "white",
                  transition: "all 0.15s",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{t.name}</span>
                <span style={{ fontSize: 11, color: "#B91C1C", fontWeight: 700 }}>+${t.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Price Summary */}
        <div style={{ background: "#fef9f9", borderRadius: 14, padding: "12px 16px", marginBottom: 16, border: "1px solid #fde8e8" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 4 }}>
            <span>Base ({size})</span>
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
          Add to Order
        </button>
      </div>
    </div>
  );
};

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

// ─── FLOATER ──────────────────────────────────────────────────────────────────
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
        <span style={{ fontSize: 8, fontWeight: 700, lineHeight: 1, marginTop: 1 }}>TOP 10</span>
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
                See All Top 10
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ─── SHOW TO COUNTER VIEW ────────────────────────────────────────────────────
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
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 14px", color: "white" }}>
          <span style={{ fontSize: 11, opacity: 0.8 }}>Total </span>
          <span style={{ fontWeight: 900, fontSize: 16 }}>${total.toFixed(2)}</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 14px", color: "white" }}>
          <span style={{ fontSize: 11, opacity: 0.8 }}>Drinks </span>
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
          <div style={{ fontSize: 13, opacity: 0.9 }}>{discountedCount} drink{discountedCount > 1 ? "s" : ""} at $1.00 • You saved ${savings.toFixed(2)}</div>
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
                <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>{item.size}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#B91C1C" }}>${totInfo.itemTotal.toFixed(2)}</div>
                {totInfo.isDiscounted && <div style={{ fontSize: 10, color: "#B91C1C", fontWeight: 700 }}>PROMO APPLIED</div>}
              </div>
            </div>

            {/* Details */}
            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
              {item.sugar && <DetailRow icon="🍬" label="Sugar" value={item.sugar} />}
              {item.ice && <DetailRow icon="🧊" label="Ice" value={item.ice} />}
              {item.temp === "Hot" && <DetailRow icon="🔥" label="Temp" value="Hot" />}
              {item.size === "Large" && <DetailRow icon="⬆️" label="Upsize" value="+$1.00" />}
              {totInfo.isDiscounted && <DetailRow icon="🎉" label="Discount" value="Base $1.00 (Promo)" red />}
              {item.toppings.map(t => (
                <DetailRow key={t.name} icon="➕" label="Topping" value={`${t.name} (+$${t.price.toFixed(2)})`} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Final total */}
      <div style={{ background: "#1a1a1a", borderRadius: 16, padding: "18px 20px", color: "white" }}>
        {savings > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#fbbf24", marginBottom: 6 }}>
            <span>🎉 Anniversary Savings</span>
            <span>-${savings.toFixed(2)}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 900 }}>
          <span>TOTAL</span>
          <span style={{ color: "#fbbf24" }}>${total.toFixed(2)}</span>
        </div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 4, textAlign: "center" }}>Show this screen to the barista</div>
      </div>
    </div>
  </div>
);

const DetailRow = ({ icon, label, value, red }) => (
  <div style={{ display: "flex", gap: 8, fontSize: 13, color: red ? "#B91C1C" : "#555" }}>
    <span style={{ width: 16, textAlign: "center" }}>{icon}</span>
    <span style={{ color: "#999", minWidth: 60 }}>{label}</span>
    <span style={{ fontWeight: red ? 700 : 500 }}>{value}</span>
  </div>
);

// ─── CART SIDEBAR ─────────────────────────────────────────────────────────────
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

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Best Sellers");
  const [showCart, setShowCart] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categoryRefs = useRef({});

  const { total, savings, discountedCount, itemTotals } = useMemo(() => calcCartTotals(cartItems), [cartItems]);

  const addToCart = useCallback((item) => {
    setCartItems(prev => [...prev, item]);
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
                <><span>{cartItems.length}</span><span>·</span><span>${total.toFixed(2)}</span></>
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
            {cartItems.length} drink{cartItems.length !== 1 ? "s" : ""} · ${total.toFixed(2)}
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
      {selectedDrink && (
        <CustomModal
          drink={selectedDrink}
          onClose={() => setSelectedDrink(null)}
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
          onShowCounter={() => { setShowCart(false); setShowCounter(true); }}
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

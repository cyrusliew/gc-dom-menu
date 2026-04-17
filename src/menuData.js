// ─── RAW DATA ────────────────────────────────────────────────────────────────
export const TOPPINGS = [
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

export const BEST_SELLERS_NAMES = [
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

export const SEASONAL_SERIES = ["Thai Mango Series", "Greek yogurt Series"];

// Parse the raw JSON into canonical drink objects (Regular size as base)
export const RAW_MENU = [
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
  // Waffle Series
  { series: "Waffle Series", name: "Classic Waffle", regularPrice: 11.50, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Waffle Series", name: "Strawberry Oreo Waffle", regularPrice: 15.00, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Waffle Series", name: "QQ Passionfruit Waffle", regularPrice: 15.00, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
  { series: "Waffle Series", name: "Milk Form Caramel Waffle", regularPrice: 15.00, largePrice: null, hasSugar: false, hasIce: false, hasHot: false },
];

// ─── BUILD CATEGORIES ────────────────────────────────────────────────────────
export function buildCategories() {
  const bestSellers = [];
  const seasonal = [];
  const regularCats = {};

  RAW_MENU.forEach(drink => {
    const isSeasonal = SEASONAL_SERIES.includes(drink.series);
    const isBestSeller = BEST_SELLERS_NAMES.some(bs =>
      drink.name.toLowerCase() === bs.toLowerCase()
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

export const CATEGORIES = buildCategories();

// ─── PROMO CALCULATION ────────────────────────────────────────────────────────
export function calcCartTotals(cartItems) {
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
export const SERIES_EMOJI = {
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
  "Waffle Series": "🧇",
};
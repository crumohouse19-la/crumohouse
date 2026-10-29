/* =====================================================================
   CRUMO HOUSE — SITE CONFIG
   Edit this file to change the WhatsApp number, hours, links, menu
   items, prices and photos. No other file needs touching for those.
   ===================================================================== */

window.CRUMO_CONFIG = {
  // WhatsApp number in international format, digits only (country code + number)
  whatsapp: "918976166033",
  // How the number is shown on the page
  whatsappDisplay: "+91 89761 66033",
  // Pre-filled greeting for the "Message us" buttons
  greeting: "Hi Crumo House, I'd like to place an order.",
  // Zomato share link (from the Zomato app > Share)
  zomato: "https://link.zomato.com/xqzv/rshare?id=1514186903056393a",
  // Instagram profile
  instagram: "https://www.instagram.com/crumohouse/",
  // Kitchen hours, 24h clock. close may go past 24 for after-midnight (25 = 1 am next day).
  // closedDays: 0=Sun,1=Mon,...6=Sat (empty = open every day)
  hours: {
    open: 10,          // pre-orders open
    deliverFrom: 12,   // deliveries / orders fulfilled from
    close: 25,
    closedDays: [],
    openLabel: "Kitchen open \u00b7 orders till 1 am",
    earlyLabel: "Pre-orders open \u00b7 deliveries from 12 pm",
    closedLabel: "Closed today \u00b7 pre-order for tomorrow",
    preorderLabel: "Kitchen opens 10 am \u00b7 pre-order now"
  }
};

window.CRUMO_MENU = {
  // Photos used across the site (paths relative to index.html)
  images: {
    tin:    "assets/img/tin-signature.jpg",
    petite: "assets/img/tin-petite.jpg",
    bisco:  "assets/img/bisco-bliss.jpg",
    oreo:   "assets/img/cookie-oreo-bliss.jpg",
    chunk:  "assets/img/cookie-chocolate-chunk.jpg",
    red:    "assets/img/cookie-crimson-velvet.jpg",
    melt:   "assets/img/cookie-midnight-melt.jpg",
    white:  "assets/img/tin-white-chocolate.jpg"
  },

  // Signature Cookie Tin (large): [flavour, price in INR, swatch colour]
  tins: [
    ["Triple Chocolate", 799, "#3B2314"],
    ["Red Velvet",       799, "#8E1F2F"],
    ["Nutella",          749, "#6B3A1E"],
    ["White Chocolate",  699, "#F2E6C9"],
    ["Dark Chocolate",   699, "#2A1810"],
    ["Milk Chocolate",   699, "#9C6B3C"],
    ["Biscoff",          799, "#C98A3E"]
  ],

  // Signature Petite Tin (small)
  petites: [
    ["Biscoff",         349, "#C98A3E"],
    ["Red Velvet",      349, "#8E1F2F"],
    ["Nutella",         349, "#6B3A1E"],
    ["Milk Chocolate",  299, "#9C6B3C"],
    ["Dark Chocolate",  299, "#2A1810"],
    ["White Chocolate", 299, "#F2E6C9"]
  ],

  // Which photo to show when a tin flavour is picked (others use images.tin)
  tinPhotos: {
    "White Chocolate": "assets/img/tin-white-chocolate.jpg"
  },

  // Single cookies shown in the catalog. id must be unique.
  singles: [
    { id: "bisco", name: "Bisco Bliss",              fl: "Biscoff · 120 g",          price: 189, img: "assets/img/bisco-bliss.jpg",            badge: "Bestseller" },
    { id: "oreo",  name: "Oreo Bliss",               fl: "Cookies & Cream · 120 g",  price: 159, img: "assets/img/cookie-oreo-bliss.jpg" },
    { id: "chunk", name: "Ultimate Chocolate Chunk", fl: "Chocolate Chunk · 120 g",  price: 149, img: "assets/img/cookie-chocolate-chunk.jpg" },
    { id: "red",   name: "Crimson Velvet",           fl: "Red Velvet · 120 g",       price: 189, img: "assets/img/cookie-crimson-velvet.jpg",          badge: "Signature" },
    { id: "melt",  name: "Midnight Melt",            fl: "Double Chocolate · 120 g", price: 189, img: "assets/img/cookie-midnight-melt.jpg" }
  ]
};

# Crumo House — website

Static, single-page website for Crumo House (homemade, hygienic gourmet cookies, Mumbai).
No server, database or build step: it is plain HTML, CSS and JavaScript, so it can be hosted anywhere for free.

```
crumo-house-site/
├─ index.html            the page (structure + content)
├─ css/style.css         all styling (colours, layout, animations)
├─ js/config.js          ← EDIT THIS: WhatsApp number, hours, Zomato link, menu, prices, photos
├─ js/main.js            behaviour: hero scroll/float, cart, flavour pickers, calendar, WhatsApp order
├─ assets/
│  ├─ img/               photos (hero, tins, cookies, logo, floating cut-outs)
│  ├─ favicon.png        browser-tab icon
│  ├─ apple-touch-icon.png
│  └─ icon-512.png
├─ site.webmanifest      "add to home screen" metadata
├─ robots.txt            lets search engines index the site
├─ sitemap.xml           page list for Google
├─ .htaccess             Apache hosts (cPanel/GoDaddy/Hostinger): HTTPS redirect + caching
├─ netlify.toml          Netlify settings (optional)
└─ vercel.json           Vercel settings (optional)
```

`crumo-house-standalone.html` (next to this folder in the zip) is the same site in one file with every image embedded. Use it when you just want to email or open the page; use the folder above for hosting.

---

## 1. Before going live — checklist

| # | Item | Where |
|---|------|-------|
| 1 | WhatsApp number | `js/config.js` → `whatsapp` (digits only, with 91) and `whatsappDisplay` |
| 2 | Zomato link | `js/config.js` → `zomato` |
| 3 | Kitchen hours / closed days | `js/config.js` → `hours` |
| 4 | Menu, prices, flavours | `js/config.js` → `tins`, `petites`, `singles` |
| 5 | Photos | drop files into `assets/img/` and point `config.js` at them |
| 6 | Reviews (currently placeholders) | `index.html`, search for `class="review"` |
| 7 | Delivery area / hours text | `index.html`, search for `hours` block and "Same-day" |
| 8 | Domain in SEO tags | `index.html` head: `canonical`, `og:url`, `og:image`; `robots.txt`; `sitemap.xml` — replace `https://www.crumohouse.in/` with your real domain |
| 9 | FSSAI licence number (recommended for food sales in India) | add a line in the footer of `index.html` |
| 10 | Google Analytics (optional) | paste the GA4 snippet just before `</head>` in `index.html` |

---

## 2. Editing the menu and prices

Open `js/config.js`. Everything is plain lists:

```js
tins: [
  ["Triple Chocolate", 799, "#3B2314"],   // [flavour, price in ₹, swatch colour]
  ...
],
singles: [
  { id: "bisco", name: "Bisco Bliss", fl: "Biscoff · 120 g", price: 189,
    img: "assets/img/bisco-bliss.jpg", badge: "Bestseller" },
  ...
]
```

- To change a price, change the number. The catalog, the tin pickers, the order dropdown and the WhatsApp message all read from here.
- To add a flavour, add a line to `tins` or `petites`. To add a single cookie, add an object to `singles` with a unique `id`.
- To remove an item, delete its line.
- `badge` is optional (shows a small label on the card).
- `tinPhotos` maps a tin flavour to a photo. Flavours not listed use `images.tin`.

Photos: JPG or WebP, square (1:1) for cookies and tins, roughly 900×900 px, under ~150 KB each. The hero banner is 3:2 (`hero.jpg` 1800×1200, `hero-mobile.jpg` 900×600).

---

## 3. How ordering works

There is no payment gateway and no backend. The order form builds a WhatsApp message and opens `https://wa.me/<number>?text=...` with it pre-filled. The customer presses Send inside WhatsApp; you receive the order as a normal chat and confirm payment (UPI / cash on delivery) there.

The message contains two calculated sections:

```
FROM CART:              ← items added with "+" in the catalog or "Add to cart" on the tins
• 1 × Bisco Bliss – Biscoff · 120 g (₹189)
Cart subtotal: ₹189

SELF-SELECTED FROM MENU: ← items chosen in the dropdown inside the form
• 2 × Signature Petite Tin – Nutella (₹698)
Self-selected subtotal: ₹698

GRAND TOTAL: ₹887
Name / Phone / Address / Delivery date + slot / Note
```

"Custom order" mode sends occasion, piece count, budget and a free-text brief instead.

The "Kitchen open / pre-order" badge and the calendar use the visitor's device clock and the `hours` block in `config.js` (Mondays disabled by default).

If you later want online payment, the simplest route is a Razorpay Payment Page or a Zoho Checkout link: add it as a button next to "Place WhatsApp order" in `index.html`.

---

## 4. Going live — pick one

All options below are free or nearly free. Upload the **contents of this folder** (index.html at the root), not the folder itself.

### A. Netlify (easiest, free, HTTPS automatic)
1. Go to https://app.netlify.com and sign up (GitHub/Google/email).
2. Click **Add new site → Deploy manually**.
3. Drag the `crumo-house-site` folder onto the page. The site is live in ~20 seconds at `something.netlify.app`.
4. **Custom domain:** Site settings → Domain management → Add domain → follow the DNS instructions (see §5). HTTPS is issued automatically.
5. To update later: drag the folder again, or connect a GitHub repo for automatic deploys.

### B. Vercel (free, HTTPS automatic)
1. https://vercel.com → sign up → **Add New → Project**.
2. Either import a GitHub repo containing these files, or install the CLI: `npm i -g vercel`, then run `vercel` inside the folder and accept the defaults.
3. Custom domain: Project → Settings → Domains.

### C. Cloudflare Pages (free, fast in India)
1. https://dash.cloudflare.com → Workers & Pages → **Create → Pages → Upload assets**.
2. Name the project, drag the folder's contents, Deploy.
3. Custom domains tab → add your domain (easiest if the domain's DNS is already on Cloudflare).

### D. GitHub Pages (free)
1. Create a GitHub repo, e.g. `crumo-house`, and upload all files (index.html at the root).
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
3. Site appears at `https://<username>.github.io/crumo-house/`.
4. Custom domain: enter it on the same Pages screen and add the DNS records it shows (§5). Tick *Enforce HTTPS* after the certificate is issued.

### E. GoDaddy / Hostinger / any cPanel hosting (paid shared hosting)
1. Log in to cPanel (or hPanel) → **File Manager** → open `public_html`.
2. Delete any default `index.html`, then **Upload** everything from this folder (including `.htaccess` — enable *Show hidden files* if you don't see it).
3. Alternatively use FTP (FileZilla): host = your domain or server IP, user/password from the hosting panel, upload to `public_html`.
4. SSL: enable the free Let's Encrypt / AutoSSL certificate in the hosting panel. `.htaccess` then forces HTTPS automatically.

### F. Firebase Hosting / Amazon S3 + CloudFront
Also fine; any host that serves static files works. For S3: upload, enable *Static website hosting*, set `index.html` as the index document, put CloudFront in front for HTTPS.

---

## 5. Custom domain (e.g. crumohouse.in)

1. Buy the domain (GoDaddy, Namecheap, Hostinger, BigRock…) if you don't have it.
2. In the host from §4, add the domain. The host shows you DNS records to create.
3. In your domain registrar's DNS panel add them — typically:
   - `A` record, host `@` → the IP the host gave you (Netlify: `75.2.60.5`; GitHub Pages: four `185.199.108–111.153` records)
   - `CNAME` record, host `www` → the host's address (e.g. `yoursite.netlify.app` or `<username>.github.io`)
4. Wait 10 minutes to a few hours for DNS to propagate, then enable HTTPS in the host panel if it isn't automatic.
5. Update the domain in `index.html` (`canonical`, `og:url`, `og:image`), `robots.txt` and `sitemap.xml`, re-upload.
6. Submit `https://yourdomain/sitemap.xml` in Google Search Console so the site gets indexed.

---

## 6. Local preview

Just open `index.html` in a browser. Everything works offline except Google Fonts (text falls back to system fonts until online).

For a local server (optional): `npx serve .` or `python3 -m http.server 8080` inside the folder, then open `http://localhost:8080`.

---

## 7. How the page is built (for a developer)

- **Hero**: `.hero-wrap` is 175vh tall; `.hero` is `position: sticky` inside it, so the banner pins while the dark `.sheet` slides over. `main.js` maps scroll progress to a scale/brightness/blur on the photo. Under 760px the hero becomes a normal 3:2 image.
- **Floating title**: the title is live HTML (`.hero-title`) over a cleaned version of the photo. Each letter is wrapped in a `<span class="l">` with its own spring (`y`, `vy`): pointer movement within 150px pushes letters up, a damped spring brings them back. Works with mouse and touch, any width. `prefers-reduced-motion` disables it.
- **Reveal on scroll**: elements with `.rv` get `.in` from an `IntersectionObserver`.
- **Giant background text**: `.bigword` — a CSS marquee with `-webkit-text-stroke`.
- **Cart**: in-memory arrays `cart` (catalog + tins) and `picks` (form dropdown). `update()` redraws the drawer, the form lists, subtotals and the WhatsApp link; nothing is persisted on reload (by design — no cookies, no storage).
- **Calendar**: rendered by `main.js`, 12 months ahead, past dates and `closedDays` disabled, value stored in hidden `#fDate`.
- **Fonts**: Fredoka (display), Cormorant Garamond (hero title), Jost (body) from Google Fonts. To self-host, download the woff2 files and replace the `<link>` with `@font-face` rules in `style.css`.
- **No dependencies**, no build tools, no tracking.

Colours live at the top of `css/style.css` as CSS variables (`--bg`, `--card`, `--gold`, `--wine`, …).

---

## 8. Support contacts used on the page

- WhatsApp: +91 89761 66033
- Zomato: share link in `config.js`

Change both in `js/config.js`; every button and the footer update automatically.

---

## 9. All-in-one QR code (scan-to-order menu)

`menu.html` is a phone-first page built for QR scans: opening logo animation → full menu with prices → tap + to pick items → **Order** opens WhatsApp with the list pre-filled → Instagram and Zomato buttons at the top. It reads the same `js/config.js`, so when you change a price or add a flavour the page changes and **the QR code stays the same forever**.

Files in `qr/`:

| File | Points to | Use |
|------|-----------|-----|
| `qr-live-now.png` / `-poster.png` / `.svg` | the menu page published from this chat (works today) | share the artifact link publicly first (Share menu → anyone with the link), then print |
| `qr-your-domain.png` / `-poster.png` / `.svg` | `https://www.crumohouse.in/menu.html` | **use this once your domain is live** — it never needs reprinting |
| `make-qr.py` + `logo.png` | any URL you pass | `python3 make-qr.py https://yourdomain/menu.html` regenerates PNG + SVG |

Make the QR permanent: point it at a domain **you own** (e.g. `crumohouse.in/menu.html`). As long as that URL keeps serving `menu.html`, you can change the menu, prices, photos, number and socials without touching the QR. If you ever move hosts, keep the same domain and path.

Printing: use the `.svg` (vector) or the `-poster.png` (898×1178 px, fine up to A4). Keep the QR at least 3 cm wide on packaging/tent cards and leave a light margin around it. The codes use error-correction level H, so the centre logo and minor scuffs do not break scanning.

Social handles used: WhatsApp +91 89761 66033 · Instagram https://www.instagram.com/crumohouse/ · Zomato (share link). All three are in `js/config.js`.

# 💡 Lumina — Brand Identity Guide

> **Lumina** — Illuminate Your Mind
> Platform belajar interaktif dengan AI Coach, gamifikasi misi, treasure hunt, dan asesmen.

## 🎨 Visual Identity Overview

| Element | Detail |
|---|---|
| **Nama** | Lumina |
| **Tagline EN** | Illuminate Your Mind |
| **Tagline ID** | Cahaya Pengetahuan |
| **Vibe** | Sophisticated, modern, premium |
| **Target** | Sekolah premium, internasional, ekspansi regional |

---

## 🎨 Color Palette

### Primary Brand Colors
| Role | Hex | Color |
|---|---|---|
| **Indigo (Primary)** | `#6366f1` | 🔵 Indigo |
| **Violet (Accent)** | `#8b5cf6` | 🟣 Violet |
| **Light Violet** | `#a78bfa` | 🟪 Light violet |
| **Deep Indigo** | `#4f46e5` | 🔷 Deep indigo |

### Surface & Background (Dark Theme)
| Role | Hex |
|---|---|
| Background Main | `#0b0d14` |
| Background Elevated | `#141826` |
| Background Card | `#1a1f30` |
| Text Main | `#e6e9f2` |
| Text Gray | `#8b93a7` |
| Text Dim | `#5a6378` |

### Status Colors
| Role | Hex |
|---|---|
| Success | `#34d399` |
| Warning | `#fbbf24` |
| Danger | `#f87171` |

### Gradient Signature
```css
/* Primary brand gradient */
linear-gradient(135deg, #6366f1, #8b5cf6)

/* Aurora background */
radial-gradient(ellipse at 20% -10%, rgba(99, 102, 241, 0.14), transparent 60%),
radial-gradient(ellipse at 85% 110%, rgba(139, 92, 246, 0.10), transparent 60%)
```

---

## 📐 Logo Usage

### Logo Variations

1. **Icon-only** (untuk app icon, favicon, PWA)
   - File: `icon-512.png`, `icon.svg`
   - Orb bercahaya dengan radial gradient indigo-violet
   - Sparkle rays 8 arah di sekeliling orb
   - Dark background `#0b0d14`

2. **Wordmark** (untuk splash, OG image, marketing)
   - File: `og-image.png` (1200x630)
   - Orb + "LUMINA" text dengan gradient text effect
   - Tagline kecil di bawah

3. **Maskable** (untuk Android adaptive icon)
   - File: `maskable-512.png`, `maskable-192.png`
   - Full bleed background (no rounded corners)
   - Orb lebih kecil (safe zone 80%)

### Icon Sizes Available

| File | Size | Use Case |
|---|---|---|
| `icon-32.png` | 32x32 | Favicon |
| `icon-120.png` | 120x120 | iPhone |
| `icon-152.png` | 152x152 | iPad |
| `icon-167.png` | 167x167 | iPad Pro |
| `icon-180.png` | 180x180 | apple-touch-icon |
| `icon-192.png` | 192x192 | Android home screen |
| `icon-512.png` | 512x512 | Android splash, PWA |
| `maskable-192.png` | 192x192 | Android adaptive |
| `maskable-512.png` | 512x512 | Android adaptive |
| `icon.svg` | scalable | Modern favicon |
| `favicon.ico` | 32x32, 16x16 | Windows favicon |
| `og-image.png` | 1200x630 | Social share preview |

---

## ✍️ Typography

### Primary Font
**Plus Jakarta Sans** (Google Fonts)
- Modern Indonesian-designed font (cocok dengan brand identity)
- Sophisticated & clean
- Weight range: 400 (regular) → 800 (extra bold)

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Usage Rules
| Element | Weight | Size |
|---|---|---|
| App title "LUMINA" | 800-900 | 2.4rem (splash), 1.6rem (navbar) |
| Heading (h1, h2, h3) | 700-800 | clamp(1.5rem, 4vw, 2.5rem) |
| Body text | 400-500 | 0.95rem |
| Button text | 600-700 | 0.9rem |
| Caption/hint | 400 | 0.75rem |
| Tagline | 500 + letter-spacing 4px | 0.85rem |

---

## 📱 PWA Setup Instructions

### Struktur Folder
```
lumina-pwa/
├── index.html              ← PWA shell + splash screen + install button
├── manifest.json           ← PWA manifest (Lumina branding)
├── sw.js                   ← Service Worker (offline caching)
├── lumina-theme.css        ← CSS patch untuk tema aplikasi
├── README.md               ← File ini
├── icon.svg                ← SVG icon (scalable)
├── favicon.ico             ← Windows favicon
├── og-image.png            ← Social share preview (1200x630)
├── icon-32.png             ← 32x32 PNG
├── icon-120.png            ← 120x120 (iPhone)
├── icon-152.png            ← 152x152 (iPad)
├── icon-167.png            ← 167x167 (iPad Pro)
├── icon-180.png            ← 180x180 (apple-touch-icon)
├── icon-192.png            ← 192x192 (Android)
├── icon-512.png            ← 512x512 (PWA icon)
├── maskable-192.png        ← 192 maskable (Android adaptive)
└── maskable-512.png        ← 512 maskable (Android adaptive)
```

### Deploy ke GitHub Pages

1. **Buat repo GitHub** (public):
   - Name: `lumina-pwa` (atau nama lain bebas)
   - Public visibility (WAJIB untuk free GitHub Pages)

2. **Upload semua file** dari folder `lumina-pwa/` ke repo:
   - Drag semua file via GitHub web interface, ATAU
   - `git clone` repo, copy file, `git push`

3. **Aktifkan GitHub Pages**:
   - Settings → Pages (menu kiri)
   - Source: **Deploy from a branch**
   - Branch: `main` / folder: `/ (root)` → **Save**
   - Tunggu 1-2 menit → URL: `https://{username}.github.io/lumina-pwa/`

4. **Test PWA install**:
   - Buka URL di Android Chrome → tunggu 3 detik → tombol "💡 Pasang Lumina" muncul
   - Atau iOS Safari → Share → Add to Home Screen

### Update URL Apps Script
Buka `index.html`, cari baris:
```html
<iframe id="app" src="https://script.google.com/macros/s/AKfycbymtZIxJfEt1oLN2-OBWwy8OiRmn7-2iHzcPTJyhEkFaPMjOX-mFA9PZqBs9Zls7AcEIA/exec" ...>
```
Ganti URL dengan URL Apps Script deployment Anda yang baru (kalau redeploy).

---

## 🎨 Apply Theme ke Aplikasi (Apps Script)

File `lumina-theme.css` berisi CSS variables & utility classes untuk mengubah tema aplikasi Apps Script dari EMPOWER (ungu-cyan) menjadi Lumina (indigo-violet).

### Cara Pasang
1. Buka Apps Script editor → file `CssStyle` (HTML)
2. **Opsi A (Recommended)**: Tambahkan seluruh isi `lumina-theme.css` di akhir CssStyle sebelum `</style>` (akan override tema lama karena CSS cascade)
3. **Opsi B (Clean)**: Replace variabel warna di `:root` lama dengan yang baru, hapus tema lama

### Yang Berubah
- ✅ Primary color: `#7c3aed` (ungu) → `#6366f1` (indigo)
- ✅ Accent color: `#06b6d4` (cyan) → `#8b5cf6` (violet)
- ✅ Aurora gradient: pakai indigo+violet (lebih harmonis)
- ✅ Card hover shadow: indigo glow
- ✅ Button gradient: indigo→violet
- ✅ Focus ring: indigo
- ✅ Scrollbar: indigo-violet gradient
- ✅ Headings: indigo-violet gradient text

### Yang Tetap
- ✅ Layout, struktur, animasi tetap sama
- ✅ Status colors (success/warning/danger) tetap
- ✅ Typography (Plus Jakarta Sans) tetap
- ✅ Dark mode as default tetap

---

## 🔄 Update Versi (Force Refresh User)

Kalau update icon/SW/manifest, naikkan versi cache:
1. Buka `sw.js`
2. Ganti `const CACHE_NAME = 'lumina-pwa-v1';` → `'lumina-pwa-v2';`
3. Upload ulang ke GitHub → user otomatis dapat SW baru + reload cache

---

## 📋 Brand Voice & Tone

### Tone
- **Sophisticated** — bukan childish, bukan over-playful
- **Encouraging** — supportive, growth-oriented
- **Modern** — current, fresh, not dated
- **Premium** — quality feel, polished

### Tagline Usage
- **Splash screen**: gunakan EN "Illuminate Your Mind" + ID "Cahaya Pengetahuan"
- **Email subject / formal**: "Lumina — Illuminate Your Mind"
- **Casual / social media**: "Lumina 💡" atau "💡 Lumina"
- **App Store description**: mulai dengan tagline, lalu deskripsi fitur

### Emoji Association
- 💡 Light bulb = primary brand emoji (cahaya/iluminasi)
- 🌟 Star = secondary (premium, achievement)
- ✨ Sparkles = tertiary (modern, magical feel)

---

## 🛠️ Customization

### Ganti Theme Color
Buka `manifest.json` dan `index.html`, ganti `#6366f1` dengan warna pilihan Anda di:
- `manifest.json`: `"theme_color": "#6366f1"`, `"background_color": "#0b0d14"`
- `index.html`: `<meta name="theme-color" content="#6366f1">`
- `lumina-theme.css`: `--primary: #6366f1;`

### Update Icon
1. Replace `icon-*.png` dan `maskable-*.png` di folder ini
2. Pastikan ukuran sama, atau edit manifest.json kalau ukuran beda
3. Naikkan versi SW (`sw.js`: `CACHE_NAME = 'lumina-pwa-v2'`)

---

## 🐛 Troubleshooting

### Tombol install tidak muncul
- Cek DevTools → **Application** → **Manifest** (pastikan no error)
- Cek DevTools → **Application** → **Service Workers** (status: activated)
- Pastikan via HTTPS (GitHub Pages sudah HTTPS)
- Android Chrome: tombol baru muncul setelah ~3 detik

### iOS tidak ada tombol install
- iOS tidak support `beforeinstallprompt` event
- Hint popup muncul otomatis di iPhone setelah 5 detik
- Instruksi: tap Share → Add to Home Screen

### Splash screen tidak hilang
- Cek DevTools → Console untuk error JS
- Splash auto-hide setelah iframe load atau max 6 detik (fallback)

### Iframe tidak load
- Cek URL Apps Script valid (buka langsung di browser)
- Cek Apps Script deployment: **Who has access** = **Anyone**
- Cek `setXFrameOptionsMode(ALLOWALL)` di Code.gs doGet()

---

## 📞 Bantuan

Kalau ada masalah, cek:
1. DevTools **Console** untuk error
2. DevTools **Application** → **Manifest** untuk warning
3. DevTools **Application** → **Service Workers** untuk SW status

URL test PWA: `https://{username}.github.io/lumina-pwa/`

---

## 📄 License & Credits

- **Brand**: Lumina © FISKLOPEDIA
- **Font**: Plus Jakarta Sans (Google Fonts, OFL License)
- **Icons**: Generated custom untuk Lumina branding
- **Theme**: Indigo-Violet palette, dark mode default

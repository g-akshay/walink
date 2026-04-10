<div align="center">

<img src="assets/logo.svg" alt="WaLink" height="52" />

<br/>
<br/>

**Open a WhatsApp chat with anyone — instantly. No saving contacts.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20it%20now-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://g-akshay.github.io/walink/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-075E54?style=for-the-badge&logo=pwa&logoColor=white)](#)
[![Single File](https://img.shields.io/badge/Distribution-Single%20HTML-128C7E?style=for-the-badge&logo=html5&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-8b949e?style=for-the-badge)](LICENSE)

<br/>

<img src="assets/screenshot.png" alt="WaLink interface" width="280" />

</div>

---

## What is WaLink?

WaLink is a zero-install, single-file Progressive Web App that generates a `wa.me` deep link for any phone number — letting you jump straight into a WhatsApp conversation without adding the person to your contacts first.

Send the `index.html` to a friend, open it in a browser, or install it to your home screen. It just works.

---

## Features

| | |
|---|---|
| **No contact saving** | Start a chat by typing any number — WhatsApp opens directly |
| **Smart country detection** | Auto-detects your country via IP and pre-fills the dial code |
| **Clipboard detection** | Tap the invite chip to paste a copied number in one step |
| **PWA — installable** | Add to home screen on iOS & Android; works offline |
| **Single HTML file** | Zero dependencies, zero build step — share a single file |
| **Privacy-first clipboard** | Never asks for clipboard permission on load; only when you tap "Paste" |

---

## Preview

<div align="center">
<img src="assets/screenshot.png" alt="WaLink app screenshot" width="320" />
</div>

---

## Try it

**[👉 Open WaLink](https://g-akshay.github.io/walink/)**

Or download `index.html` and open it directly in any browser.

---

## How it works

```
1. App detects your country code from your IP address
2. Paste or type any phone number
3. Tap "Open WhatsApp" → wa.me link opens the chat instantly
```

---

## Run locally

No build step needed — just serve the file:

```bash
# Python
python -m http.server

# Node.js
npx serve .
```

Then open `http://localhost:8000` (or the port shown).

---

## Project structure

```
walink/
├── index.html          ← self-contained app (CSS + JS inlined)
├── manifest.json       ← PWA manifest
├── sw.js               ← service worker (offline support)
├── assets/
│   ├── icons/          ← app icons (192px, 512px)
│   ├── css/styles.css  ← source stylesheet
│   └── js/app.js       ← source JavaScript
└── LICENSE
```

> `index.html` is the distributable — it has everything inlined. The `assets/` folder contains the source files for editing and the icons used by the PWA.

---

## Tech

- Vanilla HTML5 · CSS3 · ES6 — no frameworks, no bundler
- [ip-api.com](https://ip-api.com) — lightweight, key-free IP geolocation
- Service Workers — offline caching via PWA

---

## License

[MIT](LICENSE) · Made with ♥ by [g-akshay](https://github.com/g-akshay)

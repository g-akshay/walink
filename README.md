# WaLink — WhatsApp Link Generator

A beautiful, minimal Progressive Web App (PWA) to instantly start a WhatsApp chat with any phone number, without needing to save them as a contact first.

## Demo

**[👉 Try WaLink Live Demo](https://g-akshay.github.io/walink/)**

## Features

- **No Contact Saving:** Start a chat instantly by just typing the number.
- **Smart Geolocation:** Automatically detects your country and sets the correct dial code.
- **Clipboard Detection:** Detects phone numbers copied to your clipboard for 1-click chatting.
- **Progressive Web App (PWA):** Installable on iOS and Android. Works offline and feels like a native app.
- **Pixel-Perfect UI:** Branded, clean, dark-themed responsive design with subtle micro-animations.

## How it works

1. The app detects your country code automatically using IP geolocation.
2. If you have a phone number copied, it will prompt you to use it.
3. Otherwise, simply enter the phone number.
4. Tap "Open WhatsApp" and it will instantly launch the WhatsApp app or WhatsApp Web to that specific chat.

## Local Development

Just serve the static files:

```bash
# Using python
python -m http.server
# Or using Node.js
npx serve .
```

## Technologies

- Vanilla HTML5, CSS3, ES6 JavaScript
- IP-API for lightweight geolocation
- Local Service Workers for PWA support

## License

This project is licensed under the [MIT License](LICENSE).

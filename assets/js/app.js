/* ============================================================
   WaLink – app.js
   Country data, geolocation, phone validation, PWA install
   ============================================================ */

'use strict';

// --------------- Country Data ---------------
// Ordered: India first, US second, then rest alphabetically
const COUNTRIES = [
  { name: 'India',           dial: '+91',  flag: '🇮🇳', code: 'IN', digits: 10 },
  { name: 'United States',   dial: '+1',   flag: '🇺🇸', code: 'US', digits: 10 },
  { name: 'Afghanistan',     dial: '+93',  flag: '🇦🇫', code: 'AF', digits: 9  },
  { name: 'Albania',         dial: '+355', flag: '🇦🇱', code: 'AL', digits: 9  },
  { name: 'Algeria',         dial: '+213', flag: '🇩🇿', code: 'DZ', digits: 9  },
  { name: 'Argentina',       dial: '+54',  flag: '🇦🇷', code: 'AR', digits: 10 },
  { name: 'Australia',       dial: '+61',  flag: '🇦🇺', code: 'AU', digits: 9  },
  { name: 'Austria',         dial: '+43',  flag: '🇦🇹', code: 'AT', digits: 10 },
  { name: 'Bangladesh',      dial: '+880', flag: '🇧🇩', code: 'BD', digits: 10 },
  { name: 'Belgium',         dial: '+32',  flag: '🇧🇪', code: 'BE', digits: 9  },
  { name: 'Brazil',          dial: '+55',  flag: '🇧🇷', code: 'BR', digits: 11 },
  { name: 'Canada',          dial: '+1',   flag: '🇨🇦', code: 'CA', digits: 10 },
  { name: 'Chile',           dial: '+56',  flag: '🇨🇱', code: 'CL', digits: 9  },
  { name: 'China',           dial: '+86',  flag: '🇨🇳', code: 'CN', digits: 11 },
  { name: 'Colombia',        dial: '+57',  flag: '🇨🇴', code: 'CO', digits: 10 },
  { name: 'Czech Republic',  dial: '+420', flag: '🇨🇿', code: 'CZ', digits: 9  },
  { name: 'Denmark',         dial: '+45',  flag: '🇩🇰', code: 'DK', digits: 8  },
  { name: 'Egypt',           dial: '+20',  flag: '🇪🇬', code: 'EG', digits: 10 },
  { name: 'Ethiopia',        dial: '+251', flag: '🇪🇹', code: 'ET', digits: 9  },
  { name: 'Finland',         dial: '+358', flag: '🇫🇮', code: 'FI', digits: 9  },
  { name: 'France',          dial: '+33',  flag: '🇫🇷', code: 'FR', digits: 9  },
  { name: 'Germany',         dial: '+49',  flag: '🇩🇪', code: 'DE', digits: 11 },
  { name: 'Ghana',           dial: '+233', flag: '🇬🇭', code: 'GH', digits: 9  },
  { name: 'Greece',          dial: '+30',  flag: '🇬🇷', code: 'GR', digits: 10 },
  { name: 'Hong Kong',       dial: '+852', flag: '🇭🇰', code: 'HK', digits: 8  },
  { name: 'Hungary',         dial: '+36',  flag: '🇭🇺', code: 'HU', digits: 9  },
  { name: 'Indonesia',       dial: '+62',  flag: '🇮🇩', code: 'ID', digits: 12 },
  { name: 'Iran',            dial: '+98',  flag: '🇮🇷', code: 'IR', digits: 10 },
  { name: 'Iraq',            dial: '+964', flag: '🇮🇶', code: 'IQ', digits: 10 },
  { name: 'Ireland',         dial: '+353', flag: '🇮🇪', code: 'IE', digits: 9  },
  { name: 'Israel',          dial: '+972', flag: '🇮🇱', code: 'IL', digits: 9  },
  { name: 'Italy',           dial: '+39',  flag: '🇮🇹', code: 'IT', digits: 10 },
  { name: 'Japan',           dial: '+81',  flag: '🇯🇵', code: 'JP', digits: 10 },
  { name: 'Jordan',          dial: '+962', flag: '🇯🇴', code: 'JO', digits: 9  },
  { name: 'Kenya',           dial: '+254', flag: '🇰🇪', code: 'KE', digits: 9  },
  { name: 'Kuwait',          dial: '+965', flag: '🇰🇼', code: 'KW', digits: 8  },
  { name: 'Malaysia',        dial: '+60',  flag: '🇲🇾', code: 'MY', digits: 10 },
  { name: 'Mexico',          dial: '+52',  flag: '🇲🇽', code: 'MX', digits: 10 },
  { name: 'Morocco',         dial: '+212', flag: '🇲🇦', code: 'MA', digits: 9  },
  { name: 'Myanmar',         dial: '+95',  flag: '🇲🇲', code: 'MM', digits: 9  },
  { name: 'Nepal',           dial: '+977', flag: '🇳🇵', code: 'NP', digits: 10 },
  { name: 'Netherlands',     dial: '+31',  flag: '🇳🇱', code: 'NL', digits: 9  },
  { name: 'New Zealand',     dial: '+64',  flag: '🇳🇿', code: 'NZ', digits: 9  },
  { name: 'Nigeria',         dial: '+234', flag: '🇳🇬', code: 'NG', digits: 10 },
  { name: 'Norway',          dial: '+47',  flag: '🇳🇴', code: 'NO', digits: 8  },
  { name: 'Oman',            dial: '+968', flag: '🇴🇲', code: 'OM', digits: 8  },
  { name: 'Pakistan',        dial: '+92',  flag: '🇵🇰', code: 'PK', digits: 10 },
  { name: 'Philippines',     dial: '+63',  flag: '🇵🇭', code: 'PH', digits: 10 },
  { name: 'Poland',          dial: '+48',  flag: '🇵🇱', code: 'PL', digits: 9  },
  { name: 'Portugal',        dial: '+351', flag: '🇵🇹', code: 'PT', digits: 9  },
  { name: 'Qatar',           dial: '+974', flag: '🇶🇦', code: 'QA', digits: 8  },
  { name: 'Romania',         dial: '+40',  flag: '🇷🇴', code: 'RO', digits: 9  },
  { name: 'Russia',          dial: '+7',   flag: '🇷🇺', code: 'RU', digits: 10 },
  { name: 'Saudi Arabia',    dial: '+966', flag: '🇸🇦', code: 'SA', digits: 9  },
  { name: 'Singapore',       dial: '+65',  flag: '🇸🇬', code: 'SG', digits: 8  },
  { name: 'South Africa',    dial: '+27',  flag: '🇿🇦', code: 'ZA', digits: 9  },
  { name: 'South Korea',     dial: '+82',  flag: '🇰🇷', code: 'KR', digits: 10 },
  { name: 'Spain',           dial: '+34',  flag: '🇪🇸', code: 'ES', digits: 9  },
  { name: 'Sri Lanka',       dial: '+94',  flag: '🇱🇰', code: 'LK', digits: 9  },
  { name: 'Sweden',          dial: '+46',  flag: '🇸🇪', code: 'SE', digits: 9  },
  { name: 'Switzerland',     dial: '+41',  flag: '🇨🇭', code: 'CH', digits: 9  },
  { name: 'Tanzania',        dial: '+255', flag: '🇹🇿', code: 'TZ', digits: 9  },
  { name: 'Thailand',        dial: '+66',  flag: '🇹🇭', code: 'TH', digits: 9  },
  { name: 'Tunisia',         dial: '+216', flag: '🇹🇳', code: 'TN', digits: 8  },
  { name: 'Turkey',          dial: '+90',  flag: '🇹🇷', code: 'TR', digits: 10 },
  { name: 'UAE',             dial: '+971', flag: '🇦🇪', code: 'AE', digits: 9  },
  { name: 'Uganda',          dial: '+256', flag: '🇺🇬', code: 'UG', digits: 9  },
  { name: 'Ukraine',         dial: '+380', flag: '🇺🇦', code: 'UA', digits: 9  },
  { name: 'United Kingdom',  dial: '+44',  flag: '🇬🇧', code: 'GB', digits: 10 },
  { name: 'Venezuela',       dial: '+58',  flag: '🇻🇪', code: 'VE', digits: 10 },
  { name: 'Vietnam',         dial: '+84',  flag: '🇻🇳', code: 'VN', digits: 9  },
  { name: 'Yemen',           dial: '+967', flag: '🇾🇪', code: 'YE', digits: 9  },
  { name: 'Zimbabwe',        dial: '+263', flag: '🇿🇼', code: 'ZW', digits: 9  },
];

// Country code → Country mapping
const CC_MAP = Object.fromEntries(COUNTRIES.map(c => [c.code, c]));

// Sorted longest-dial-code first for unambiguous prefix matching
// (+91 must be tried before +1, +380 before +38, etc.)
const COUNTRIES_BY_DIAL_LEN = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);

// --------------- Country Code Detection ---------------
// Given a raw digit string, returns { country, local } or null.
// Triggers only when the digit string is plausibly international:
//   • user typed a '+' prefix, OR
//   • digit count exceeds the expected local length for the selected country
function detectCountryCode(digits) {
  for (const country of COUNTRIES_BY_DIAL_LEN) {
    const code = country.dial.slice(1); // strip '+'
    if (!digits.startsWith(code)) continue;
    const local = digits.slice(code.length);
    if (local.length >= 6 && local.length <= 15) {
      return { country, local };
    }
  }
  return null;
}

// --------------- State ---------------
let selectedCountry = COUNTRIES[0]; // default India
let dropdownOpen    = false;

// --------------- DOM refs ---------------
const phoneInput      = document.getElementById('phoneInput');
const countryBtn      = document.getElementById('countryBtn');
const selectedFlag    = document.getElementById('selectedFlag');
const selectedDial    = document.getElementById('selectedDial');
const countryDropdown = document.getElementById('countryDropdown');
const countrySearch   = document.getElementById('countrySearch');
const countryList     = document.getElementById('countryList');
const openChatBtn     = document.getElementById('openChatBtn');
const resultArea      = document.getElementById('resultArea');
const resultLink      = document.getElementById('resultLink');
const copyBtn         = document.getElementById('copyBtn');
const errorMsg        = document.getElementById('errorMsg');
const clipboardBanner  = document.getElementById('clipboardBanner');
const clipboardNumber  = document.getElementById('clipboardNumber');
const clipboardUseBtn  = document.getElementById('clipboardUseBtn');
const clipboardInvite  = document.getElementById('clipboardInvite');
const installToast    = document.getElementById('installToast');
const installToastBtn = document.getElementById('installToastBtn');
const installToastClose = document.getElementById('installToastClose');

// --------------- Init ---------------
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('walink_country');
  const initial = (saved && CC_MAP[saved]) ? CC_MAP[saved] : COUNTRIES[0];
  setCountry(initial);
  renderCountryList(COUNTRIES);
  checkClipboard();
  registerSW();
  setupInstallPrompt();
});

// --------------- Service Worker ---------------
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// --------------- Clipboard ---------------
async function checkClipboard() {
  if (!navigator.clipboard || !navigator.clipboard.readText) return;

  // Check permission state without triggering a prompt.
  // If never asked ('prompt'), show an opt-in hint so the browser dialog
  // appears only after the user intentionally taps "Paste a copied number".
  if (navigator.permissions) {
    try {
      const perm = await navigator.permissions.query({ name: 'clipboard-read' });
      if (perm.state === 'denied') return;
      if (perm.state === 'prompt') {
        clipboardInvite.hidden = false;
        return;
      }
      // 'granted' — fall through and read silently
    } catch (_) {
      // permissions API unsupported; fall through and attempt read
    }
  }

  readClipboard();
}

function readClipboard() {
  navigator.clipboard.readText()
    .then(text => {
      const clean = text.trim().replace(/\D/g, '');
      clipboardInvite.hidden = true;
      if (clean.length >= 7 && clean.length <= 15) {
        clipboardNumber.textContent = text.trim();
        clipboardBanner.hidden = false;
      }
    })
    .catch(() => { clipboardInvite.hidden = true; });
}

clipboardInvite && clipboardInvite.addEventListener('click', readClipboard);

clipboardUseBtn && clipboardUseBtn.addEventListener('click', () => {
  const digits = clipboardNumber.textContent.trim().replace(/\D/g, '');
  const detected = detectCountryCode(digits);
  if (detected) {
    setCountry(detected.country);
    phoneInput.value = detected.local;
  } else {
    phoneInput.value = digits;
  }
  clipboardBanner.hidden = true;
  phoneInput.focus();
  validateAndPreview();
});

// --------------- Country Dropdown ---------------
function renderCountryList(list) {
  countryList.innerHTML = '';
  list.forEach(c => {
    const li = document.createElement('li');
    li.className = 'country-item' + (c.code === selectedCountry.code ? ' selected' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', c.code === selectedCountry.code);
    li.dataset.code = c.code;
    li.innerHTML = `
      <span class="country-item-flag">${c.flag}</span>
      <span class="country-item-name">${c.name}</span>
      <span class="country-item-dial">${c.dial}</span>
    `;
    li.addEventListener('click', () => {
      setCountry(c);
      closeDropdown();
      phoneInput.focus();
      validateAndPreview();
    });
    countryList.appendChild(li);
  });
}

function setCountry(c) {
  selectedCountry = c;
  selectedFlag.textContent = c.flag;
  selectedDial.textContent = c.dial;
  localStorage.setItem('walink_country', c.code);
}

function openDropdown() {
  dropdownOpen = true;
  countryDropdown.hidden = false;
  countryBtn.setAttribute('aria-expanded', 'true');
  countrySearch.value = '';
  renderCountryList(COUNTRIES);
  setTimeout(() => countrySearch.focus(), 80);
}

function closeDropdown() {
  dropdownOpen = false;
  countryDropdown.hidden = true;
  countryBtn.setAttribute('aria-expanded', 'false');
}

countryBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownOpen ? closeDropdown() : openDropdown();
});

countrySearch.addEventListener('input', () => {
  const q = countrySearch.value.toLowerCase();
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.dial.includes(q) ||
    c.code.toLowerCase().includes(q)
  );
  renderCountryList(filtered);
});

countrySearch.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDropdown();
});

document.addEventListener('click', e => {
  if (dropdownOpen && !countryDropdown.contains(e.target) && e.target !== countryBtn) {
    closeDropdown();
  }
});

// --------------- Phone Input ---------------
phoneInput.addEventListener('input', () => {
  const raw = phoneInput.value;
  const hasPlus = raw.startsWith('+');
  const digits = raw.replace(/\D/g, '');

  // Attempt country detection when the input looks international:
  // explicit '+' prefix, or digit count exceeds the selected country's expected length.
  if (digits.length >= 8 && (hasPlus || digits.length > selectedCountry.digits)) {
    const detected = detectCountryCode(digits);
    if (detected) {
      setCountry(detected.country);
      phoneInput.value = detected.local;
      validateAndPreview();
      return;
    }
  }

  phoneInput.value = digits;
  validateAndPreview();
});

phoneInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleOpenChat();
});

// --------------- Validation & Preview ---------------
function validateAndPreview() {
  const num = phoneInput.value.trim();
  hideError();

  if (!num) {
    resultArea.hidden = true;
    return;
  }

  if (num.length < 6) {
    resultArea.hidden = true;
    return;
  }

  const full = `${selectedCountry.dial}${num}`;
  const url  = `https://wa.me/${full.replace('+', '')}`;
  resultLink.textContent = url;
  resultLink.href = url;
  resultArea.hidden = false;
}

// --------------- Open Chat ---------------
openChatBtn.addEventListener('click', handleOpenChat);

function handleOpenChat() {
  const num = phoneInput.value.trim();

  if (!num) {
    showError('Please enter a phone number.');
    shakeInput();
    return;
  }

  if (num.length < 6) {
    showError('Number seems too short. Please check and try again.');
    shakeInput();
    return;
  }

  hideError();
  const full = `${selectedCountry.dial}${num}`;
  const url  = `https://wa.me/${full.replace('+', '')}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// --------------- Copy Button ---------------
copyBtn.addEventListener('click', () => {
  const url = resultLink.href;
  if (!url) return;
  navigator.clipboard.writeText(url).then(() => {
    copyBtn.classList.add('copied');
    copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    }, 2000);
  }).catch(() => {});
});

// --------------- Error helpers ---------------
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.hidden = false;
}

function hideError() {
  errorMsg.hidden = true;
}

function shakeInput() {
  const group = document.getElementById('phoneInputGroup');
  group.style.animation = 'none';
  group.offsetHeight; // reflow
  group.style.animation = 'shake .4s cubic-bezier(.36,.07,.19,.97) both';
  group.addEventListener('animationend', () => { group.style.animation = ''; }, { once: true });
}

// --------------- PWA Install Prompt ---------------
let deferredPrompt = null;

function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    // Show after 3s if not already installed
    setTimeout(() => {
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        installToast.hidden = false;
      }
    }, 3000);
  });

  installToastBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        installToast.hidden = true;
      });
    }
  });

  installToastClose.addEventListener('click', () => {
    installToast.hidden = true;
  });
}

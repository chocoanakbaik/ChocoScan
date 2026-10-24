# ChocoScan

ChocoScan is a browser-based URL pattern checker prototype. The interface is built with HTML, Tailwind CSS, custom CSS, and vanilla JavaScript. It currently has no backend.

## Current features

- Client-side URL format validation.
- Heuristic checks for HTTPS, IP-host URLs, Punycode labels, long hostnames, known URL shorteners, selected TLDs, long URLs, suspicious path keywords, encoded characters, and possible brand-name patterns.
- Human-readable findings with a transparent explanation for each check.
- Responsive interface for desktop and mobile.
- Clearly labeled advertising placeholder separated from security results.
- No accounts, URL submission, credential collection, or persistent scan history.

## Important limitations

This version only examines the URL string entered by the user. It does **not** open the target URL, fetch the target page, verify domain ownership, query a threat-intelligence database, or check live malware/phishing reports. Results are heuristic signals, not a definitive safety verdict. A low-risk result does not mean a site is safe.

## Project structure

- `index.html` — main page and scanner interface
- `assets/css/style.css` — responsive design system
- `assets/js/app.js` — local URL analysis and result rendering
- `assets/images/favicon.svg` — app icon

## Run locally

Open `index.html` in a modern browser. Tailwind Play CDN and the optional Google Fonts are loaded externally for styling; the URL analysis itself runs locally in the browser.

## Roadmap

A future version can add a trusted URL reputation provider, server-side scanning, rate limiting, abuse protection, and clear privacy controls. Those capabilities are not implemented in this prototype yet.

## Brand and safety boundary

ChocoScan is the product interface. The separate `ChocoScan-demo` repository is for isolated demonstrations. Aggressive simulated pop-ups and deceptive-page examples belong only in the demo environment and should not be used to trap real visitors.

# ChocoScan — product notes recovered from prior discussions

This document keeps the actual ChocoScan product separate from the ChocoScan Demo repository.

## Product identity and current direction

- ChocoScan is the main product; `ChocoScan-demo` is a separate demo project.
- The current requested frontend stack is HTML, Tailwind CSS, and vanilla JavaScript, without a backend for this prototype.
- The interface should be responsive on laptop and mobile.
- The repository should remain public while development is in progress. The user previously intended to make it private after work is finished; do not change visibility during development without a direct instruction.
- Advertising may be shown on ChocoScan, ChocoScan Demo, and Demo Modes 1–4. Real ads must be clearly labeled and visually separated from simulated security warnings. Responsive ad placement must not cover controls or cause horizontal overflow.

## Current implementation

- URL input with basic validation.
- Local heuristic inspection of URL structure.
- Findings include HTTPS, direct IP host, Punycode labels, subdomain count, known URL shorteners, selected TLD patterns, long URLs, common sensitive words in paths/parameters, encoded characters, and possible brand-name lookalikes.
- Result copy explains that individual signals are not definitive proof.
- URL analysis runs in the browser. No URL is submitted to a server or opened by the scanner.
- No credential form, login capture, persistent scan history, forced redirect, pop-under, pointer lock, or deceptive close button.
- Advertising area is currently a labeled placeholder. No live ad-provider script was added because the provider-specific publisher snippet and placement configuration were not present in the retrieved project context.

## Ideas from the separate demo discussion

The old demo request described aggressive fake-page behavior inspired by ad-heavy deceptive websites: stacked pop-ups, floating banners and overlays, varied positions and sizes, click-triggered extra pop-ups, a dark modal backdrop, fake warning/push-notification visuals, and bait-style button labels. The user wanted it to feel irritating while remaining responsive on laptop and phone.

Those effects belong in the isolated demo modes, not the main ChocoScan product. The earlier discussion also referenced a demo scan link:
- https://rainbow-strudel-540ea7.netlify.app/
- https://jwplyr.com/d/40a82ix8pwwz

Other Netlify links were supplied for the demo project:
- https://phenomenal-cannoli-c97e71.netlify.app/
- https://frolicking-unicorn-710456.netlify.app/
- https://app.netlify.com/projects/rad-lamington-366bdd/
- https://app.netlify.com/projects/rainbow-strudel-540ea7/

## Demo repository concepts (not part of the main product)

The separate demo hub was described as having four modes:
1. Scan/alert interface simulation.
2. Connectly login-page simulation.
3. TradePilot-style dashboard with notifications.
4. A local popup-behavior simulation / project reference.

Credential screens, if shown for education, must be visual-only and must not submit or store passwords. Deceptive browser behavior should not escape the controlled demo: no forced navigation, unsolicited tabs, pointer locking, or a close control that secretly redirects users.

## Product gaps and possible next phase

The current prototype is not a real threat-intelligence scanner. To provide live reputation results, a future phase would need a trusted reputation provider or backend integration, documented data handling, rate limits, error states, and abuse controls. Do not present heuristic-only results as a verified malware or phishing verdict.

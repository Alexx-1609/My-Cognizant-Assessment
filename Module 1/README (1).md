# Local Community Event Portal

A production-ready responsive community events portal built with **HTML5, CSS3, Bootstrap 5, JavaScript (ES6+)** and **jQuery**. Built for Cognizant DN 5.0 Module 1 evaluation.

## 🚀 Features

- Browse, search, filter, and register for community events
- Tabs for **Upcoming / Ongoing / Past** events
- Dynamic event cards rendered from `events.json` (with fallback)
- **Geolocation** "Find Nearby Events" with high accuracy + error handling
- **localStorage** for preferred category, **sessionStorage** for temp registration
- **Clear Preferences** button
- Promo video with `oncanplay` ready state
- Feedback section with `onblur`, `onchange`, `onclick`, `ondblclick`, `keydown` events
- Image gallery — double-click any image to zoom
- Bootstrap **Modal**, **Accordion (FAQ)**, **Tabs/Pills**, **Navbar**, **Cards**
- Glassmorphism UI, gradients, hover effects, smooth scrolling, fixed footer
- Fully responsive (mobile/tablet/desktop) via Bootstrap grid + custom media queries
- Multi-column CSS Community News
- AJAX registration with success/failure UI
- Dashboard stats updating live

## 📁 Structure

```
project/
├── index.html
├── help.html
├── styles.css
├── main.js
├── README.md
└── assets/
    ├── images/
    ├── videos/
    └── data/
        └── events.json
```

## ▶️ Run locally

Because `main.js` fetches `events.json`, serve via a local web server:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node
npx serve .
```

Then visit <http://localhost:8000>.

> The app gracefully falls back to inline event data if the JSON fetch fails (e.g. when opening `index.html` directly via `file://`).

## ✅ Module Coverage

- **HTML5**: semantic tags, forms, validation, video, geolocation, storage
- **CSS3**: selectors, colors, gradients, fonts, box model, multi-column, media queries, flex/grid
- **Bootstrap 5**: navbar, grid, cards, forms, buttons, tabs, modal, accordion, icons, utilities
- **JavaScript**: ES6 classes, closures, async/await, fetch, DOM, events, error handling, jQuery

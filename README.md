# 🛡️ JG Pest Control™ — Premier Modern Pest Eradication Web Platform

![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)
![Status: Active](https://img.shields.io/badge/Deployment-Live-success.svg)
![Theme: Light%20Glassmorphism](https://img.shields.io/badge/Theme-Porcelain%20Mint%20Glass-10b981.svg)
![Reviews: Trustpilot%204.7](https://img.shields.io/badge/Trustpilot-4.7%2F5.0-00b67a.svg)

> **Award-winning, state-of-the-art pest control and thermal eradication web application.**
> Features a high-contrast Porcelain Mint Light Glassmorphism design system, interactive before/after thermal scanner comparison slider, 30-second AI diagnostic triage quiz, automated appointment booking wizard with dynamic scheduling, and "Smarty" AI pest assistant chatbot.

---

## 🌟 Key Features

1. **💎 Porcelain Mint Light Glassmorphism UI**
   - Crystal glass tiles with multi-layer frosted blur (`backdrop-filter: blur(20px)`), luminous emerald borders, and responsive hover sheens.
   - Dual-mode support (Light Porcelain Glass default with Dark Obsidian Emerald toggle).

2. **🎠 Silky-Smooth Carousels & Motion Graphics**
   - Hardware-accelerated sliding with `cubic-bezier(0.16, 1, 0.3, 1)` easing.
   - Dynamic interactive pagination indicator pills for **Specialist Pest Solutions**, **Nationwide Technical Teams**, and **Verified Trustpilot Reviews**.
   - Auto-play with pause-on-hover and mobile touch drag/swipe support.

3. **📅 Automated Booking Appointment System & Scheduler**
   - **Step 1:** Property layout & target pest selection.
   - **Step 2:** Service tier selection (*Eco-Thermal Heat Eradication*, *Precision Targeted Eradication*, *Canine K9 Inspection*, *Emergency 2-Hr Rush*).
   - **Step 3:** Real interactive 14-day dynamic date picker and arrival window selector (Morning, Afternoon, Evening, Immediate Rush).
   - **Step 4:** Dispatch details with optional **Discreet Unmarked Vehicle** toggle.
   - **Step 5:** Instant booking confirmation with reference code (e.g. `JG-XXXX-UK`), live status tracker, and `.ics` Google/Apple Calendar export.

4. **🔬 Interactive Thermal Scanner (Before & After Eradication)**
   - Dual-layer comparison slider revealing the thermal infrared heatmap vs. the 100% sanitized living space.
   - Live telemetry dashboard with real-time target temperature (60°C), active pest counter, chemical residue (0.0 mg), and eradication confidence score.

5. **🧠 30-Second Pest Diagnostic Quiz (AI Triage)**
   - Guided biological pest identification based on location, symptoms, and duration.
   - Single-click **Auto-Fill Scheduler with this Diagnosis** button to seamlessly transition to booking.

6. **🤖 "Smarty" — Intelligent Pest Assistant Chatbot**
   - 3D mascot avatar, quick suggestion chips, Web Audio API sound effects, and intelligent natural conversational answers with scheduling handoffs.

7. **📡 Live Postcode Radar & Social Proof Toasts**
   - Real-time UK postcode GPS availability scanner.
   - Rotating live booking toasts across major UK cities.

---

## 📂 Project Architecture

```
pest-control-website/
├── index.html       # Semantic HTML5 markup, SEO meta tags, Schema.org JSON-LD
├── styles.css       # Complete Vanilla CSS design system, glassmorphism, animations
├── app.js           # Interactive engine (scheduler, carousels, thermal slider, Smarty AI)
├── assets/          # Authentic imagery, team photos, thermal displays, 3D avatar
├── .gitignore       # Git exclusion rules
└── README.md        # Documentation
```

---

## 🚀 Running Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/ShinjiniMondal/pest-control-website.git
   cd pest-control-website
   ```

2. Serve with any static web server:
   ```bash
   # Using Python
   python -m http.server 3000

   # Or using Node.js
   npx serve
   ```

3. Open `http://localhost:3000` in your web browser.

---

## 📄 License

This project is licensed under the MIT License.

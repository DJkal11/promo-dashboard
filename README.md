# 📦 Promo Dashboard SPA (React + Angular)

This repository contains a project implemented in **two front-end stacks**:

- A **React** single-page app using Vite, SWR, and plain `fetch`
- An **Angular** single-page app using HttpClient and RxJS

Both apps implement the same core features:

- ✅ List promotional offers
- 🔍 Filter by category, status, and date
- 🔁 Opt-in / Opt-out for promotions
- 📱 Responsive, simple UI
- 🧪 Unit tests (API + filtering + opt-in/out logic)
- 🌐 Environment-based API configuration pointing to a mock JSON server

---

## 📁 Project Structure

```text
promo-dashboard/
├── api/
│   └── db.json          # Mock promotions data for json-server
├── react-app/           # React + Vite implementation
│   └── README.md        # Detailed React documentation
├── angular-app/         # Angular implementation
│   └── README.md        # Detailed Angular documentation
└── README.md            # (this file) high-level overview

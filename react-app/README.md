# 📦 Promo Dashboard (React)

A minimal, clean single-page app that lists promotional offers, supports client-side filtering, and lets users opt in/out — built with **React 18 + Vite**, **SWR**, and **plain `fetch`** (uses axios).  
Includes unit tests with **Jest + React Testing Library**.

> This README covers the React app (`react-app/`).  

---

## 🚀 Features

- ✅ List promotions with title, category, status, and dates  
- 🔍 Filter by **category**, **status**, **start date**, and **end date**  
- 🔁 Opt-in / Opt-out toggle (updates both `optedIn` and `active`)  
- 📱 Responsive and accessible UI  
- ⚡ SWR caching and revalidation  
- 🧪 Unit tests (API helpers, list rendering/filtering, opt-in/out logic)  
- 🌐 Environment-based API configuration using `.env` (`VITE_API_BASE_URL`)

---

## ⚙️ Requirements

- **Node.js 18+** recommended  
  - If you use Node 14 or 16, use `json-server@0.17` for compatibility.

# React App Setup & Testing Guide

##  Initial Setup


### Create a .env file in react-app/:

VITE_API_BASE_URL=http://localhost:3001

### cd to root folder 

`npm i -g json-server`
`json-server --watch ../api/db.json --port 3001`

`cd react-app`
`npm install`
`npm run dev`


## 🧪 Testing

`npm test`

### If configs change:

`npx jest --clearCache`
`npm test`
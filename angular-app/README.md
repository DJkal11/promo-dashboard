📦 Promo Dashboard - **Angular Version**
========================================

A clean, minimal Angular application that displays promotional offers, supports client-side filtering, and provides opt-in/opt-out actions - mirroring the React version of the project.

This app is built with:

*   **Angular 20+**
    
*   **TypeScript**
    
*   **Standalone Components**
    
*   **SCSS styling**
    
*   **RxJS + HttpClient**
    
*   **Karma + Jasmine** for unit testing
    
*   **JSON Server** as a mock backend API
    

🚀 Features
===========

*   **Promotion List**
    
*   **Client-Side Filters**
    
    *   Category
        
    *   Status
        
    *   Start Date
        
    *   End Date
        
*   **Opt-in / Opt-out Toggle**
    
    *   PATCH request updates optedIn + active
        
*   **Environment-based API URL**
    
*   **Reusable Services**
    
*   **Pure filtering function (same as React)**
    
*   **Fully tested**
    
    *   Filters
        
    *   GET / PATCH API calls
        
    *   Components rendering
        

⚙️ Prerequisites
================

You need:

*   **Node.js v20.19+**
    
*   **Angular CLI**
    

Install CLI:
`   npm install -g @angular/cli   `

🛠️ 1. Install Dependencies
===========================

`cd angular-app`
`npm install`

🔧 2. Create the Environment File
=================================

Angular uses environment.ts instead of .env.

In:
`   src/environments/environment.ts   `

Set:

`   export const environment = {    apiBaseUrl: 'http://localhost:3001',  };   `

🗄️ 3. Start the Mock API (JSON Server)
=======================================

From the project root (NOT inside angular-app):

`npm install -g json-server`  
`json-server --watch api/db.json --port 3001`

This exposes:

*   GET /promotions
    
*   PATCH /promotions/:id
    

▶️ 4. Run the Angular App
=========================

`cd angular-app`  
` npm start `

Your app will be available at:

`   http://localhost:4200   `

🧪 Testing
==========

Angular uses **Karma + Jasmine**.

The following tests are included:

### ✔ Promotion Service Tests

*   GET should return promotions
    
*   PATCH should update both optedIn and active
    

### ✔ Filtering Logic Tests

*   Category filter
    
*   Status filter
    
*   Start date / end date
    
*   Combined filters
    
*   Exactly matches React logic
    

To run all tests:

`   npm test   `

This opens the Karma test runner in Chrome.

You can enable watch mode automatically by leaving the window open.

🔄 Common Testing Commands
==========================

Clear Karma/Jasmine cache (rarely needed):

`   rm -rf node_modules  npm install   `

Re-run tests headlessly:

`   ng test --watch=false --browsers=ChromeHeadless   `
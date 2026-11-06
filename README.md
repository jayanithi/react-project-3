# Orbit Project Management System

A responsive frontend-only project management application using React JSX, Create React App, Material UI and MUI Icons.

## Requirements
- Node.js 18 or 20 LTS
- npm

## Install and run
```bash
npm install
npm start
```
Open http://localhost:3000

## Build
```bash
npm run build
```

## Notes
- This project uses Create React App, not Vite.
- CRA starts from `src/index.js`. The requested `src/main.jsx` is also included as the application entry component export.
- All application pages and reusable UI components are JSX files.
- Data is stored in browser LocalStorage under `orbit_projects` and `orbit_tasks`.
- This is a frontend demo; there is no backend or shared database.
- Responsive layout uses MUI breakpoints, flexible Grid layouts, mobile navigation Drawer and horizontally scrollable task table.

# Military Road Map

[military-road-map](https://military-road-map.vercel.app/)

## Problem We are Solving

## About this project

## Technology

Frontend: React, Next.js
Backend: Next.js Serverless Functions (Node.js), MongoDB
Other: Next-Auth

Api Routes:
GET /api/user/checklists -> Returns user object with all checklists for logged in user
POST /api/user/checklists -> Modifies the checklist the user has for logged in user

GET /api/checklist/[name].js -> Gets the template for a specific checklist
POST /api/checklist/[name].js -> MOdifies a specific checklist

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
POST /api/user/checklists -> Modifies all the the user has for logged in user

GET /api/checklist/[type] -> Gets the template for a specific checklist
POST /api/checklist/[type] -> Modifies a specific checklist

GET /api/checklist/add/[type] ->Adds specified template checklist to the user's account
GET /api/checklists -> Return all names of template checklists. Could easily be modified to return all checklist templates

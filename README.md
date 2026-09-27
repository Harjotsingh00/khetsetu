# KhetSetu 🌱

**Local farm decisions. Shared agricultural intelligence.**

KhetSetu is a mobile-friendly farm companion for smallholder farmers. It brings weather, regional satellite vegetation imagery, crop and soil context, and regenerative practices into one practical daily workflow.

> Built for **Build with AI: Code for Communities — 2nd Edition**  
> **Track 4:** AgriN & Regenerative Agricultural Intelligence  
> **BRICS theme:** Cooperation

## Live demo

🚜 **[Open the KhetSetu demo](https://khetsetu-roan.vercel.app)**

## The problem

Smallholder farmers often have to make time-sensitive decisions using disconnected information: changing weather, soil-test results, crop symptoms, and advice that may not reflect local conditions. KhetSetu explores how an interoperable digital agriculture network could turn those signals into practical next steps while supporting regenerative farming.

## What KhetSetu does

- **Local weather:** Shows current conditions and a seven-day forecast for a selected town or the farmer’s shared location.
- **Weather-aware field notes:** Offers practical guidance, such as checking soil moisture before irrigating when rain is forecast.
- **Regional satellite context:** Displays NASA Terra MODIS vegetation-index imagery around the selected location.
- **Crop and season details:** Lets farmers record their crop, growth stage, and planting date, then estimates elapsed days and season progress.
- **Soil health guidance:** Accepts a farmer-entered soil score and suggests general regenerative practices.
- **Crop photo screening:** Lets a farmer submit a leaf photo and describe symptoms for an optional AI-generated first-look assessment.
- **Crop rotation ideas:** Provides regenerative rotation suggestions, with local suitability caveats.
- **Field journal:** Saves dated observations and farm activities in the browser.
- **Offline app shell:** Caches the app so saved farm details, journal entries, and checklist state remain available when connectivity drops.
- **BRICS cooperation concept:** Uses a common advisory structure that could support country-specific crops, languages, calendars, and trusted data sources.

## How it works

1. The farmer selects a location, crop, growth stage, planting date, and optional soil score.
2. KhetSetu fetches weather information from Open-Meteo and regional vegetation imagery from NASA GIBS.
3. The dashboard presents those signals alongside practical field notes.
4. If Gemini is configured, server-side functions can generate additional crop-aware advice or screen a submitted leaf photo.
5. The farmer records observations and actions in the local field journal.

## Technology

- HTML, CSS, and JavaScript
- Vercel static hosting and serverless Node.js functions
- Google Gemini API for optional AI advisory and image screening
- Open-Meteo Forecast and Geocoding APIs
- NASA GIBS WMS for Terra MODIS NDVI imagery
- Browser local storage and a service worker for local data and offline app files

KhetSetu does not require Ollama or a locally running model server.

## Run locally

You can open `index.html` for a static preview. Weather and satellite features need an internet connection. The Vercel API routes need a serverless development environment.

For a complete local run, install the Vercel CLI and run this from the project directory:

```bash
vercel dev

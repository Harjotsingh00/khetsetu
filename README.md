# KhetSetu — Grow with confidence

KhetSetu is a deployable, mobile-first farm decision companion for the **Build with AI: Code for Communities — Track 4: AgriN & Regenerative Agricultural Intelligence** challenge.

## The problem we chose

Smallholder farmers often have to make time-sensitive decisions with disconnected information: uncertain rain, soil test results, crop symptoms, and regenerative practice options. Advice that is neither local nor affordable is hard to act on. KhetSetu puts a simple daily field brief in one place, and makes its AI and data interfaces portable so a regional agriculture network can adapt them.

## What works

- **Live, location-based forecast:** Search a town or use the browser's location permission. Current conditions and a seven-day forecast come from Open-Meteo's free forecast and geocoding APIs.
- **Farmer-editable context:** Update crop, growth stage, and planting date. The season timeline estimates elapsed days and progress from crop-specific reference durations; it is a planning aid, not a locally validated maturity model. Farm context persists in this browser.
- **Regenerative field notes:** Useful starter practices are available immediately. If `GEMINI_API_KEY` is configured, the refresh action generates localized, crop-aware notes using Gemini on the server, with conservative prompts that prohibit invented sensor data and chemical doses.
- **Crop photo screening:** Upload a leaf photo and describe the symptom. With Gemini configured, the server returns a tentative visual observation and safe next steps. The UI explains the limits of photo diagnosis and provides a useful offline/degraded path.
- **Soil health and crop rotation:** Enter a soil score from a real test, get low-cost regenerative next steps, and explore a crop rotation idea.
- **Cooperation:** The farmer workflow is paired with a BRICS network explainer and open API boundary. The browser calls standard forecast endpoints; the AI model is selected by environment configuration; the interface separates locale, crop, and advisory inputs so future national adapters can be added.

- **Field journal:** Save dated field observations, irrigation actions, pest checks, and other notes locally on the device.
- **Offline app shell:** Install KhetSetu on a phone and reopen the cached dashboard without a connection. Saved farm profile, journal, and checklists remain available; weather, satellite imagery, and AI need connectivity.
- **Mobile responsive, shareable snapshot, persistent daily checklist, and accessible dialogs.**

## Deploy to Vercel

1. Put the contents of this `outputs` folder in a Git repository or import the folder with the Vercel CLI.
2. Import the repository as a Vercel project. No build command or framework preset is needed; Vercel serves the static files and deploys the functions in `api/`.
3. (Recommended for AI features) In Vercel project settings, add `GEMINI_API_KEY` as a server-side environment variable. Generate a key in Google AI Studio. Do not put it in `app.js`, HTML, or a `NEXT_PUBLIC_` variable.
4. Optionally set `GEMINI_MODEL` to a model available to your Google AI Studio project (default: `gemini-2.5-flash`). Redeploy after setting environment variables.
5. Open the deployed URL. Without an AI key, weather and all local guidance still work; refresh and photo analysis show a helpful configuration/fallback message.

The Gemini API can have usage limits or charges depending on your account and region. Restrict key usage in Google Cloud/AI Studio, monitor quotas, and set a suitable budget before a public event demo.

## Local preview

The static page can be opened directly, but API routes require a serverless runtime. For a complete local preview, use Vercel CLI from this folder (`vercel dev`), then add `GEMINI_API_KEY` to a local `.env` file if you want AI features. Never commit `.env` or share the key. The static forecast APIs need an internet connection.

## Trust and data boundaries

- Forecast data is live, sourced from Open-Meteo. It is a forecast, not a field sensor.
- **Satellite context is regional, not parcel intelligence.** The dashboard displays NASA GIBS Terra MODIS 8-day NDVI imagery around the selected town. The product is roughly 250 m resolution, so mixed land cover and small farms cannot be distinguished reliably. The app does not calculate a field-level NDVI score or claim crop stress. Composite date availability varies; a production pilot should surface per-pixel quality/cloud flags and parcel match confidence, and add finer-resolution imagery only where licensing and connectivity allow.
- The soil score and farmer name shown initially are demonstration values; edit the crop and location before relying on local guidance. Soil improvement notes are general, not a soil test or fertilizer prescription.
- Uploaded photos are forwarded to Google's Gemini API only when the farmer presses **Analyze leaf photo** and an AI key is configured. The app does not save photos to a database. Apply the relevant Google API terms and local privacy requirements before launch.
- AI output can be wrong. Photo output is a preliminary screen; confirm with a local extension worker before treatment.
- The API handlers are provider-adapter examples, not a complete production platform. For a larger farmer network, add rate limiting, consent and retention policy, a regional language layer, auditable provenance, tenant separation, local agronomist review, and country-specific regulations.

## Stack

Vanilla HTML/CSS/JavaScript, Vercel serverless Node functions, Google Gemini REST API, Open-Meteo Forecast API and Geocoding API. No local model process, database, paid front-end framework, or secret exposed to the browser.

## Challenge pitch

**KhetSetu helps the smallholder make the next good decision.** Instead of asking farmers to interpret disconnected charts, it turns weather, crop stage, and soil context into a practical daily brief—then creates a privacy-conscious path for shared, interoperable advisory models across BRICS. The digital public good is the portable interface and transparent advisory contract: countries can swap climate sources and language packs while farmers keep a familiar, low-bandwidth workflow.

# URL Shortener

A minimal, self-hosted URL shortener built with Node.js, Express, and EJS. The application provides a web UI and a JSON API to create short codes for long URLs and redirect visitors to the original destinations.

## Tech stack
- JavaScript (Node.js, Express)
- EJS (server-rendered templates)
- CSS (styling)
- MongoDB (persistence)

## Features
- Create short URLs from long URLs (supports optional custom alias)
- Redirect short codes to original URLs
- Simple web UI for creating and listing short URLs
- JSON API for programmatic creation and retrieval
- Optional hit counting / basic analytics per short code

## Repository structure (high level)
- index.js (or app.js) — application entry
- routes/ — Express route handlers (API and web)
- models/ — data models (URL document schema)
- views/ — EJS templates for pages
- public/ — static assets (CSS, images)
- .env — environment variables (not committed)
- package.json — scripts and dependencies

## Prerequisites
- Node.js (recommended v16+)
- npm or yarn
- MongoDB instance (local or hosted)

## Environment variables
Create a `.env` file in the project root with at least:
- PORT — port the server listens on (default: 3000)
- MONGO_URI — MongoDB connection string
- BASE_URL — base URL used when generating short URLs (no trailing slash)
- SESSION_SECRET — secret for sessions (if sessions are used)

## Installation
1. Clone the repository and change into its directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create `.env` and set required variables.
4. Start the app in development:
   ```
   npm run dev
   ```
   Or start production:
   ```
   npm start
   ```

## API endpoints (project-specific)
- POST /api/shorten
  - Description: Create a new short URL.
  - Request body (JSON):
    {
      "url": "<original_long_url>",
      "customAlias": "<optional_custom_alias>"
    }
  - Response (example JSON):
    {
      "shortUrl": "<BASE_URL>/<code>",
      "code": "<code>",
      "originalUrl": "<original_long_url>"
    }

- GET /api/stats/:code
  - Description: Return basic stats for a code (view count, createdAt, original URL) if analytics are implemented.

- GET /:code
  - Description: Redirects to the original URL associated with `code`. Responds with an HTTP redirect (301 or 302).

## Frontend routes 
- GET / — homepage with a form to create a short URL and a list of recent/owned short URLs
- GET /:code — access via browser triggers redirect behavior

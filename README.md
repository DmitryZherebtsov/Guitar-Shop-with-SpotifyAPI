# Les Paul Garage — Guitar Shop

A React + Vite storefront for Les Paul style guitars, with a Spotify-powered "Find Artists" page, a client-side shopping cart, and product detail pages.

## Tech stack

- React 18 + Vite 5
- React Router 6
- react-bootstrap / Bootstrap 5
- Spotify Web API (Client Credentials flow)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your Spotify API credentials (required for the "Find Artists" page):

   - Create an app at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) to get a Client ID and Client Secret.
   - Copy `.env.example` to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Fill in your own `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET` in `.env`.

   `.env` is git-ignored and never committed — keep your credentials out of version control.

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

## Notes

- The Find Artists page will show a warning banner instead of crashing if Spotify credentials are missing.
- Cart data is stored in the browser's `localStorage`; there is no backend/payment processing.

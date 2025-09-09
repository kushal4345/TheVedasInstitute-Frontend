# Environment Variables Setup

## Local Development

Create a `.env.local` file in the `Frontend` directory with:

```
VITE_API_URL=http://localhost:8000
```

## Production (Vercel)

In your Vercel dashboard, go to your project settings and add the following environment variable:

```
VITE_API_URL=https://vedas-chat-1.onrender.com
```

## How it works

- **Local Development**: The proxy in `vite.config.js` routes `/vedas-api` requests to `http://localhost:8000`
- **Production**: The app uses the full API URL from `VITE_API_URL` environment variable
- **API Calls**: All API calls now use `import.meta.env.VITE_API_URL` instead of hardcoded URLs

## Files Modified

1. `vite.config.js` - Updated proxy configuration for local development
2. `src/utils/api.js` - New utility file with API functions
3. `src/pages/Dashboard.jsx` - Refactored to use API utilities
4. `.env.local` - Environment variables for local development

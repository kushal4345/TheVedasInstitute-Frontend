# Vercel Deployment Guide

## ✅ Changes Made

1. **Removed Mock Mode**: API now uses real backend responses
2. **Added Debug Logging**: Console logs to help debug API issues
3. **Created Vercel Config**: `vercel.json` for proper deployment
4. **Enhanced Error Handling**: Better error messages and logging

## 🚀 Deployment Steps

### 1. Environment Variables in Vercel

In your Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://vedas-chat-1.onrender.com`
3. Make sure it's set for **Production**, **Preview**, and **Development**

### 2. Deploy to Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Verify Deployment

After deployment:
1. Check browser console for API logs
2. Test PDF upload functionality
3. Test chat functionality

## 🔍 Debugging

### Console Logs to Check:
- `API_URL: https://vedas-chat-1.onrender.com`
- `Uploading PDF: [filename] Session: [sessionId]`
- `Upload response status: 200` (or error status)
- `Upload success: [response data]`

### Common Issues:

1. **404 Error**: API URL not set correctly in Vercel
2. **CORS Error**: Backend needs to allow your Vercel domain
3. **Network Error**: Backend server might be down

## 📋 Files Modified

- `src/utils/api.js` - Removed mock mode, added logging
- `vercel.json` - Vercel deployment configuration
- `.env.local` - Local development environment

## 🎯 Expected Behavior

- **Local**: Uses production API (https://vedas-chat-1.onrender.com)
- **Vercel**: Uses production API (https://vedas-chat-1.onrender.com)
- **Real Responses**: No more dummy responses, actual AI responses from your backend

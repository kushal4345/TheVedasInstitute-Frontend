# API Debug Guide

## Current Issue
The API is returning 404 errors, which means the endpoint structure might be different than expected.

## What the Code Does Now
The system will automatically try these endpoints in order:

### Upload Endpoints:
1. `/vedas-api/upload_pdf/`
2. `/vedas-api/upload/`
3. `/vedas-api/pdf/upload/`
4. `/vedas-api/api/upload_pdf/`
5. `/vedas-api/upload-pdf/`
6. `/vedas-api/pdf/`
7. `/vedas-api/files/upload/`
8. `/vedas-api/documents/upload/`
9. `https://vedas-chat-1.onrender.com/upload_pdf/`
10. `https://vedas-chat-1.onrender.com/upload/`
11. `https://vedas-chat-1.onrender.com/pdf/upload/`
12. `https://vedas-chat-1.onrender.com/api/upload_pdf/`
13. `https://vedas-chat-1.onrender.com/upload-pdf/`
14. `https://vedas-chat-1.onrender.com/pdf/`
15. `https://vedas-chat-1.onrender.com/files/upload/`
16. `https://vedas-chat-1.onrender.com/documents/upload/`
17. `https://vedas-chat-1.onrender.com/api/v1/upload_pdf/`
18. `https://vedas-chat-1.onrender.com/api/v1/upload/`
19. `https://vedas-chat-1.onrender.com/api/upload/`
20. `https://vedas-chat-1.onrender.com/upload_pdf`
21. `https://vedas-chat-1.onrender.com/upload`
22. `https://vedas-chat-1.onrender.com/pdf/upload`
23. `https://vedas-chat-1.onrender.com/api/upload_pdf`

### Chat Endpoints:
1. `/vedas-api/chat/`
2. `/vedas-api/api/chat/`
3. `/vedas-api/chat`
4. `/vedas-api/api/chat`
5. `https://vedas-chat-1.onrender.com/chat/`
6. `https://vedas-chat-1.onrender.com/api/chat/`
7. `https://vedas-chat-1.onrender.com/chat`
8. `https://vedas-chat-1.onrender.com/api/chat`
9. `https://vedas-chat-1.onrender.com/api/v1/chat/`
10. `https://vedas-chat-1.onrender.com/api/v1/chat`

## How to Debug

1. **Open Browser Console** (F12)
2. **Try uploading a PDF**
3. **Watch the console logs** - you'll see:
   - `API_URL: https://vedas-chat-1.onrender.com`
   - `Trying endpoint: /vedas-api/upload_pdf/`
   - `❌ Endpoint /vedas-api/upload_pdf/ failed with status: 404`
   - ... (continues until it finds a working one)
   - `✅ Success with endpoint: [working endpoint]`

## Environment Setup

### Local Development (.env.local):
```
VITE_API_URL=http://localhost:8000
```

### Production (Vercel):
```
VITE_API_URL=https://vedas-chat-1.onrender.com
```

## Next Steps

1. **Check the console logs** to see which endpoint works
2. **If none work**, the backend might be down or the API structure is different
3. **If one works**, the system will remember it and use it going forward

## Common Issues

- **404 Error**: Endpoint doesn't exist
- **CORS Error**: Backend needs to allow requests from your domain
- **Connection Refused**: Backend server is not running
- **Timeout**: Backend is too slow to respond

The system will automatically find the correct endpoint and show you which one works!

# 🔧 Fix VITE_API_URL Environment Variable in Vercel

## ❌ **Problem Identified**
The error "API URL not defined" occurs because the `VITE_API_URL` environment variable is not properly configured in Vercel.

## ✅ **Solution Applied**

### **1. Created Local Environment File**
Created `.env` file with:
```
VITE_API_URL=https://vedas-chat-1.onrender.com
```

### **2. Enhanced Error Logging**
Updated Dashboard.jsx to provide better debugging:
```javascript
if (!import.meta.env.VITE_API_URL) {
  console.error('VITE_API_URL is not defined:', import.meta.env);
  alert('Configuration error: API URL is not defined. Please check environment variables.');
  return;
}
```

## 🚀 **Vercel Environment Variable Setup**

### **Method 1: Vercel Dashboard (Recommended)**

1. **Go to Vercel Dashboard**
   - Navigate to your project: `the-vedas-institute-frontend-3bvu`
   - Click on **Settings** tab
   - Click on **Environment Variables** in the sidebar

2. **Add Environment Variable**
   - **Name**: `VITE_API_URL`
   - **Value**: `https://vedas-chat-1.onrender.com`
   - **Environment**: Select all (Production, Preview, Development)

3. **Redeploy**
   - Go to **Deployments** tab
   - Click **Redeploy** on the latest deployment

### **Method 2: Vercel CLI**

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variable
vercel env add VITE_API_URL

# When prompted, enter: https://vedas-chat-1.onrender.com
# Select environments: Production, Preview, Development

# Redeploy
vercel --prod
```

### **Method 3: Update vercel.json (Current)**

Your current `vercel.json` already has the environment variable:
```json
{
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://vedas-chat-1.onrender.com"
  }
}
```

## 🔍 **Debugging Steps**

### **1. Check Environment Variables**
Add this to your Dashboard.jsx temporarily:
```javascript
console.log('All environment variables:', import.meta.env);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
```

### **2. Verify Vercel Configuration**
- Check Vercel dashboard for environment variables
- Ensure variable is set for all environments
- Verify the variable name is exactly `VITE_API_URL`

### **3. Test Local Development**
```bash
# Restart development server
npm run dev
```
Check console for environment variable loading.

## 📋 **Verification Checklist**

After setting up environment variables:

- [ ] Environment variable set in Vercel dashboard
- [ ] Variable available in all environments (Production, Preview, Development)
- [ ] Redeployed application
- [ ] Console shows `VITE_API_URL: https://vedas-chat-1.onrender.com`
- [ ] No "API URL not defined" errors
- [ ] Upload functionality works
- [ ] Chat functionality works

## 🎯 **Expected Result**

After proper configuration:
- ✅ `import.meta.env.VITE_API_URL` returns `https://vedas-chat-1.onrender.com`
- ✅ Upload endpoint: `https://vedas-chat-1.onrender.com/upload_pdf/`
- ✅ Chat endpoint: `https://vedas-chat-1.onrender.com/chat/`
- ✅ No 404 errors
- ✅ Full functionality restored

## 🚨 **Common Issues**

1. **Variable not set for all environments**: Make sure to select Production, Preview, and Development
2. **Typo in variable name**: Must be exactly `VITE_API_URL`
3. **Not redeployed**: Environment variables require redeployment to take effect
4. **Local vs Production**: Local `.env` file doesn't affect Vercel deployment

The environment variable issue should be resolved after following these steps! 🎉

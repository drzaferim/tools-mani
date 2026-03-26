# HelperTools - Firebase Deployment Guide

## Prerequisites

1. **Node.js** (v18+): https://nodejs.org
2. **Firebase CLI**: `npm install -g firebase-tools`
3. **Firebase Account**: https://console.firebase.google.com

## Step-by-Step Deployment

### 1. Firebase Project Setup

```bash
# Login to Firebase
firebase login

# Create a new project (or use existing one)
firebase projects:create helpertools-app

# Link this repo to your Firebase project
firebase use helpertools-app
```

### 2. Build & Deploy

```bash
# Install dependencies
npm install

# Build static site
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

Or use the shortcut:
```bash
npm run deploy
```

### 3. Custom Domain Setup

After deployment, go to Firebase Console:
1. Go to **Hosting** > **Custom domains**
2. Click **Add custom domain**
3. Enter your domain (e.g., `toolnest.com`)
4. Add the DNS records shown to your domain registrar (Namecheap)
5. Wait for SSL certificate provisioning (usually < 1 hour)

### DNS Records (Namecheap)

In Namecheap Dashboard > Domain > Advanced DNS:

| Type | Host | Value |
|------|------|-------|
| A | @ | (Firebase IP - shown in console) |
| A | @ | (Firebase IP 2 - shown in console) |
| CNAME | www | your-project.web.app |

## Firebase Free Tier Limits

- **Hosting**: 10 GB storage, 360 MB/day transfer
- **Custom domain**: Free with SSL
- **Estimated capacity**: ~50,000-100,000 page views/month

## Cost Estimates

| Traffic | Firebase Cost | Notes |
|---------|--------------|-------|
| < 50K views/mo | $0 | Free tier |
| 50K-200K views/mo | $0-5/mo | Blaze plan (pay as you go) |
| 200K+ views/mo | $5-25/mo | Scale as needed |

# Netlify Deployment & Live Tax News Setup

This project uses Netlify Functions to fetch live tax news from NewsAPI. Here's how to set it up.

## Quick Start

### 1. Get a NewsAPI Key (Free)

1. Sign up at **https://newsapi.org** (free tier: 100 requests/day)
2. Copy your API key from the dashboard

### 2. Deploy to Netlify

#### Option A: Connect Your Git Repo (Recommended)

1. Push this project to GitHub (or GitLab/Bitbucket)
2. Go to **https://app.netlify.com** → "New site from Git"
3. Select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy"

#### Option B: Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 3. Set Environment Variable on Netlify

1. Go to your Netlify site dashboard
2. **Site Settings** → **Build & deploy** → **Environment**
3. Click **"Edit variables"**
4. Add:
   - **Key:** `NEWSAPI_KEY`
   - **Value:** (paste your NewsAPI key)
5. Trigger a new deploy: **Deploys** → **Trigger deploy** → **Deploy site**

### 4. Test It

Visit your site. The "Latest tax news" section should now show:
- 🔄 **Live news** if the API call succeeds
- 📌 **Curated highlights** if the API is unavailable (falls back gracefully)

---

## How It Works

### Client-Side (React)
- **`src/components/TaxNews.jsx`** — On mount, tries to fetch from the Netlify Function
- Displays a loading indicator while fetching
- Falls back to static `TAX_NEWS` from `src/constants.js` if the function fails
- Caches successful results in `localStorage` for offline access

### Server-Side (Netlify Function)
- **`netlify/functions/get-tax-news.js`** — Deployed as a serverless function
- Queries NewsAPI for Indian tax news
- Returns top 4 results, categorized by tag (Budget, Regime, Deadline, Update)
- Caches results for 6 hours in-memory to avoid quota overages
- Falls back to curated static news if API fails

### Cost

- **Netlify Functions:** Free tier supports 125,000 invocations/month (~4,200/day)
- **NewsAPI:** Free tier is 100 requests/day (more than enough for 4 news items cached 6 hours)
- **Total:** $0/month

---

## Local Development

### Without Netlify CLI (Using Static Data)

```bash
npm run dev
```

The app will use the curated static news from `src/constants.js` (fallback behavior).

### With Netlify CLI (Test Live Function Locally)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create a .env.local file (ignored by git)
echo "NEWSAPI_KEY=your_key_here" > .env.local

# Run dev with functions
netlify dev
```

Then visit **http://localhost:8888** and the function will run locally at `/.netlify/functions/get-tax-news`.

---

## Troubleshooting

### "Latest tax news" shows curated highlights, not live news

**Reasons:**
1. NewsAPI key not set → Set `NEWSAPI_KEY` in Netlify environment
2. Quota exceeded (100 requests/day) → It will auto-fallback; resets tomorrow
3. Function timed out → Site still works with static data (no errors)
4. Network issue → Check browser console for fetch errors

**Debug:**
- Open browser DevTools → Network tab → Look for `get-tax-news` request
- Check Netlify function logs: **Site dashboard** → **Functions** → **View logs**

### I want to switch back to static-only news

Edit `src/components/TaxNews.jsx`:
- Delete the `useEffect` that calls `fetch('/.netlify/functions/get-tax-news')`
- Just use `TAX_NEWS` from constants

---

## Customization

### Change News Query

Edit `netlify/functions/get-tax-news.js`, line ~60:

```javascript
const query = '(indian tax OR income tax OR "budget 2025") AND (india OR INR)'
```

### Change Fallback News

Edit `src/constants.js` → `TAX_NEWS` array.

### Change Cache Duration

Edit `netlify/functions/get-tax-news.js`:

```javascript
const CACHE_TTL = 6 * 60 * 60 * 1000  // Change this (milliseconds)
```

---

## Next Steps

- Deploy to Netlify
- Set `NEWSAPI_KEY` environment variable
- Watch the news section light up with live updates ✨
